import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Error */}
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        
        <p className="text-base-content/70 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
          
          <Link href="/Courses" className="btn btn-outline">
            Browse Courses
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12">
          <div className="text-6xl">🔍</div>
          <p className="text-sm text-base-content/50 mt-2">
            Let's find something useful for you
          </p>
        </div>
      </div>
    </div>
  )
}