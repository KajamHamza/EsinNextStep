/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { ResumeBuilderContent } from '@/components/resume/ResumeBuilderContent';

// Define a type for the user profile
type Profile = {
  id: string;
  role: 'student' | 'employer';
  account_type: 'free' | 'premium';
};

// Define a type for AI usage tracking
type AIUsageData = {
  count: number;
  date: string; // ISO date string
};

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [renderContent, setRenderContent] = useState(false); // Additional state to control rendering
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const [aiUsageDate, setAiUsageDate] = useState<string | null>(null);
  
  // Use refs to prevent unnecessary re-renders
  const sessionIdRef = useRef<string | null>(null);
  const profileLoadedRef = useRef(false);
  const loadingTimeoutRef = useRef<number | null>(null);

  // Function to handle profile data
  const fetchProfileData = useCallback(async () => {
    if (profileLoadedRef.current) return; // Prevent multiple fetches
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Store session ID in ref
      sessionIdRef.current = session.user.id;

      // Fetch profile data with a single call
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profileError) {
        if (profileError.code === 'PGRST116') {
          toast({
            variant: "destructive",
            title: "Profile not found",
            description: "Please log in again",
          });
          navigate('/auth');
          return;
        }
        throw profileError;
      }
      
      if (data.role !== 'student') {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "Resume builder is only available for students",
        });
        navigate('/dashboard');
        return;
      }
      
      // Set profile data
      setProfile(data as Profile);
      profileLoadedRef.current = true;
      
      // Handle AI usage data with a single localStorage access
      const today = new Date().toISOString().split('T')[0];
      const storedUsage = localStorage.getItem(`ai_usage_${session.user.id}`);
      let usageCount = 0;
      
      if (storedUsage) {
        const usageData: AIUsageData = JSON.parse(storedUsage);
        
        // Reset counter if it's a new day, otherwise use stored count
        usageCount = usageData.date === today ? usageData.count : 0;
      }
      
      // Update localStorage if needed
      localStorage.setItem(`ai_usage_${session.user.id}`, JSON.stringify({
        count: usageCount,
        date: today
      }));
      
      // Set state once
      setAiUsageCount(usageCount);
      setAiUsageDate(today);
      
      // Ensure we have a clean transition from loading to content
      setTimeout(() => {
        setLoading(false);
        // Add small delay before showing content to prevent flash
        setTimeout(() => {
          setRenderContent(true);
        }, 50);
      }, 300);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Please log in again",
      });
      navigate('/auth');
    }
  }, [navigate, toast]);

  // Initial load with debounce
  useEffect(() => {
    // Set minimum loading time to prevent flashing
    loadingTimeoutRef.current = window.setTimeout(() => {
      fetchProfileData();
    }, 500); // Slight delay to let components initialize
    
    return () => {
      // Clean up timeout on unmount
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [fetchProfileData]);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true); // Show loading while logging out
      setRenderContent(false);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to log out",
      });
      setLoading(false);
      setRenderContent(true);
    }
  }, [navigate, toast]);
  
  const updateAIUsage = useCallback(() => {
    if (!sessionIdRef.current) return Promise.resolve(aiUsageCount);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const newCount = aiUsageCount + 1;
      
      // Update state first
      setAiUsageCount(newCount);
      
      // Then update localStorage
      localStorage.setItem(`ai_usage_${sessionIdRef.current}`, JSON.stringify({
        count: newCount,
        date: today
      }));
      
      return Promise.resolve(newCount);
    } catch (error) {
      console.error("Error updating AI usage:", error);
      return Promise.resolve(aiUsageCount);
    }
  }, [aiUsageCount]);

  // Render a clean, fixed position loading screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-50 dark:bg-slate-900 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Only render content after loading is complete
  if (!renderContent) {
    return null; // Return empty during transition
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar 
        userRole="student"
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <MobileHeader onLogout={handleLogout} />
        
        {/* Resume Builder Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <ResumeBuilderContent
              accountType={profile?.account_type || 'free'}
              aiUsageCount={aiUsageCount}
              updateAIUsage={updateAIUsage}
              aiUsageLimit={profile?.account_type === 'premium' ? Infinity : 3}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumeBuilder;