import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing Supabase environment variables. " +
        "Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env.local file."
    );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Convenience type helpers
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyImage = Database["public"]["Tables"]["property_images"]["Row"];
export type PropertyDocument = Database["public"]["Tables"]["property_documents"]["Row"];
export type Shortlist = Database["public"]["Tables"]["shortlists"]["Row"];
export type LeadEnquiry = Database["public"]["Tables"]["leads_enquiries"]["Row"];
export type ServiceTransaction = Database["public"]["Tables"]["service_transactions"]["Row"];
export type CoinTransaction = Database["public"]["Tables"]["coin_transactions"]["Row"];
