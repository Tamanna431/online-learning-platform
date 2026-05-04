"use client"
import { Star, Users, Award } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function InstructorCard() {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/instructors.json")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading instructors:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Loading instructors...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Top <span className="text-primary">Instructors</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Learn from industry experts with years of real-world experience
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Instructor Image */}
              <figure className="px-6 pt-6">
                <div className="relative w-32 h-32">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="400"
                    className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </figure>

              <div className="card-body items-center text-center p-6">
                <h3 className="card-title text-lg mb-1">{instructor.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {instructor.role}
                </p>

                
                <span className="badge badge-outline badge-sm mb-3">
                  {instructor.specialty}
                </span>
                <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                  {instructor.bio}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-bold">{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{instructor.students}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}