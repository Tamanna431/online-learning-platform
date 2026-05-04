import Link from "next/link"
import { Star, Clock, BookOpen, Search } from "lucide-react"
import CourseSearch from "@/components/CourseSearch"
import Image from "next/image"
export default async function AllCoursesPage({ searchParams }) {
  const { search } = await searchParams
  const query = search || ""
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 3600 },
    cache: "force-cache"
  })
  const allCourses = await res.json()
  const filtered = allCourses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">All <span className="text-primary">Courses</span></h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Find the perfect course to boost your skills
          </p>
        </div>
        <div className="mb-10">
          <CourseSearch />
        </div>
        <div className="mb-6">
          <p className="text-base-content/70">
            Showing <span className="font-semibold text-primary">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
            {query && ` for "${query}"`}
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm">
            <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-base-content/30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-base-content/70">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(course => (
              <div key={course.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300">
                <figure className="px-4 pt-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="rounded-xl w-full h-48 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="card-body p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="badge badge-primary badge-sm">{course.category}</span>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="card-title text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <div className="space-y-2 mb-4 text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 flex-shrink-0" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="card-actions mt-auto">
                    <Link href={`/Courses/${course.id}`} className="btn btn-primary btn-sm w-full">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}