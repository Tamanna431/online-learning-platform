"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CourseSearch() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    // Search term কে URL এ পাঠানো হচ্ছে (যাতে সার্ভার কম্পোনেন্ট রি-রেন্ডার হয়)
    router.push(`/courses?search=${search}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
      <input
        type="text"
        placeholder="Search courses by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full pl-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button type="submit" className="hidden">Search</button>
    </form>
  )
}