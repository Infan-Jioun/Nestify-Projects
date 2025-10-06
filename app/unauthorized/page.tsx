// app/unauthorized/page.tsx
import Link from "next/link"
import NextHead from "../components/NextHead/NextHead"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <NextHead title="Access Denied - Nestify" />
            <div className="text-center max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        {" You don't have permission to access this page. Please contact the administrator if you believe this is an error."}
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors block"
                        >
                            Go back to Home
                        </Link>
                        <Link
                            href="/LoginPage"
                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors block"
                        >
                            Sign in with different account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}