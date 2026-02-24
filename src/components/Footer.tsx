import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t bg-card">
            {/* Main Footer Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: My RealRupee */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            My RealRupee
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="/my-properties" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    My Properties
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-shortlist" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    My Shortlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    My Services
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Buy */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Buy
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Apartment
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Villa
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Independent House
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Commercial
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Agricultural
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Development
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: FAQs */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            FAQs
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Validated Properties Explained
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Group Buying Explained
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Auctions Explained
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us & Socials */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Contact Us
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href="mailto:info@realrupee.com"
                                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Mail className="h-4 w-4" /> info@realrupee.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+918886967700"
                                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Phone className="h-4 w-4" /> +91 888 696 7700
                                </a>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="mb-2.5 text-sm font-medium text-foreground">Follow us on</p>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#1a4b8c] hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#1a4b8c] hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#1a4b8c] hover:text-white"
                                    aria-label="Youtube"
                                >
                                    <Youtube className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#1a4b8c] hover:text-white"
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
            <div className="border-t">
                <div className="container mx-auto px-4 py-8">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">About Real Rupee</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Buy and sell properties with Real Rupee real estate and legal services.
                        Real Rupee.com is designed to seamlessly merge legal expertise into the
                        home buying process. This Offers buyers a peace of mind through comprehensive
                        legal assistance and provides sellers with credibility through meticulous
                        legal validation.
                    </p>
                </div>
            </div>

            {/* Copyright Row */}
            <div className="border-t">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2025 RealRupee Services Private Limited. All Rights Reserved. Real Rupee Real Estate
                    </p>
                    <div className="flex gap-4">
                        <Link to="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                            Disclaimer
                        </Link>
                        <span className="text-xs text-muted-foreground">|</span>
                        <Link to="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                            Terms &amp; Conditions
                        </Link>
                        <span className="text-xs text-muted-foreground">|</span>
                        <Link to="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
