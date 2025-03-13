
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

export const MentorshipCard = () => {
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      avatar: null,
      availability: "Available this week"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Engineer",
      avatar: null,
      availability: "Limited availability"
    }
  ];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Users className="mr-2 h-5 w-5 text-green-500" />
          Mentorship
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Connect with industry mentors for guidance and advice</p>
        
        <div className="space-y-3">
          {mentors.map(mentor => (
            <div key={mentor.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={mentor.avatar || ''} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">{mentor.name}</h4>
                  <p className="text-xs text-muted-foreground">{mentor.role}</p>
                  <p className="text-xs text-green-600">{mentor.availability}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </div>
          ))}
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-3 mt-4 border border-purple-100 dark:border-purple-800">
          <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300">Premium Mentorship</h4>
          <p className="text-xs text-muted-foreground mt-1">Upgrade to premium for unlimited mentorship access and priority booking.</p>
          <Button size="sm" className="w-full mt-2 bg-purple-600 hover:bg-purple-700">Upgrade Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};
