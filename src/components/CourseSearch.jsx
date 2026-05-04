"use client"
import { Search, X } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function CourseSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
 // const [query, setQuery] = useState("")
const [query, setQuery] = useState(
  searchParams.get("search") || ""
)

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    
    if (query.trim()) {
      params.set("search", query.trim())
    } else {
      params.delete("search")
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearSearch = () => {
    setQuery("")
    router.push(pathname)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5 pointer-events-none" />
      
      <input
        type="text"
        placeholder="Search courses by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered w-full pl-12 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100"
      />
      
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      <button type="submit" className="hidden">Search</button>
    </form>
  )
}