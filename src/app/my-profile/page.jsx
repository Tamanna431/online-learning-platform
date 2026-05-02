import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers" // ✅ headers import করুন
import { auth } from "@/lib/auth"

export default async function MyProfilePage() {
  try {
    // ✅ cookies() await করতে হবে
    const cookieStore = await cookies()
    
    const session = await auth.api.getSession({
      headers: await headers(), // ✅ headers() ও await করতে হবে
      cookies: cookieStore.toString(),
    })

    if (!session?.user) {
     redirect("/log-in?callbackUrl=/my-profile")
   }

    const user = session.user

    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="btn btn-ghost mb-6">
            ← Back to Home
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="text-3xl font-bold mb-6">My Profile</h1>
              
              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-base-content/60">Name</p>
                  <p className="text-lg font-semibold">{user?.name || "Not set"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-base-content/60">Email</p>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-base-content/60">Profile Image</p>
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
                  ) : (
                    <p className="text-base-content/50">No image</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <Link href="/my-profile/update" className="btn btn-primary">
                  Update Profile
                </Link>
                
                <form action="/api/auth/sign-out" method="POST">
                  <button type="submit" className="btn btn-outline btn-error">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Profile error:", error)
   // redirect("/login")
  }
}