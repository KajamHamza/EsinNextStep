
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, Github, Mail, FileText, Linkedin,
  Upload, CheckCircle2, Rocket, GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [importMethod, setImportMethod] = useState<"manual" | "resume" | "linkedin" | null>(null);
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle resume file upload
    console.log("File uploaded:", event.target.files?.[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i === 1 && <Rocket className="h-5 w-5" />}
                  {i === 2 && <GraduationCap className="h-5 w-5" />}
                  {i === 3 && <CheckCircle2 className="h-5 w-5" />}
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {i === 1 && "Start"}
                  {i === 2 && "Profile"}
                  {i === 3 && "Interests"}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6 fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to EsinNextStep</h2>
                <p className="text-gray-600">Let's get you started with your career journey</p>
              </div>
              
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={handleContinue}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleContinue}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Build Your Profile</h2>
                <p className="text-gray-600">Import your information or fill manually</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant={importMethod === "linkedin" ? "default" : "outline"}
                  className="h-auto py-4 flex items-center justify-start space-x-4"
                  onClick={() => setImportMethod("linkedin")}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Import from LinkedIn</div>
                    <p className="text-sm text-gray-500">Quick import of your professional profile</p>
                  </div>
                </Button>

                <Button
                  variant={importMethod === "resume" ? "default" : "outline"}
                  className="h-auto py-4 flex items-center justify-start space-x-4"
                  onClick={() => setImportMethod("resume")}
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Upload Resume</div>
                    <p className="text-sm text-gray-500">Import from your existing resume</p>
                  </div>
                </Button>

                <Button
                  variant={importMethod === "manual" ? "default" : "outline"}
                  className="h-auto py-4 flex items-center justify-start space-x-4"
                  onClick={() => setImportMethod("manual")}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Manual Entry</div>
                    <p className="text-sm text-gray-500">Fill in your details manually</p>
                  </div>
                </Button>
              </div>

              {importMethod === "manual" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input id="university" placeholder="Where did you study?" />
                  </div>
                  
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input id="graduationYear" placeholder="When did/will you graduate?" />
                  </div>
                </div>
              )}

              {importMethod === "resume" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                      onChange={handleFileUpload}
                    />
                    <Label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Drop your resume here or click to upload
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Supports PDF, DOC, DOCX
                      </span>
                    </Label>
                  </div>
                </div>
              )}

              {importMethod && (
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleContinue}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Your Interests</h2>
                <p className="text-gray-600">Select areas that interest you most</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Software Development",
                  "Data Science",
                  "Design",
                  "Marketing",
                  "Finance",
                  "Product Management",
                  "Business Analysis",
                  "Consulting"
                ].map((interest) => (
                  <Button
                    key={interest}
                    variant="outline"
                    className="h-auto py-3 px-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500"
                  >
                    {interest}
                  </Button>
                ))}
              </div>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleContinue}
              >
                Complete Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
