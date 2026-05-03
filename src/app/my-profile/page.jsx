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
  
          <Link href="/" className="btn btn-ghost mb-6 gap-2">
            <span>←</span> Back to Home
          </Link>

          <div className="card bg-base-100 shadow-xl p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary text-center sm:text-left">My Profile</h1>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              
              {/* ✅ Profile Image Section (Left Side on Desktop) */}
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-base-content/70 mb-3">Profile Image</p>
                
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {userImage ? (
                      <img 
                        src={userImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <span className="text-4xl font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6 w-full">
                <div className="divider sm:divider-horizontal my-0"></div>
                <div>
                  <p className="text-sm font-medium text-base-content/70">Full Name</p>
                  <p className="text-xl font-bold">{user?.name || "Not set"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-base-content/70">Email Address</p>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>
              </div>

            </div>

            <div className="divider"></div>

            {/* ✅ Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
              <Link href="/my-profile/update" className="btn btn-primary w-full sm:w-auto">
                Update Profile
              </Link>
              
              {/* Logout Form */}
              <form action="/api/auth/sign-out" method="POST" className="w-full sm:w-auto">
                <button type="submit" className="btn btn-outline btn-error w-full sm:w-auto">
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