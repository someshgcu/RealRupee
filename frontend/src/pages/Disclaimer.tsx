const Disclaimer = () => {
    return (
        <div className="min-h-screen bg-off-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
                <h1 className="text-primary tracking-tight font-bold text-3xl md:text-4xl mb-8">
                    Disclaimer
                </h1>
                <ul className="pl-6 list-disc space-y-4 mb-4 text-gray-600 text-sm md:text-base leading-relaxed">
                    <li>
                        The properties in the website are listed by property owners/agents/developers and need not require RERA approval for digital listing.
                    </li>
                    <li>
                        RealRupee has no intend to facilitate the sale or purchase of or act on behalf of any person to facilitate the sale or purchase of any plot, apartment or building, or property as the case may be, in a registered real estate project being sold by the promoter anywhere.
                    </li>
                    <li>
                        The services offered on RealRupee website are meant only for advertizing and promotional purposes.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Disclaimer;
