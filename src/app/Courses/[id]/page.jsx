
import Link from "next/link"
 import { notFound, redirect } from "next/navigation"
 import { cookies } from "next/headers"
 import { auth } from "@/lib/auth"
 import Image from "next/image" //
import { 
  Star, Clock, User, BookOpen, CheckCircle, 
  ArrowLeft, Award, ShieldCheck 
} from "lucide-react"

export default async function CourseDetailsPage({ params }) {
  const { id } = await params 

   try {
    const session = await auth.api.getSession({
       headers: new Headers({
         cookie:(await cookies()).toString(),
       }),
     })
    
     if (!session?.user) {
      
      redirect(`/log-in?callbackUrl=/Courses/${id}`)
     }
   } catch (error) {
    
     console.warn("Auth check skipped in development mode")
  }

  //  Fetch Course Data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 3600 },
    cache: "force-cache"
  })
  const courses = await res.json()
  const course = courses.find((c) => c.id == id)

   if (!course) notFound()

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/*Back Navigation */}
        <Link 
          href="/Courses" 
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to All Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/*Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={course.image} 
                alt={course.title} 
               
                className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="badge badge-primary badge-lg shadow-md">{course.category}</span>
              </div>
            </div>

            {/* Title & Meta Info */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm sm:text-base">
                <div className="flex items-center gap-1.5 text-warning">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-5 h-5" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <span className={`badge badge-sm sm:badge-md ${
                  course.level === 'Beginner' ? 'badge-success' :
                  course.level === 'Intermediate' ? 'badge-warning' : 'badge-error'
                }`}>
                  {course.level}
                </span>
              </div>

              <p className="text-base-content/80 leading-relaxed text-lg">
                {course.description}
              </p>
            </div>

            {/* Static Curriculum Section */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 flex items-center gap-2 text-primary">
                  <BookOpen className="w-6 h-6" /> Course Curriculum
                </h2>
                <ul className="space-y-4">
                  {[
                    "Introduction & Environment Setup",
                    "Core Fundamentals & Best Practices",
                    "Advanced Techniques & Real-world Examples",
                    "Hands-on Projects & Assignments",
                    "Final Review & Certification Prep"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-base-content/90 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="card-title text-xl">Secure Access</h3>
                </div>
                
                <div className="divider my-2"></div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Instructor</span>
                    <span className="font-semibold text-right">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Level</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Rating</span>
                    <span className="font-semibold text-warning">{course.rating} ⭐</span>
                  </div>
                </div>

                <div className="divider my-4"></div>

                <button className="btn btn-primary btn-lg w-full gap-2 shadow-lg hover:shadow-primary/30 transition-all">
                  <Award className="w-5 h-5" /> Enroll Now
                </button>
                
                <p className="text-xs text-center text-base-content/50 mt-3">
                  Lifetime access • Certificate included • 30-day guarantee
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}