"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import toast, { Toaster } from "react-hot-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        image: formData.image || null,
        password: formData.password,
      })

      if (error) {
        toast.error(error.message || "Registration failed")
      } else {
        toast.success("Registration successful! Please login.")
        router.push("/log-in")
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      })
    } catch (err) {
      toast.error("Google registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />
      
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-base-content/70 mb-6">
            Join <span className="text-primary">SkillSphere</span> today
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/photo.jpg"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button 
            onClick={handleGoogleRegister}
            className="btn btn-outline w-full"
            disabled={loading}
          >
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/log-in" className="text-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}