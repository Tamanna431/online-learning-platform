"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import toast from "react-hot-toast"

export default function UpdateProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  })

  // Load current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await authClient.getSession()
        if (data?.user) {
          setFormData({
            name: data.user.name || "",
            image: data.user.image || ""
          })
        } else {
          router.push("/log-in?callbackUrl=/my-profile/update")
        }
      } catch {
        toast.error("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [router])

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const { error } = await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || undefined
      })

      if (error) {
        toast.error(error.message || "Failed to update profile")
      } else {
        toast.success("Profile updated successfully!")
        router.push("/my-profile")
        router.refresh()
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setUpdating(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            Update Profile
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                required
                disabled={updating}
              />
            </div>

            {/* Image URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Profile Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                disabled={updating}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Leave empty to keep your current image
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={updating}
              >
                {updating ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  "Update Information"
                )}
              </button>
            </div>
          </form>

          {/* Cancel Button */}
          <div className="text-center mt-4">
            <Link href="/my-profile" className="btn btn-ghost btn-sm">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}