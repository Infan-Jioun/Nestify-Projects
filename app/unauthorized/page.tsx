export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2">You don't have permission to access this page.</p>
          <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Go back to Home
          </a>
        </div>
      </div>
    )
  }