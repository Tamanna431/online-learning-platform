"use client"
import Image from "next/image"

const Banner = () => {
  return (
    <div className="relative bg-base-100 min-h-[500px] py-12 px-4 overflow-hidden mx-auto">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images.png"
          alt="Background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-3">
            🎓 SkillSphere
          </h1>

          <p className="text-xl md:text-2xl text-base-content/90 font-semibold">
            Online Learning Platform
          </p>

          <p className="text-base md:text-lg text-base-content/70 mt-2">
            Learn Anytime, Anywhere
          </p>
        </div>

        <div className="flex justify-center items-center mt-8">
          <div className="w-full max-w-3xl">
            <div className="relative w-full h-[400px]">

              <Image
                src="/banner-img.png"
                alt="Banner"
                fill
                className="object-contain"
              />

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Banner