import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { currentUser } from "@/data/mockData";
import { Navigate } from "react-router-dom";
import {
    ArrowLeft,
    Coins,
    CheckCircle2,
    Gift,
    Share2,
    Copy,
    MessageCircle,
    Facebook,
    Twitter,
} from "lucide-react";
import { useState } from "react";

const REFERRAL_LINK = "https://realrupee.com/referral/so1653";

const MyCoins = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(REFERRAL_LINK);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const input = document.createElement("input");
            input.value = REFERRAL_LINK;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareWhatsApp = `https://api.whatsapp.com/send?text=Join%20RealRupee%20using%20my%20link:%20${encodeURIComponent(REFERRAL_LINK)}`;
    const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(REFERRAL_LINK)}`;
    const shareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(REFERRAL_LINK)}&text=Join%20RealRupee!`;

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {/* Hero / Balance Section */}
            <div className="mb-8 rounded-2xl bg-gradient-to-br from-[#1a4b8c] to-[#153d73] p-8 text-center text-white shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                    <Coins className="h-8 w-8 text-white" />
                </div>
                <p className="text-lg font-medium text-white/80">Your Balance</p>
                <p className="text-4xl font-extrabold">
                    {currentUser.coins} <span className="text-xl font-semibold text-white/70">coins</span>
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Earn Coins Section */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#28a745]/10">
                            <Gift className="h-5 w-5 text-[#28a745]" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Earn RealRupee coins by:
                        </h2>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "Adding A Property For Sale",
                            "Adding More Number Of Properties",
                            "Adding More Details To The Property You Post",
                            "Sharing Your Property On Real Rupee To More Friends On Watsapp, Facebook Etc",
                            "Referring Friends To Join Real Rupee",
                            "Adding More Legally Validated Properties",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#28a745]" />
                                <span className="text-sm leading-relaxed text-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Use Coins Section */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a4b8c]/10">
                            <Coins className="h-5 w-5 text-[#1a4b8c]" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Use Real Rupee Coins For Any Service:
                        </h2>
                    </div>
                    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <p>
                            The Real Rupee Coins You Earn could be used to get Discount or Avail any
                            Service for free on RealRupee
                        </p>
                        <p>
                            Property Validation Service – By Providing a Legal Opinion For your
                            Property or by Promoting as Legally Validated Property, if a legal Opinion
                            is available for your Property , Already.
                        </p>
                        <p>
                            This Service Helps to get more Prospective Buyers to your Property as
                            there are less doubts and more clarity with a status of Validated Property.
                        </p>
                    </div>
                </div>
            </div>

            {/* Referral Section */}
            <div className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fd7e14]/10">
                        <Share2 className="h-5 w-5 text-[#fd7e14]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Refer Your Friends and Earn Coins
                        </h2>
                        <p className="text-sm text-muted-foreground">Share With Your Friends!</p>
                    </div>
                </div>

                {/* Referral Link */}
                <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                        {REFERRAL_LINK}
                    </p>
                    <button
                        onClick={handleCopy}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#1a4b8c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#153d73]"
                    >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                {/* Share Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                    <a
                        href={shareWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                    <a
                        href={shareFacebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        <Facebook className="h-4 w-4" /> Facebook
                    </a>
                    <a
                        href={shareTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#1DA1F2] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        <Twitter className="h-4 w-4" /> Twitter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MyCoins;
