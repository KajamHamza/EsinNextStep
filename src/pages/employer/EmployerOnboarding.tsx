
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, Building2, Mail, Upload, CheckCircle2, 
  Briefcase, Users, Target, FileText 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    website: "",
    industry: "",
    description: "",
    location: "",
    size: ""
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/employer/dashboard");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
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
                  {i === 1 && <Building2 className="h-5 w-5" />}
                  {i === 2 && <Target className="h-5 w-5" />}
                  {i === 3 && <CheckCircle2 className="h-5 w-5" />}
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {i === 1 && "Start"}
                  {i === 2 && "Company"}
                  {i === 3 && "Profile"}
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
                <p className="text-gray-600">Create your employer account</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center mb-6">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="logo-upload"
                  onChange={handleFileUpload}
                />
                <Label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Upload Company Logo
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Recommended size: 400x400px
                  </span>
                </Label>
              </div>
              
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
                <h2 className="text-2xl font-bold mb-2">Company Information</h2>
                <p className="text-gray-600">Tell us about your company</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Enter company name"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Company Website</Label>
                  <Input 
                    id="website" 
                    placeholder="www.example.com"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input 
                    id="industry" 
                    placeholder="e.g. Technology, Healthcare"
                    value={companyInfo.industry}
                    onChange={(e) => setCompanyInfo({...companyInfo, industry: e.target.value})}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleContinue}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Company Profile</h2>
                <p className="text-gray-600">Help candidates learn more about you</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <textarea
                    id="description"
                    className="w-full h-32 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your company culture and mission..."
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Main Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, Country"
                    value={companyInfo.location}
                    onChange={(e) => setCompanyInfo({...companyInfo, location: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input 
                    id="size" 
                    placeholder="e.g. 1-50, 51-200, 201-500"
                    value={companyInfo.size}
                    onChange={(e) => setCompanyInfo({...companyInfo, size: e.target.value})}
                  />
                </div>
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

export default EmployerOnboarding;
