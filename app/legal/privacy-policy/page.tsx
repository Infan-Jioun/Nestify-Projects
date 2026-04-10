import NextHead from "@/app/components/NextHead/NextHead";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <>
            <NextHead title="Privacy Policy | Nestify" />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-44">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
                    <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

                    <div className="space-y-8 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly, such as your name, email address, phone number, and property preferences when you register or use our services.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">2. How We Use Your Information</h2>
                            <p>We use your information to provide and improve our services, send you relevant property updates, process transactions, and communicate with you about your account.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">3. Information Sharing</h2>
                            <p>We do not sell or rent your personal information to third parties. We may share your information with real estate developers only when you express interest in their properties.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">4. Data Security</h2>
                            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">5. Cookies</h2>
                            <p>We use cookies to enhance your experience on our platform. You can control cookie settings through your browser. See our <Link href="/legal/cookie-policy" className="text-green-500 hover:underline">Cookie Policy</Link> for more details.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">6. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href="mailto:info@nestify.com" className="text-green-500 hover:underline">info@nestify.com</a></p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">7. Third-Party Services</h2>
                            <p>Our platform may integrate with third-party services such as Google Maps and payment processors. These services have their own privacy policies that govern their data practices.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">8. Contact</h2>
                            <p>For privacy-related concerns, contact us at <a href="mailto:info@nestify.com" className="text-green-500 hover:underline">info@nestify.com</a></p>
                        </section>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm">
                        <Link href="/legal/terms-of-use" className="text-green-500 hover:underline">Terms of Use</Link>
                        <Link href="/legal/cookie-policy" className="text-green-500 hover:underline">Cookie Policy</Link>
                        <Link href="/legal/disclaimer" className="text-green-500 hover:underline">Disclaimer</Link>
                    </div>
                </div>
            </main>
        </>
    );
}