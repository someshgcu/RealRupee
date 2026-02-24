import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t bg-[#1a4b8c]">
            {/* Main Footer Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: My RealRupee */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            My RealRupee
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="/my-properties" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    My Properties
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-shortlist" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    My Shortlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    My Services
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Buy */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Buy
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Apartment
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Villa
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Independent House
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Commercial
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Agricultural
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Development
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: FAQs */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            FAQs
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Validated Properties Explained
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Group Buying Explained
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-300 transition-colors hover:text-blue-200">
                                    Auctions Explained
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us & Socials */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Contact Us
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href="mailto:info@realrupee.com"
                                    className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-blue-200"
                                >
                                    <Mail className="h-4 w-4" /> info@realrupee.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+918886967700"
                                    className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-blue-200"
                                >
                                    <Phone className="h-4 w-4" /> +91 888 696 7700
                                </a>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="mb-2.5 text-sm font-medium text-white">Follow us on</p>
                            <div className="flex gap-3">
                                <a
                                    href="https://www.facebook.com/realrupee"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <a
                                    href="https://www.instagram.com/RealRupee/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-4 w-4" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@RealRupeeServices"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Youtube"
                                >
                                    <Youtube className="h-4 w-4" />
                                </a>
                                <a
                                    href="https://x.com/RealRupee"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Real Rupee Section */}
            <div className="border-t border-white/15">
                <div className="container mx-auto px-4 py-8">
                    <h4 className="mb-3 text-sm font-semibold text-white">About Real Rupee</h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                        Buy and sell properties with Real Rupee real estate and legal services.
                        Real Rupee.com is designed to seamlessly merge legal expertise into the
                        home buying process. This Offers buyers a peace of mind through comprehensive
                        legal assistance and provides sellers with credibility through meticulous
                        legal validation.
                    </p>
                </div>
            </div>

            {/* Copyright Row */}
            <div className="border-t border-white/15">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
                    <p className="text-xs text-gray-400">
                        &copy; 2025 RealRupee Services Private Limited. All Rights Reserved. Real Rupee Real Estate
                    </p>
                    <div className="flex gap-4">
                        <Link to="/disclaimer" className="text-xs text-gray-400 transition-colors hover:text-blue-200">
                            Disclaimer
                        </Link>
                        <span className="text-xs text-gray-500">|</span>
                        <Link to="/terms" className="text-xs text-gray-400 transition-colors hover:text-blue-200">
                            Terms &amp; Conditions
                        </Link>
                        <span className="text-xs text-gray-500">|</span>
                        <Link to="/privacy" className="text-xs text-gray-400 transition-colors hover:text-blue-200">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
