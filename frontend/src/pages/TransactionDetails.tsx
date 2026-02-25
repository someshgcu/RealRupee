import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
    ArrowLeft,
    Receipt,
    Calendar,
    CreditCard,
    Coins,
    ArrowUpRight,
    ArrowDownLeft,
    Building2,
    ExternalLink,
    Hash,
    CheckCircle2,
    Clock,
    XCircle,
    Loader2,
} from "lucide-react";

const TransactionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [tx, setTx] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchTransactionDetails = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("service_transactions")
                    .select("*, properties(title)")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setTx(data);
            } catch (error: any) {
                console.error("Fetch transaction error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!tx) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Receipt className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Transaction Not Found</h1>
                <p className="mb-6 text-muted-foreground">
                    This transaction does not exist or has been removed.
                </p>
                <button
                    onClick={() => navigate("/transactions")}
                    className="flex items-center gap-2 rounded-lg bg-[#1a4b8c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Transactions
                </button>
            </div>
        );
    }

    const isCredit = tx.coin_amount > 0 && tx.status === "Success";
    const StatusIcon = tx.status === "Success" ? CheckCircle2 : tx.status === "Pending" ? Clock : XCircle;
    const statusColor =
        tx.status === "Success"
            ? "text-[#28a745] bg-[#28a745]/10"
            : tx.status === "Pending"
                ? "text-[#fd7e14] bg-[#fd7e14]/10"
                : "text-red-600 bg-red-100";

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="mx-auto max-w-xl">
                {/* Receipt Card */}
                <div className="rounded-xl border bg-card shadow-sm">
                    {/* Header */}
                    <div className="border-b p-6 text-center">
                        <div
                            className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${isCredit ? "bg-[#28a745]/10" : "bg-[#fd7e14]/10"
                                }`}
                        >
                            {isCredit ? (
                                <ArrowDownLeft className="h-7 w-7 text-[#28a745]" />
                            ) : (
                                <ArrowUpRight className="h-7 w-7 text-[#fd7e14]" />
                            )}
                        </div>
                        <h1 className="text-xl font-bold text-foreground">{tx.service_name}</h1>
                        <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${statusColor}`}>
                            <StatusIcon className="h-4 w-4" /> {tx.status}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="border-b p-6 text-center">
                        <p className={`text-3xl font-bold ${isCredit ? "text-[#28a745]" : "text-foreground"}`}>
                            {tx.coin_amount >= 0 ? "+" : ""}{tx.coin_amount} Coins
                        </p>
                        {tx.amount > 0 && (
                            <p className="mt-1 text-lg text-muted-foreground">
                                ₹{tx.amount.toLocaleString("en-IN")}
                            </p>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-0 divide-y">
                        <div className="flex items-center gap-3 px-6 py-4">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Transaction ID</p>
                                <p className="text-sm font-medium text-foreground uppercase">{tx.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="text-sm font-medium text-foreground">
                                    {format(new Date(tx.created_at), "dd MMM yyyy, HH:mm")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4">
                            <Coins className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Type</p>
                                <p className="text-sm font-medium text-foreground">
                                    {tx.coin_amount >= 0 ? "Credit" : "Debit"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Payment Method</p>
                                <p className="text-sm font-medium text-foreground">{tx.payment_method || "N/A"}</p>
                            </div>
                        </div>
                        {tx.properties && (
                            <div className="flex items-center gap-3 px-6 py-4">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground">Related Property</p>
                                    <Link
                                        to={`/properties/${tx.property_id}`}
                                        className="text-sm font-medium text-[#1a4b8c] hover:underline"
                                    >
                                        {tx.properties.title}{" "}
                                        <ExternalLink className="inline h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
