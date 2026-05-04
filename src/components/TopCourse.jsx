import Link from "next/link"
import { Star, User, Clock, ArrowRight, TrendingUp } from "lucide-react"
import Image from "next/image"

export default async function TopCourses() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 3600 } 
  })

  if (!res.ok) {
    return <p className="text-center text-error">Failed to load courses</p>
  }

  const data = await res.json()
  const courses = data.courses || data
  const topCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          🔥 Popular <span className="text-primary">Courses</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topCourses.map((course) => (
            <div 
              key={course.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* ✅ Fixed Image Container */}
              <figure className="relative h-48 px-4 pt-4">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill
                  sizes="400px"
                  className="rounded-xl object-cover"
                  loading="lazy" 
                />
              </figure>
              
              <div className="card-body p-4 sm:p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-primary badge-sm">{course.category}</span>
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                </div>

                <h3 className="card-title text-lg mb-2 line-clamp-2">{course.title}</h3>
                
                {/* Instructor & Duration */}
                <div className="flex flex-wrap gap-3 text-sm text-base-content/70 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="truncate">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="mb-4">
                  <span className={`badge badge-sm ${
                    course.level === 'Beginner' ? 'badge-success' :
                    course.level === 'Intermediate' ? 'badge-warning' : 'badge-error'
                  }`}>
                    {course.level}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="card-actions">
                  <Link 
                    href={`/Courses/${course.id}`} 
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}