"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
const newReleases = [
  {
    id: 1,
    title: "AI & Machine Learning Basics",
    instructor: "Dr. Sarah Smith",
    duration: "15 hours",
    rating: 4.9,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    category: "Technology"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Alex Johnson",
    duration: "12 hours",
    rating: 4.7,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    category: "Design"
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    instructor: "Emma Wilson",
    duration: "10 hours",
    rating: 4.8,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "Marketing"
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Michael Brown",
    duration: "18 hours",
    rating: 4.9,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    category: "Data Science"
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "Lisa Chen",
    duration: "16 hours",
    rating: 4.6,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    category: "Development"
  }
]

export default function NewReleasesSlider() {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            🎉 New Releases
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Explore our latest courses added this month
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="pb-12"
        >
          {newReleases.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <figure className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 badge badge-secondary text-white">
                    New
                  </span>
                  <span className="absolute top-3 right-3 badge badge-primary">
                    {course.category}
                  </span>
                </figure>
                
                <div className="card-body">
                  <h3 className="card-title text-lg line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-base-content/70 flex items-center gap-1">
                    👨‍ {course.instructor}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="badge badge-outline badge-sm">
                      ⏱ {course.duration}
                    </span>
                    <span className="badge badge-outline badge-sm">
                      📊 {course.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="rating rating-sm">
                      <input 
                        type="radio" 
                        name={`rating-${course.id}`}
                        value={course.rating} 
                        readOnly 
                        className="mask mask-star-2 bg-orange-400" 
                      />
                    </span>
                    <span className="text-sm font-bold">{course.rating}</span>
                  </div>
                  
                  <div className="card-actions justify-end mt-3">
                    <Link 
                      href={`/Courses/${course.id}`} 
                      className="btn btn-primary btn-sm w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom CSS for Swiper */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #570df8;
            background: rgba(255, 255, 255, 0.9);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }
          .swiper-pagination-bullet {
            background: #570df8;
            opacity: 0.4;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #570df8;
          }
          .swiper:hover .swiper-button-next,
          .swiper:hover .swiper-button-prev {
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  )
}