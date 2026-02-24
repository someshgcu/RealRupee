import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { transactions } from "@/data/mockData";
import {
    ArrowLeft,
    Receipt,
    ArrowUpRight,
    ArrowDownLeft,
    ChevronRight,
    Coins,
} from "lucide-react";
import { Navigate } from "react-router-dom";

const Transactions = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

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

            <div className="space-y-3">
                {transactions.map((tx) => {
                    const isCredit = tx.type === "Credit";
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
                                <p className="font-semibold text-foreground">{tx.service}</p>
                                <p className="text-xs text-muted-foreground">{tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${isCredit ? "text-[#28a745]" : "text-foreground"}`}>
                                    {isCredit ? "+" : "-"}{tx.coinAmount}{" "}
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
        </div>
    );
};

export default Transactions;
