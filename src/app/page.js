import Banner from "@/components/Banner";
import LearningTips from "@/components/LearningTips";
import TopCourse from "@/components/TopCourse";
import InstructorCard from "@/components/InstructorCard";

export default function Home() {
  return (
   <div>
    <Banner/>
    <TopCourse/>
    <LearningTips/>
    <InstructorCard/>

   </div>
  );
}
