
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Sparkles, Lock, CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Resume } from "./ResumeBuilderContent";
import { useToast } from "@/hooks/use-toast";
import { Progress } from '@/components/ui/progress';

interface ResumeAIAssistantProps {
  resume: Resume;
  updateResume: (resume: Resume) => void;
  isPremium: boolean;
  onAIUsage: () => boolean;
  aiUsageRemaining: number;
}

type AssistantTab = 'improve' | 'generate' | 'analyze';

export const ResumeAIAssistant = ({ 
  resume, 
  updateResume, 
  isPremium, 
  onAIUsage,
  aiUsageRemaining
}: ResumeAIAssistantProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AssistantTab>('improve');
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [section, setSection] = useState<string>("");

  // This function would normally call the Gemini API
  // For now, it's a placeholder that returns a fixed response
  const processAIRequest = async () => {
    // Check if user can use AI
    if (!isPremium && !onAIUsage()) {
      return;
    }
    
    try {
      setLoading(true);

      // In a real implementation, this would call the Edge Function with Gemini API
      // For now, just simulate a delay and return a fake response
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (activeTab === 'improve') {
        setResult("I've analyzed your resume and here are some suggestions to improve your " + 
          section + " section:\n\n" +
          "- Be more specific about your achievements\n" +
          "- Use action verbs to start your bullet points\n" +
          "- Quantify your results when possible\n" +
          "- Keep your descriptions concise but impactful");
      } else if (activeTab === 'generate') {
        setResult("Here's a sample professional summary for your resume:\n\n" +
          "Results-driven software engineer with 3+ years of experience developing web applications using modern JavaScript frameworks. Passionate about creating clean, efficient code and delivering exceptional user experiences. Strong problem-solving skills with a focus on scalable architecture and performance optimization.");
      } else if (activeTab === 'analyze') {
        setResult("Resume Analysis:\n\n" +
          "✅ Strong education section\n" +
          "⚠️ Experience descriptions could be more impactful\n" +
          "⚠️ Skills section needs more technical details\n" +
          "✅ Good project descriptions\n\n" +
          "Overall Score: 7/10 - Your resume has good structure but could use more quantifiable achievements and technical details.");
      }

    } catch (error) {
      console.error('Error processing AI request:', error);
      setResult("Sorry, there was an error processing your request. Please try again later.");
      toast({
        variant: "destructive",
        title: "AI Assistant Error",
        description: "There was a problem with the AI assistant. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPremiumFeatureContent = () => (
    <div className="text-center py-8">
      <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
      <p className="text-muted-foreground mb-4">
        Upgrade to Premium to access unlimited AI-powered resume assistance
      </p>
      <div className="mb-6">
        <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Free usage limit</AlertTitle>
          <AlertDescription>
            You have {aiUsageRemaining} free AI assistant uses remaining today
          </AlertDescription>
        </Alert>
      </div>
      <Button variant="default" className="bg-gradient-to-r from-purple-500 to-purple-700">
        <CreditCard className="mr-2 h-4 w-4" />
        Upgrade to Premium
      </Button>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
        Resume AI Assistant
        {isPremium && (
          <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs py-0.5 px-2 rounded-full">
            Premium
          </Badge>
        )}
      </h2>
      
      {!isPremium && aiUsageRemaining === 0 ? (
        getPremiumFeatureContent()
      ) : (
        <>
          {!isPremium && (
            <div className="mb-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Free usage limit</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>You have {aiUsageRemaining} free AI assistant uses remaining today</span>
                  <Button variant="outline" size="sm" className="ml-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white border-none">
                    Upgrade
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as AssistantTab)}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="improve">Improve Section</TabsTrigger>
              <TabsTrigger value="generate">Generate Content</TabsTrigger>
              <TabsTrigger value="analyze">Analyze Resume</TabsTrigger>
            </TabsList>
            
            <TabsContent value="improve">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                    Improve a Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Section</label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background" 
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                      >
                        <option value="">Select a section...</option>
                        <option value="experience">Work Experience</option>
                        <option value="education">Education</option>
                        <option value="skills">Skills</option>
                        <option value="projects">Projects</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Additional Instructions (Optional)</label>
                      <Textarea
                        placeholder="Any specific aspects you want to improve?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={processAIRequest} 
                      disabled={loading || !section} 
                      className="w-full"
                    >
                      {loading ? "Processing..." : "Get Improvement Suggestions"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="generate">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                    Generate Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">What content do you need?</label>
                      <Textarea
                        placeholder="E.g., 'Write a professional summary highlighting my web development skills' or 'Create bullet points for my marketing internship experience'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={processAIRequest} 
                      disabled={loading || !prompt} 
                      className="w-full"
                    >
                      {loading ? "Generating..." : "Generate Content"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analyze">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                    Analyze Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Resume Analysis</AlertTitle>
                    <AlertDescription>
                      Our AI will analyze your entire resume and provide feedback on structure, content, and impact.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={processAIRequest} 
                    disabled={loading} 
                    className="w-full"
                  >
                    {loading ? "Analyzing..." : "Analyze My Resume"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {loading && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Processing your request...</span>
                <span>Please wait</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          )}
          
          {result && (
            <Card className="mt-6 border-t-4 border-t-purple-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  AI Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md whitespace-pre-wrap">
                  {result}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center ${className || 'bg-blue-100 text-blue-800'}`}>
      {children}
    </span>
  );
}
