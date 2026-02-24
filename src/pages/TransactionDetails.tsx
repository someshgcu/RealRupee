import { useParams, useNavigate, Link } from "react-router-dom";
import { transactions } from "@/data/mockData";
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
} from "lucide-react";

const TransactionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const tx = transactions.find((t) => t.id === id);

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

    const isCredit = tx.type === "Credit";
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
                        <h1 className="text-xl font-bold text-foreground">{tx.service}</h1>
                        <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${statusColor}`}>
                            <StatusIcon className="h-4 w-4" /> {tx.status}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="border-b p-6 text-center">
                        <p className={`text-3xl font-bold ${isCredit ? "text-[#28a745]" : "text-foreground"}`}>
                            {isCredit ? "+" : "-"}{tx.coinAmount} Coins
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
                                <p className="text-sm font-medium text-foreground">{tx.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4">
                            <Coins className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Type</p>
                                <p className="text-sm font-medium text-foreground">{tx.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Payment Method</p>
                                <p className="text-sm font-medium text-foreground">{tx.method}</p>
                            </div>
                        </div>
                        {tx.relatedPropertyTitle && (
                            <div className="flex items-center gap-3 px-6 py-4">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground">Related Property</p>
                                    <Link
                                        to={`/properties/${tx.relatedPropertyId}`}
                                        className="text-sm font-medium text-[#1a4b8c] hover:underline"
                                    >
                                        {tx.relatedPropertyTitle}{" "}
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
