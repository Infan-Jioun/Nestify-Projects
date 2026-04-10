import NextHead from "@/app/components/NextHead/NextHead";
import Link from "next/link";

export default function TermsOfUse() {
    return (
        <>
            <NextHead title="Terms of Use | Nestify" />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-44">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Use</h1>
                    <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

                    <div className="space-y-8 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing and using Nestify, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our platform.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">2. Use of Service</h2>
                            <p>Nestify provides a real estate listing platform for Bangladesh. You agree to use this service only for lawful purposes and in a manner that does not infringe the rights of others.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">3. User Accounts</h2>
                            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">4. Property Listings</h2>
                            <p>Real estate developers are responsible for the accuracy of their property listings. Nestify reserves the right to remove any listing that violates our guidelines.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">5. Intellectual Property</h2>
                            <p>All content on Nestify, including logos, images, and text, is the property of Nestify and is protected by applicable intellectual property laws.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">6. Limitation of Liability</h2>
                            <p>Nestify shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or any property transactions facilitated through it.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">7. Changes to Terms</h2>
                            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">8. Contact</h2>
                            <p>For questions about these terms, contact us at <a href="mailto:info@nestify.com" className="text-green-500 hover:underline">info@nestify.com</a></p>
                        </section>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
                        <Link href="/legal/privacy-policy" className="text-green-500 hover:underline">Privacy Policy</Link>
                        <Link href="/legal/cookie-policy" className="text-green-500 hover:underline">Cookie Policy</Link>
                        <Link href="/legal/disclaimer" className="text-green-500 hover:underline">Disclaimer</Link>
                    </div>
                </div>
            </main>
        </>
    );
}