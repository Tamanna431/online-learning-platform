import Banner from "@/components/Banner";
import LearningTips from "@/components/LearningTips";
import TopCourse from "@/components/TopCourse";
import InstructorCard from "@/components/InstructorCard";
export const dynamic = 'force-dynamic';

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
