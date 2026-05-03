import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export default async function MyProfilePage() {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })
    if (!session?.user) {
      redirect("/log-in?callbackUrl=/my-profile")
    }

    const user = session.user
    const rawImage = user?.image || user?.picture
    const userImage = typeof rawImage === 'string' && rawImage.trim() !== "" ? rawImage : null

    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="btn btn-ghost mb-6 gap-2">
            <span>←</span> Back to Home
          </Link>

          <div className="card bg-base-100 shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>

            <div className="space-y-6">
              
             

              {/* ✅ User Info */}
              <div className="divider my-2"></div>

              <div>
                <p className="text-sm font-medium text-base-content/70">Full Name</p>
                <p className="text-xl font-bold">{user?.name || "Not set"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-base-content/70">Email Address</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

            </div>
             {/* ✅ Profile Image Section */}
              <div>
                <p className="text-sm font-medium text-base-content/70 mb-2">Profile Image</p>
                
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue shadow-lg text-center items-center text-2xl p-4"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

            {/* ✅ Action Buttons */}
            <div className="flex gap-4 mt-10">
              <Link href="/my-profile/update" className="btn btn-primary px-8">
                Update Profile
              </Link>
              
              {/* Logout Form */}
              <form action="/api/auth/sign-out" method="POST">
                <button type="submit" className="btn btn-outline btn-error">
                  Logout
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Profile Error:", error)
    redirect("/log-in")
  }
}