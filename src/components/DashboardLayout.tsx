
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rocket,
  Search,
  BookMarked,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  MessageSquare,
  GraduationCap,
  Calendar,
  Award,
  Trophy,
  Target,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type?: "student" | "employer";
}

const DashboardLayout = ({ children, type = "student" }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const studentMenuItems = [
    { 
      label: "Career Journey",
      icon: Rocket,
      path: "/dashboard",
      description: "Your personalized career path"
    },
    { 
      label: "Job Explorer",
      icon: Search,
      path: "/dashboard/jobs",
      description: "Find your perfect match"
    },
    { 
      label: "My Bookmarks",
      icon: BookMarked,
      path: "/dashboard/saved",
      description: "Saved opportunities"
    },
    { 
      label: "Smart Resume",
      icon: FileText,
      path: "/dashboard/resume",
      description: "AI-powered resume builder"
    },
    { 
      label: "Peer Squad",
      icon: Users,
      path: "/dashboard/peers",
      description: "Connect with other students"
    },
    { 
      label: "Mentorship",
      icon: GraduationCap,
      path: "/dashboard/mentors",
      description: "Learn from professionals"
    },
  ];

  const employerMenuItems = [
    { 
      label: "Overview",
      icon: Trophy,
      path: "/employer/dashboard",
      description: "Performance metrics"
    },
    { 
      label: "Job Posts",
      icon: Target,
      path: "/employer/jobs",
      description: "Manage your listings"
    },
    { 
      label: "Candidates",
      icon: Users,
      path: "/employer/candidates",
      description: "Review applications"
    },
    { 
      label: "Messages",
      icon: MessageSquare,
      path: "/employer/messages",
      description: "Chat with candidates"
    },
    { 
      label: "Analytics",
      icon: Award,
      path: "/employer/analytics",
      description: "Track performance"
    },
  ];

  const menuItems = type === "student" ? studentMenuItems : employerMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600">EsinNextStep</h2>
            <p className="text-sm text-gray-600 mt-1">
              {type === "student" ? "Student Portal" : "Employer Portal"}
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-start">
                  <item.icon className="h-5 w-5 mr-3 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => navigate("/")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-72" : ""
        )}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
