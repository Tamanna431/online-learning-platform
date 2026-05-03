
import Banner from "@/components/Banner";
import LearningTips from "@/components/LearningTips";
import TopCourse from "@/components/TopCourse";
import InstructorCard from "@/components/InstructorCard";
import NewRelease from "@/components/NewRelease";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
   <div>
    <Banner/>
    <NewRelease/>
    <TopCourse/>
    <LearningTips/>
    <InstructorCard/>

   </div>
  );
}
