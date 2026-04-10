import NextHead from "@/app/components/NextHead/NextHead";
import Link from "next/link";

export default function Disclaimer() {
    return (
        <>
            <NextHead title="Disclaimer | Nestify" />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-44">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Disclaimer</h1>
                    <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

                    <div className="space-y-8 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1. General Information</h2>
                            <p>The information provided on Nestify is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no warranties of any kind about the completeness or accuracy of property listings.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">2. Property Listings</h2>
                            <p>All property listings are provided by real estate developers and owners. Nestify does not verify the accuracy of listing details. We strongly recommend conducting your own due diligence before making any property decisions.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">3. No Professional Advice</h2>
                            <p>Content on this platform does not constitute legal, financial, or real estate professional advice. Always consult qualified professionals before making property investment decisions.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">4. Price Accuracy</h2>
                            <p>Property prices listed are subject to change without notice. Nestify is not responsible for any discrepancies between listed prices and actual transaction prices.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">5. External Links</h2>
                            <p>Our platform may contain links to external websites. Nestify has no control over the content of those sites and accepts no responsibility for them.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">6. Limitation of Liability</h2>
                            <p>Nestify shall not be held liable for any loss or damage arising directly or indirectly from the use of information or services provided on this platform.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">7. Contact</h2>
                            <p>For any questions regarding this disclaimer, contact us at <a href="mailto:info@nestify.com" className="text-green-500 hover:underline">info@nestify.com</a></p>
                        </section>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
                        <Link href="/legal/terms-of-use" className="text-green-500 hover:underline">Terms of Use</Link>
                        <Link href="/legal/privacy-policy" className="text-green-500 hover:underline">Privacy Policy</Link>
                        <Link href="/legal/cookie-policy" className="text-green-500 hover:underline">Cookie Policy</Link>
                    </div>
                </div>
            </main>
        </>
    );
}