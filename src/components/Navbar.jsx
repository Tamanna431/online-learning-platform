// src/components/Navbar.jsx
import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export default async function Navbar() {

  // 🔐 Server-side session
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  const user = session?.user || null

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">

      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          🎓 SkillSphere
        </Link>
      </div>

      {/* Center Links */}
      <div className="flex-5 justify-center hidden sm:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link href="/" className="font-medium hover:text-primary">Home</Link>
          </li>
          <li>
            <Link href="/Courses" className="font-medium hover:text-primary">Courses</Link>
          </li>
          {user && (
            <li>
              <Link href="/my-profile" className="font-medium hover:text-primary">Profile</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex justify-end">
        {user ? (
          <div className="dropdown dropdown-end">

            {/* Avatar */}
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-primary">

                {(user.image || user.picture) ? (
                  <img
                    src={user.image || user.picture}
                    alt={user.name || "User"}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Dropdown */}
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link href="/my-profile">Profile</Link>
              </li>
              <li>
                {/* Server logout */}
                <form action="/api/auth/sign-out" method="POST">
                  <button type="submit" className="text-error w-full text-left">
                    Logout
                  </button>
                </form>
              </li>
            </ul>

          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/log-in" className="btn btn-ghost">SignIn</Link>
            <Link href="/signUp" className="btn btn-primary">SignUp</Link>
          </div>
        )}
      </div>

    </nav>
  )
}