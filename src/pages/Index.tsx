import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Briefcase, GraduationCap, Users, 
  Building2, Star, CheckCircle2, FileText, Rocket,
  Sparkles, Award, MessageSquare
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Rocket className="w-12 h-12 text-blue-500" />,
      title: "Smart Career Path",
      description: "AI-powered guidance to navigate your early career journey with confidence."
    },
    {
      icon: <FileText className="w-12 h-12 text-green-500" />,
      title: "Resume Builder",
      description: "Transform your experiences into a professional resume with our AI tools."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Peer Squad",
      description: "Join motivated peers for support, feedback, and shared success."
    }
  ];

  const benefits = [
    {
      title: "Resume Import",
      description: "Quick setup with LinkedIn or resume import",
      icon: <FileText className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Personalized Matches",
      description: "AI-powered job recommendations",
      icon: <Star className="w-6 h-6 text-yellow-500" />
    },
    {
      title: "Mentor Network",
      description: "Connect with industry professionals",
      icon: <GraduationCap className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Peer Support",
      description: "Learn and grow with fellow graduates",
      icon: <MessageSquare className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Your first career step starts here
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Launch Your Career with
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"> EsinNextStep</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The AI-powered platform connecting fresh graduates with their ideal first jobs.
              Import your experience, join peer squads, and get personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8"
                onClick={() => window.location.href = '/onboarding'}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 border-2 border-blue-500"
                onClick={() => window.location.href = '/employer/onboarding'}
              >
                I'm an Employer
                <Building2 className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-400">
              <div>
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-sm">Placement Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">10k+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Partner Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Your Career Success Platform
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to launch your career, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl border-2 hover:border-blue-200 transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose EsinNextStep?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1">{benefit.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 absolute inset-0" />
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-white shadow-lg p-6" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of graduates who found their dream jobs through EsinNextStep.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8"
            onClick={() => window.location.href = '/onboarding'}
          >
            Get Started Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
