
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, FileText, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ProgressCards = () => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(25);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [resumeProgress, setResumeProgress] = useState(50);
  const [applicationsSent, setApplicationsSent] = useState(0);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Fetch student profile data for XP and level
        const { data: profileData } = await supabase
          .from('student_profiles')
          .select('xp_points, level')
          .eq('id', session.user.id)
          .single();

        if (profileData) {
          setLevel(profileData.level || 1);
          setXp(profileData.xp_points || 25);
          // Calculate XP to next level based on current level
          setXpToNextLevel((profileData.level || 1) * 100);
        }

        // Calculate resume completion percentage (this would be more complex in a real app)
        // For now, let's use a random value between 0-100 for demo purposes
        setResumeProgress(Math.floor(Math.random() * 100));

        // Since "applications" table isn't in the Supabase types, we'll use a custom query
        // and handle the count manually
        // For now, use a hardcoded value as the applications table doesn't exist yet
        setApplicationsSent(0);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Level Progress Card */}
      <Card className="border-t-4 border-t-purple-600 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Sparkles className="mr-2 h-4 w-4 text-purple-600" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-baseline">
            Level {level}
            <span className="ml-2 text-sm font-normal text-muted-foreground">({xp} XP)</span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full" 
              style={{ width: `${Math.min(100, (xp / xpToNextLevel) * 100)}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {xp}/{xpToNextLevel} XP to Level {level + 1}
          </div>
        </CardContent>
      </Card>
      
      {/* Resume Completion Card */}
      <Card className="border-t-4 border-t-blue-600 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <FileText className="mr-2 h-4 w-4 text-blue-600" />
            Resume Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resumeProgress}%</div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full" 
              style={{ width: `${resumeProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {resumeProgress < 100 ? 'Add your education to earn 25 XP' : 'Resume complete! Great job!'}
          </div>
        </CardContent>
      </Card>
      
      {/* Applications Sent Card */}
      <Card className="border-t-4 border-t-green-600 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Send className="mr-2 h-4 w-4 text-green-600" />
            Applications Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{applicationsSent}</div>
          <div className="mt-4 text-xs text-gray-500">
            {applicationsSent === 0 
              ? 'Start applying to jobs to earn XP' 
              : `You've sent ${applicationsSent} application${applicationsSent === 1 ? '' : 's'}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
