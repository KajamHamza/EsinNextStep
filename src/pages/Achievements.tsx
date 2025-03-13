
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { achievementService, type Achievement } from "@/services/achievementService";
import { Award, Calendar, CheckCircle2, Trophy } from "lucide-react";
import { format } from "date-fns";
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileHeader } from '@/components/dashboard/MobileHeader';

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{role: 'student' | 'employer'} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userAchievements = await achievementService.getUserAchievements();
        setAchievements(userAchievements);
        
        // Set a default profile for now
        setProfile({ role: 'student' });
      } catch (error) {
        console.error("Error fetching achievements:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load achievements",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [toast]);

  const totalXP = achievements.reduce((sum, achievement) => sum + achievement.xp_awarded, 0);
  
  // Group achievements by type
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const handleLogout = async () => {
    // Handle logout
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
        <Sidebar userRole="student" onLogout={handleLogout} />
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
          <MobileHeader onLogout={handleLogout} />
          <main className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Achievements</h1>
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      <Sidebar userRole="student" onLogout={handleLogout} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <MobileHeader onLogout={handleLogout} />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Achievements</h1>
                <p className="text-muted-foreground mt-1">Track your progress and unlock new badges</p>
              </div>
              
              <Card className="p-4 flex items-center gap-3 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800 w-full sm:w-auto">
                <Award className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-xl font-bold">{totalXP} points</p>
                </div>
              </Card>
            </div>
            
            {achievements.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No Achievements Yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Complete tasks, apply to jobs, and improve your profile to earn achievements and gain XP points.
                  </p>
                  <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="job">Job Hunt</TabsTrigger>
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-8 animate-fade-in">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                      <AchievementCard 
                        key={achievement.id} 
                        achievement={achievement} 
                        onClick={() => navigate(`/achievements/${achievement.id}`)} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                {Object.keys(groupedAchievements).map((type) => (
                  <TabsContent key={type} value={type.toLowerCase()} className="space-y-8 animate-fade-in">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {groupedAchievements[type].map((achievement) => (
                        <AchievementCard 
                          key={achievement.id} 
                          achievement={achievement} 
                          onClick={() => navigate(`/achievements/${achievement.id}`)} 
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  onClick: () => void;
}

const AchievementCard = ({ achievement, onClick }: AchievementCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-12" />
      <CardHeader className="pt-6 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            {achievement.badge_image_url ? (
              <img 
                src={achievement.badge_image_url} 
                alt={achievement.name} 
                className="h-12 w-12 rounded-full -mt-10 border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800"
              />
            ) : (
              <div className="h-12 w-12 rounded-full -mt-10 border-4 border-white dark:border-gray-800 bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-base font-semibold">{achievement.name}</CardTitle>
              <CardDescription className="text-xs flex items-center mt-1">
                <Award className="h-3 w-3 mr-1" />
                {achievement.xp_awarded} XP
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        {achievement.description && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{achievement.description}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          Earned on {format(new Date(achievement.earned_at), 'MMM dd, yyyy')}
        </p>
      </CardContent>
    </Card>
  );
};

export default Achievements;
