
import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, Users, User } from "lucide-react";

export const AchievementBadges = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium">Newcomer</h3>
            <p className="text-xs text-gray-500 mt-1">Joined the platform</p>
          </CardContent>
        </Card>
        
        <Card className="text-center opacity-40">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium">First Application</h3>
            <p className="text-xs text-gray-500 mt-1">Apply to a job</p>
          </CardContent>
        </Card>
        
        <Card className="text-center opacity-40">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium">Squad Joiner</h3>
            <p className="text-xs text-gray-500 mt-1">Join a peer group</p>
          </CardContent>
        </Card>
        
        <Card className="text-center opacity-40">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium">Profile Pro</h3>
            <p className="text-xs text-gray-500 mt-1">Complete your profile</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
