import NextHead from "@/app/components/NextHead/NextHead";
import Link from "next/link";

export default function CookiePolicy() {
    return (
        <>
            <NextHead title="Cookie Policy | Nestify" />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-44">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cookie Policy</h1>
                    <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

                    <div className="space-y-8 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1. What Are Cookies</h2>
                            <p>Cookies are small text files stored on your device when you visit our website. They help us recognize your browser and remember certain information to improve your experience.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">2. Types of Cookies We Use</h2>
                            <div className="space-y-3">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Essential Cookies</p>
                                    <p>Required for the platform to function properly, including authentication and security features.</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Analytics Cookies</p>
                                    <p>Help us understand how visitors interact with our platform so we can improve it.</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Preference Cookies</p>
                                    <p>Remember your settings and preferences such as language and dark mode.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">3. How to Control Cookies</h2>
                            <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our platform. Most browsers allow you to refuse or accept cookies.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">4. Third-Party Cookies</h2>
                            <p>We may use third-party services like Google Analytics that set their own cookies. These are governed by their respective privacy policies.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">5. Cookie Duration</h2>
                            <p>Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them manually.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">6. Contact</h2>
                            <p>For cookie-related questions, contact us at <a href="mailto:info@nestify.com" className="text-green-500 hover:underline">info@nestify.com</a></p>
                        </section>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
                        <Link href="/legal/terms-of-use" className="text-green-500 hover:underline">Terms of Use</Link>
                        <Link href="/legal/privacy-policy" className="text-green-500 hover:underline">Privacy Policy</Link>
                        <Link href="/legal/disclaimer" className="text-green-500 hover:underline">Disclaimer</Link>
                    </div>
                </div>
            </main>
        </>
    );
}