
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, Users, Eye, Plus, BarChart, 
  Clock, CheckCircle, XCircle, Filter, Search,
  TrendingUp, MessageSquare
} from "lucide-react";

const EmployerDashboard = () => {
  const activeJobs = [
    {
      title: "Senior Frontend Developer",
      location: "Remote",
      type: "Full-time",
      applicants: 12,
      qualified: 8,
      views: 145,
      status: "Active",
      trend: "+5 today",
      interviews: 3,
      posted: "5 days ago"
    },
    {
      title: "UX Designer",
      location: "San Francisco, CA",
      type: "Full-time",
      applicants: 8,
      qualified: 5,
      views: 98,
      status: "Active",
      trend: "+3 today",
      interviews: 2,
      posted: "3 days ago"
    }
  ];

  return (
    <DashboardLayout type="employer">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Post Job Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and applications</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input className="pl-10" placeholder="Search jobs or candidates..." />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-blue-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">2</h3>
                  <span className="text-green-500 text-sm">+1 this week</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-green-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Total Applicants</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">20</h3>
                  <span className="text-green-500 text-sm">+8 new</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-purple-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Qualified Matches</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">13</h3>
                  <span className="text-purple-500 text-sm">65% rate</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-orange-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Time to Hire</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">12d</h3>
                  <span className="text-orange-500 text-sm">avg.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Jobs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Job Postings</h2>
          <div className="space-y-4">
            {activeJobs.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all border-2 hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.location} • {job.type}</p>
                    <p className="text-sm text-gray-500 mt-1">Posted {job.posted}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Applicants</span>
                    </div>
                    <p className="mt-1 font-semibold">{job.applicants}</p>
                    <p className="text-xs text-green-500">{job.trend}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">Qualified</span>
                    </div>
                    <p className="mt-1 font-semibold">{job.qualified}</p>
                    <p className="text-xs text-gray-500">{Math.round((job.qualified/job.applicants)*100)}% rate</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Interviews</span>
                    </div>
                    <p className="mt-1 font-semibold">{job.interviews}</p>
                    <p className="text-xs text-purple-500">Scheduled</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Views</span>
                    </div>
                    <p className="mt-1 font-semibold">{job.views}</p>
                    <p className="text-xs text-blue-500">Last 7 days</p>
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

export default EmployerDashboard;
