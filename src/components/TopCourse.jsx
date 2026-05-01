"use client"
import Link from "next/link"
import { Star, User, Clock, ArrowRight, TrendingUp,FireExtinguisherIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function TopCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading courses:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading courses...</p>
        </div>
      </section>
    )
  }

  const topCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        🔥
         Popular <span className="text-primary">Courses</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topCourses.map((course) => (
          <div 
            key={course.id} 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            
            <figure className="px-4 pt-4">
              <img 
                src={course.image} 
                alt={course.title} 
                className="rounded-xl w-full h-48 object-cover"
              />
            </figure>
            
            <div className="card-body">
              {/* Category Badge */}
              <div className="flex justify-between items-center mb-2">
                <span className="badge badge-primary badge-sm">{course.category}</span>
                <div className="flex items-center gap-1 text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold">{course.rating}</span>
                </div>
              </div>

              
              <h3 className="card-title text-lg mb-2">{course.title}</h3>
              
              {/* Instructor & Duration */}
              <div className="flex flex-wrap gap-3 text-sm text-base-content/70 mb-3">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

             
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
                  href={`/courses/${course.id}`} 
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
      <div className="text-center mt-10">
        <Link href="/courses" className="btn btn-outline btn-lg">
          View All Courses
          <TrendingUp className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </section>
  )
}