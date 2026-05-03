"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const checkSession = async () => {
    try {
      const { data } = await authClient.getSession()
      setUser(data?.user || null)
    } catch (error) {
      console.error("Session check error:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [pathname]) 
  useEffect(() => {
    const handleStorageChange = () => {
      checkSession()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = async () => {
    await authClient.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            🎓 SkillSphere
          </Link>
        </div>
        <div className="flex-none">
          <div className="loading loading-spinner loading-sm"></div>
        </div>
      </nav>
    )
  }

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

      {/* Right Side - Auth */}
      <div className="flex justify-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-primary">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=random`
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link href="/my-profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">Logout</button>
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