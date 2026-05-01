"use client"
import { BookOpen, Clock, Target, Lightbulb } from "lucide-react"

export default function LearningTips() {
  const studyTechniques = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Active Recall",
      description: "Test yourself regularly instead of just re-reading notes"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Spaced Repetition",
      description: "Review material at increasing intervals over time"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break"
    }
  ]

  const timeManagementTips = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Set Daily Goals",
      description: "Dedicate at least 7 hours daily for focused learning"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Weekly Planning",
      description: "Commit at least 45 hours per week to your courses"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Prioritize Tasks",
      description: "Complete important assignments before deadlines"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Learning <span className="text-primary">Tips</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Boost your learning efficiency with these proven techniques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Techniques */}
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Study Techniques</h3>
            </div>
            
            <div className="space-y-4">
              {studyTechniques.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 text-primary">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{tip.title}</h4>
                    <p className="text-sm text-base-content/70">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Management Tips */}
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Time Management</h3>
            </div>
            
            <div className="space-y-4">
              {timeManagementTips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 text-secondary">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{tip.title}</h4>
                    <p className="text-sm text-base-content/70">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}