import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase, type Profile } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SignUpOptions {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  referralCode?: string;
}

interface AuthContextType {
  /** Raw Supabase Auth user (contains email, uid, etc.) */
  user: User | null;
  /** Profile row from the `profiles` table, populated after sign-in */
  profile: Profile | null;
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  // Auth actions
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithOtp: (emailOrPhone: string, type: "email" | "phone") => Promise<{ error: AuthError | null }>;
  verifyOtp: (emailOrPhone: string, token: string, type: "email" | "sms", fullName?: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signUp: (opts: SignUpOptions) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  /** Refresh the profile from the DB (useful after profile edits) */
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoggedIn: false,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signInWithOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  signInWithGoogle: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => { },
  refreshProfile: async () => { },
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Fetch the profile row for a given user id ──────────────────────────────
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("[AuthContext] fetchProfile error:", error.message);
      setProfile(null);
    } else {
      setProfile(data);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  // ── Bootstrap: restore session on mount, then subscribe to changes ─────────
  useEffect(() => {
    // 1. Get the existing session (persisted in localStorage by Supabase)
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    // 2. Subscribe to future auth state changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // ── Sign In ────────────────────────────────────────────────────────────────
  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error && data.user) {
        await fetchProfile(data.user.id);
      }
      return { error };
    },
    [fetchProfile]
  );

  // ── Sign In with OTP ───────────────────────────────────────────────────────
  const signInWithOtp = useCallback(
    async (emailOrPhone: string, type: "email" | "phone") => {
      const { error } = await supabase.auth.signInWithOtp(
        type === "email"
          ? { email: emailOrPhone }
          : { phone: emailOrPhone }
      );
      return { error };
    },
    []
  );

  // ── Verify OTP ─────────────────────────────────────────────────────────────
  const verifyOtp = useCallback(
    async (emailOrPhone: string, token: string, type: "email" | "sms", fullName?: string) => {
      const { data, error } = await (type === "email"
        ? supabase.auth.verifyOtp({ email: emailOrPhone, token, type: "email" })
        : supabase.auth.verifyOtp({ phone: emailOrPhone, token, type: "sms" }));

      if (!error && data.user) {
        // If fullName is provided, ensure profile exists
        if (fullName) {
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email ?? emailOrPhone, // Handle phone case email
            full_name: fullName,
          }, { onConflict: 'id' });

          if (profileError) {
            console.error("[AuthContext] verifyOtp profile upsert error:", profileError.message);
          }
        }
        await fetchProfile(data.user.id);
      }
      return { error };
    },
    [fetchProfile]
  );

  // ── Sign In with Google ────────────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      }
    });
    return { error };
  }, []);

  // ── Sign Up ────────────────────────────────────────────────────────────────
  const signUp = useCallback(
    async ({ email, password, fullName, phone, referralCode }: SignUpOptions) => {
      // 1. Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error || !data.user) return { error };

      // 2. Resolve referral: look up the profile of the referrer (if code provided)
      let referredById: string | null = null;
      if (referralCode) {
        const { data: referrer } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referralCode)
          .single();
        referredById = referrer?.id ?? null;
      }

      // 3. Insert the profile row (trigger will generate the referral_code)
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        phone_number: phone ?? null,
        referred_by: referredById,
      });

      if (profileError) {
        console.error("[AuthContext] signUp profile insert error:", profileError.message);
      } else {
        await fetchProfile(data.user.id);
      }

      return { error: null };
    },
    [fetchProfile]
  );

  // ── Sign Out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoggedIn: !!user,
        isLoading,
        signIn,
        signInWithOtp,
        verifyOtp,
        signInWithGoogle,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext);

// Re-export for convenience in call sites
export type { Profile };
