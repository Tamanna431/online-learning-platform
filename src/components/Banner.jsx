import Image from "next/image";



const Banner = () => {
  //const backgroundImage = '/images.png'; 
  return (
    <div className="relative bg-base-100 min-h-[500px] py-12 px-4 overflow-hidden mx-auto">
      <div className="absolute inset-0 z-0">
        <img 
          src= "/images.png"
          alt="Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* 🔹 Content Container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Text Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-3 drop-shadow-lg">
            🎓 SkillSphere
          </h1>
          <p className="text-xl md:text-2xl text-base-content/90 font-semibold drop-shadow-md">
            Online Learning Platform
          </p>
          <p className="text-base md:text-lg text-base-content/70 mt-2 drop-shadow">
            Learn Anytime, Anywhere
          </p>
        </div>

        {/* Center Illustration */}
        <div className="flex justify-center items-center mt-8">
          <div className="w-full max-w-3xl">
            <div className="relative ml-10">
             <img
              src="/banner-img.png" 
              alt="" 
              width={900}
              height={700}
              />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;