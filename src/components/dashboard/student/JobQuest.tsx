
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const JobQuest = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Job Quest</h2>
      <Card>
        <CardHeader>
          <CardTitle>Priority Task</CardTitle>
          <CardDescription>Complete this task to unlock more job opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Add 3 skills to your profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              This will help match you with 50+ more jobs that align with your skills.
            </p>
            <Button>Add Skills Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
