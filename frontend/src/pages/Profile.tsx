import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { BackButton } from "@/components/BackButton";
import {
    User,
    Mail,
    Phone,
    Calendar,
    Shield,
    BadgeCheck,
    Coins,
    LogOut,
    Camera,
    CreditCard,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const { isLoggedIn, profile, user, signOut } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <BackButton />

            {/* Profile Header Card */}
            <div className="relative mb-8 overflow-hidden rounded-3xl border bg-card p-8 shadow-xl">
                {/* Background Pattern/Gradient */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start text-center sm:text-left">
                    {/* Avatar with Upload button overlay */}
                    <div className="group relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-3xl font-bold text-white shadow-lg sm:h-32 sm:w-32">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="h-full w-full rounded-2xl object-cover" />
                            ) : (
                                profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-md transition-transform hover:scale-110 border">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                                {profile?.full_name || "User Name"}
                            </h1>
                            {profile?.account_status === "Active" && (
                                <span className="flex items-center gap-1 rounded-full bg-[#28a745]/10 px-2.5 py-0.5 text-xs font-semibold text-[#28a745]">
                                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                                </span>
                            )}
                        </div>
                        <p className="flex items-center justify-center gap-1.5 text-muted-foreground sm:justify-start">
                            <Mail className="h-4 w-4" /> {user?.email}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 pt-4 sm:justify-start">
                            {profile?.roles?.map((role) => (
                                <span key={role} className="rounded-lg bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground border">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Account Details Section */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Account Details</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Phone Number</p>
                            <p className="flex items-center gap-2 font-medium text-foreground">
                                <Phone className="h-4 w-4 text-primary/60" />
                                {profile?.phone_number || "Not provided"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Joined On</p>
                            <p className="flex items-center gap-2 font-medium text-foreground">
                                <Calendar className="h-4 w-4 text-primary/60" />
                                {formatDate(profile?.created_at || null)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Wallet Balance</p>
                            <p className="flex items-center gap-2 font-medium text-foreground">
                                <Coins className="h-4 w-4 text-[#fd7e14]" />
                                {profile?.coins_balance || 0} Coins
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Account Status</p>
                            <p className="flex items-center gap-2 font-medium text-foreground">
                                <Shield className="h-4 w-4 text-[#28a745]" />
                                {profile?.account_status || "Active"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="rounded-2xl border bg-card p-2 shadow-sm">
                    <button
                        onClick={() => navigate("/my-coins")}
                        className="flex w-full items-center justify-between rounded-xl p-4 transition-colors hover:bg-muted"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                <Coins className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">My Coins</p>
                                <p className="text-xs text-muted-foreground">View balance and earn history</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </button>

                    <button
                        onClick={() => navigate("/transactions")}
                        className="flex w-full items-center justify-between rounded-xl p-4 transition-colors hover:bg-muted"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">Transactions</p>
                                <p className="text-xs text-muted-foreground">Past payments and service history</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </button>

                    <div className="mx-4 border-t my-1" />

                    <button
                        onClick={() => signOut()}
                        className="flex w-full items-center justify-between rounded-xl p-4 transition-colors hover:bg-red-50 text-red-600"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                <LogOut className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Logout</p>
                                <p className="text-xs text-red-500/70">Securely sign out of your account</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
