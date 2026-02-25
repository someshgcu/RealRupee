import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
    ArrowLeft,
    Receipt,
    ArrowUpRight,
    ArrowDownLeft,
    ChevronRight,
    Coins,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";

const Transactions = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("service_transactions")
                    .select("*, properties(title)")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setTransactions(data || []);
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user, toast]);

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    return (
        <div className="container mx-auto px-4 py-6">
            <BackButton />

            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a4b8c]/10">
                    <Receipt className="h-5 w-5 text-[#1a4b8c]" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
                    <p className="text-sm text-muted-foreground">
                        {transactions.length} transaction{transactions.length !== 1 && "s"}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
                        <Receipt className="h-12 w-12 text-gray-300" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-foreground">No Transactions</h2>
                    <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
                        You haven't made any service transactions yet. Your purchase history will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {transactions.map((tx) => {
                        const isCredit = tx.coin_amount > 0 && tx.status === "Success"; // Logic might vary, assuming coin_amount is +/- in DB
                        return (
                            <Link
                                key={tx.id}
                                to={`/transactions/${tx.id}`}
                                className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isCredit ? "bg-[#28a745]/10" : "bg-[#fd7e14]/10"
                                        }`}
                                >
                                    {isCredit ? (
                                        <ArrowDownLeft className="h-5 w-5 text-[#28a745]" />
                                    ) : (
                                        <ArrowUpRight className="h-5 w-5 text-[#fd7e14]" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-foreground">{tx.service_name}</p>
                                    <p className="text-xs text-muted-foreground">{format(new Date(tx.created_at), "dd MMM yyyy")}</p>
                                    <p className="mt-1 text-[10px] text-muted-foreground line-clamp-1">
                                        Property: {(tx.properties as any)?.title || "General"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${isCredit ? "text-[#28a745]" : "text-foreground"}`}>
                                        {tx.coin_amount >= 0 ? "+" : ""}{tx.coin_amount}{" "}
                                        <span className="text-xs font-medium">coins</span>
                                    </p>
                                    {tx.amount > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            ₹{tx.amount.toLocaleString("en-IN")}
                                        </p>
                                    )}
                                    <span
                                        className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${tx.status === "Success"
                                            ? "bg-[#28a745]/10 text-[#28a745]"
                                            : tx.status === "Pending"
                                                ? "bg-[#fd7e14]/10 text-[#fd7e14]"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </div>
                                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Transactions;
