import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Star, Users, MessageSquare, 
  Calendar, FileText, Search, BookMarked, 
  Settings, Award, Trophy, Sparkles, Target,
  Rocket, Zap
} from "lucide-react";

const Dashboard = () => {
  const priorityTasks = [
    {
      title: "Add 3 skills to your profile",
      reward: "Unlock 50+ new job matches",
      progress: 1,
      total: 3,
      xp: 100,
      streak: 2,
      icon: Target
    },
    {
      title: "Complete your education details",
      reward: "Improve match accuracy by 40%",
      progress: 0,
      total: 1,
      xp: 150,
      streak: 0,
      icon: BookMarked
    },
    {
      title: "Connect with 3 peers",
      reward: "Unlock mentor matching",
      progress: 2,
      total: 3,
      xp: 75,
      streak: 4,
      icon: Users
    }
  ];

  const jobMatches = [
    {
      title: "Junior Frontend Developer",
      company: "TechCorp",
      applicants: 12,
      match: 95,
      deadline: "2 days left",
      tags: ["React", "TypeScript"]
    },
    {
      title: "UX/UI Designer",
      company: "DesignStudio",
      applicants: 8,
      match: 92,
      deadline: "5 days left",
      tags: ["Figma", "User Research"]
    }
  ];

  const mentors = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at Google",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      availability: "Next available: Today 4PM",
      expertise: ["Frontend", "React", "Career Growth"]
    },
    {
      name: "Mike Johnson",
      role: "Product Manager at Meta",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      availability: "Next available: Tomorrow 11AM",
      expertise: ["Product Strategy", "Interview Prep"]
    }
  ];

  return (
    <DashboardLayout type="student">
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        {/* User Level Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                L3
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Career Explorer</h3>
                <p className="text-sm text-gray-600">325 XP to next level</p>
              </div>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="font-semibold">1,275 XP</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>

        {/* Daily Streak */}
        <Card className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 mr-3" />
              <div>
                <h3 className="font-bold text-lg">5 Day Streak!</h3>
                <p className="text-sm opacity-90">Keep going to earn bonus XP</p>
              </div>
            </div>
            <Button variant="secondary" className="bg-white text-pink-500 hover:bg-gray-100">
              Claim 50 XP
            </Button>
          </div>
        </Card>

        {/* Priority Tasks */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            Priority Quests
          </h2>
          <div className="space-y-4">
            {priorityTasks.map((task, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow border-2 hover:border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <task.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-blue-600">{task.reward}</p>
                      </div>
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold">+{task.xp} XP</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Progress: {task.progress}/{task.total}
                        </span>
                        {task.streak > 0 && (
                          <span className="flex items-center text-sm text-orange-500">
                            <Zap className="h-4 w-4 mr-1" />
                            {task.streak} day streak
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(task.progress / task.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Matches */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="h-5 w-5 text-blue-500 mr-2" />
            Perfect Matches
          </h2>
          <div className="space-y-4">
            {jobMatches.map((job, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {job.match}% Match
                  </span>
                </div>
                <div className="flex gap-2 mb-3">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} peers applied
                  </div>
                  <span className="text-orange-500 font-medium">{job.deadline}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">Save</Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600">Quick Apply</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Peer Squad Hub */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
            Peer Squad Hub
          </h2>
          <Card className="p-6 border-2 hover:border-green-200 transition-all">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-2xl text-green-600">24</h3>
                <p className="text-sm text-gray-600">Active Peers</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-2xl text-blue-600">5</h3>
                <p className="text-sm text-gray-600">Live Discussions</p>
              </div>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Join Squad Chat
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        {/* Mentor Match */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
            Book a Mentor
          </h2>
          <div className="space-y-4">
            {mentors.map((mentor, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all border-2 hover:border-purple-200">
                <div className="flex items-center">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-200"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-gray-600">{mentor.role}</p>
                    <div className="flex gap-2 mt-1">
                      {mentor.expertise.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-600 mb-2">{mentor.availability}</p>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      Book 15min
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
