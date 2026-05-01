import Link from "next/link"
import { Star, Clock, BookOpen } from "lucide-react"
import CourseSearch from "@/components/CourseSearch" // নিচে এই কম্পোনেন্টের কোড দেওয়া হলো

// Async Function (Server Component)
export default async function AllCourses() {
  // Direct fetch inside the function
  const res = await fetch("http://localhost:3000/data.json")
  const courses = await res.json()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            All <span className="text-primary">Courses</span>
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Explore our comprehensive collection of courses designed to help you master new skills
          </p>
        </div>

        {/* Search Bar (Client Component) */}
        <div className="max-w-xl mx-auto mb-10">
          <CourseSearch />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-base-content/70">
            Showing <span className="font-semibold text-primary">{courses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Course Image */}
              <figure className="px-4 pt-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 badge badge-primary badge-sm">
                    {course.category}
                  </span>
                </div>
              </figure>

              <div className="card-body p-6">
                {/* Rating & Level */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                  <span
                    className={`badge badge-sm ${
                      course.level === "Beginner"
                        ? "badge-success"
                        : course.level === "Intermediate"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="card-title text-lg mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Instructor & Duration */}
                <div className="space-y-2 mb-4 text-sm text-base-content/70">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}