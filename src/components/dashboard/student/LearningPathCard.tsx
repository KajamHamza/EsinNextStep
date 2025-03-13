
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";

export const LearningPathCard = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Award className="mr-2 h-5 w-5 text-yellow-500" />
          Learning Path
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Complete learning paths to earn badges and XP</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Full-Stack Development</h4>
              <span className="text-xs text-purple-600 font-medium">30% Complete</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Interview Preparation</h4>
              <span className="text-xs text-purple-600 font-medium">15% Complete</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Portfolio Building</h4>
              <span className="text-xs text-purple-600 font-medium">0% Complete</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4">View All Learning Paths</Button>
      </CardContent>
    </Card>
  );
};
