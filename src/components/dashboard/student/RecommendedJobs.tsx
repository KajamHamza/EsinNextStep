
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, Building, MapPin } from "lucide-react";
import { jobService, type Job } from "@/services/jobService";
import { useToast } from "@/hooks/use-toast";

export const RecommendedJobs = () => {
  const [jobs, setJobs] = useState<(Job & { matchScore: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const recommendedJobs = await jobService.getRecommendedJobs();
        setJobs(recommendedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load recommended jobs"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <BriefcaseBusiness className="mr-2 h-5 w-5 text-blue-500" />
          Recommended Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No job recommendations available yet. Add more skills to your profile to get matched with jobs!
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="border rounded-md p-4 hover:border-purple-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {job.location}
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {Math.round(job.matchScore)}% Match
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills_required.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  View Job
                </Button>
              </div>
            ))
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => navigate('/jobs')}
        >
          Browse All Jobs
        </Button>
      </CardContent>
    </Card>
  );
};
