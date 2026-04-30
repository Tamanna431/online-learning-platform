"use client"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Logo Section - Left */}
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png"
            alt="SkillSphere Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain"
          />
          <h3 className="font-bold text-xl">SkillSphere</h3>
        </Link>
      </div>

      {/* Navigation Links - Center (Desktop) */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex gap-2">
          <Link href="/" className="btn btn-ghost btn-sm">Home</Link>
          <Link href="/courses" className="btn btn-ghost btn-sm">Courses</Link>
          <Link href="/my-profile" className="btn btn-ghost btn-sm">Profile</Link>
        </div>
      </div>

      {/* Auth Buttons - Right */}
      <div className="flex-none flex gap-2">
        <Link href="/register" className="btn btn-ghost btn-sm hidden sm:flex">SignUp</Link>
        <Link href="/login" className="btn btn-primary btn-sm">SignIn</Link>
        
        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/my-profile">Profile</Link></li>
            <li><Link href="/register">SignUp</Link></li>
            <li><Link href="/login">SignIn</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}