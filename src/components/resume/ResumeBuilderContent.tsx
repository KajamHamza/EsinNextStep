/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeBasicInfo } from './ResumeBasicInfo';
import { ResumeEducation } from './ResumeEducation';
import { ResumeExperience } from './ResumeExperience';
import { ResumeSkills } from './ResumeSkills';
import { ResumeProjects } from './ResumeProjects';
import { ResumePreview } from './ResumePreview';
import { ResumeAIAssistant } from './ResumeAIAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Check, Clock, Save, FileX, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useResume } from '@/hooks/use-resume';
import { ResumeData } from '@/types/resume';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResumeBuilderContentProps {
  accountType: 'free' | 'premium';
  aiUsageCount: number;
  updateAIUsage: () => Promise<number>;
  aiUsageLimit: number;
}

export type Resume = {
  id?: string;
  user_id?: string;
  basic_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    start_date: string;
    end_date?: string;
    current?: boolean;
    location?: string;
    gpa?: string;
    achievements?: string[];
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    current?: boolean;
    location?: string;
    description: string;
    achievements?: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages?: string[];
    certifications?: string[];
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github_link?: string;
  }>;
  created_at?: string;
  updated_at?: string;
};

export const ResumeBuilderContent = ({ accountType }: ResumeBuilderContentProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiUsageRemaining, setAiUsageRemaining] = useState(3);
  const [newResumeOpen, setNewResumeOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  
  const { 
    resume, 
    resumes, 
    updateResumeSection, 
    saveResume, 
    loading: resumeLoading, 
    saving: resumeSaving 
  } = useResume();

  // Track AI usage in localStorage
  useEffect(() => {
    const storedUsage = localStorage.getItem('aiAssistantUsage');
    if (storedUsage) {
      const usage = JSON.parse(storedUsage);
      const today = new Date().toISOString().split('T')[0];
      
      // Reset usage if it's a new day
      if (usage.date !== today) {
        localStorage.setItem('aiAssistantUsage', JSON.stringify({
          date: today,
          count: 0
        }));
        setAiUsageRemaining(3);
      } else {
        // Calculate remaining uses for today
        setAiUsageRemaining(Math.max(0, 3 - usage.count));
      }
    } else {
      // Initialize usage tracking
      localStorage.setItem('aiAssistantUsage', JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        count: 0
      }));
    }
  }, []);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Get user email from auth session
        setStudentEmail(session.user.email || '');

        // Check if the user has a student profile
        const { data: studentData } = await supabase
          .from('student_profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        if (studentData && resume) {
          // Pre-fill basic info with user profile data if not already filled
          if (!resume.basic_info.name || resume.basic_info.name.trim() === '') {
            updateResumeSection('basic_info', {
              ...resume.basic_info,
              name: `${studentData.first_name || ''} ${studentData.last_name || ''}`.trim(),
              email: session.user.email || resume.basic_info.email
            });
          }
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!resumeLoading) {
      fetchStudentProfile();
    }
  }, [resumeLoading, resume, updateResumeSection]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        variant: "destructive",
        title: "Popup blocked",
        description: "Please allow popups to print your resume",
      });
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1, h2 {
              color: #444;
              margin-bottom: 0.5rem;
            }
            h1 {
              font-size: 1.5rem;
              border-bottom: 1px solid #ddd;
              padding-bottom: 0.5rem;
            }
            h2 {
              font-size: 1.2rem;
              margin-top: 1.5rem;
            }
            .header {
              text-align: center;
              margin-bottom: 1rem;
            }
            .contact {
              text-align: center;
              margin-bottom: 1.5rem;
              font-size: 0.9rem;
            }
            .section {
              margin-bottom: 1.5rem;
            }
            .item {
              margin-bottom: 1rem;
            }
            .item-header {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
            }
            .item-subheader {
              display: flex;
              justify-content: space-between;
              font-style: italic;
              margin-bottom: 0.3rem;
            }
            .skills {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            .skill {
              background: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.8rem;
            }
            @media print {
              body {
                padding: 0;
              }
              @page {
                margin: 1.5cm;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${resume?.basic_info?.name || 'Your Name'}</h1>
          </div>
          <div class="contact">
            ${resume?.basic_info?.email ? `<span>${resume.basic_info.email}</span> | ` : ''}
            ${resume?.basic_info?.phone ? `<span>${resume.basic_info.phone}</span> | ` : ''}
            ${resume?.basic_info?.location ? `<span>${resume.basic_info.location}</span>` : ''}
            ${(resume?.basic_info?.website || resume?.basic_info?.linkedin) ? '<br>' : ''}
            ${resume?.basic_info?.website ? `<span>${resume.basic_info.website}</span>` : ''}
            ${(resume?.basic_info?.website && resume?.basic_info?.linkedin) ? ' | ' : ''}
            ${resume?.basic_info?.linkedin ? `<span>${resume.basic_info.linkedin}</span>` : ''}
          </div>
          
          ${resume?.experience && resume.experience.length > 0 ? `
          <div class="section">
            <h2>EXPERIENCE</h2>
            ${resume.experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <div>${exp.position}</div>
                  <div>${new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${exp.current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</div>
                </div>
                <div class="item-subheader">
                  <div>${exp.company}</div>
                  <div>${exp.location || ''}</div>
                </div>
                <div>${exp.description}</div>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${resume?.education && resume.education.length > 0 ? `
          <div class="section">
            <h2>EDUCATION</h2>
            ${resume.education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <div>${edu.institution}</div>
                  <div>${new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${edu.current ? 'Present' : edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</div>
                </div>
                <div class="item-subheader">
                  <div>${edu.degree} in ${edu.field}</div>
                  <div>${edu.location || ''}</div>
                </div>
                ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${(resume?.skills?.technical.length > 0 || resume?.skills?.soft.length > 0) ? `
          <div class="section">
            <h2>SKILLS</h2>
            ${resume.skills.technical.length > 0 ? `
              <div>
                <strong>Technical Skills:</strong> ${resume.skills.technical.join(', ')}
              </div>
            ` : ''}
            ${resume.skills.soft.length > 0 ? `
              <div>
                <strong>Soft Skills:</strong> ${resume.skills.soft.join(', ')}
              </div>
            ` : ''}
          </div>
          ` : ''}
          
          ${resume?.projects && resume.projects.length > 0 ? `
          <div class="section">
            <h2>PROJECTS</h2>
            ${resume.projects.map(project => `
              <div class="item">
                <div class="item-header">
                  <div>${project.title}</div>
                  <div>${project.technologies.join(', ')}</div>
                </div>
                <div>${project.description}</div>
                ${(project.link || project.github_link) ? `
                  <div>
                    ${project.github_link ? `<span>GitHub: ${project.github_link}</span>` : ''}
                    ${(project.github_link && project.link) ? ' | ' : ''}
                    ${project.link ? `<span>Link: ${project.link}</span>` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveResume();
      
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully",
      });
    } catch (error: any) {
      console.error('Error saving resume:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save resume",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAIUsage = () => {
    if (accountType === 'premium') return true;
    
    const storedUsage = localStorage.getItem('aiAssistantUsage');
    if (storedUsage) {
      const usage = JSON.parse(storedUsage);
      const today = new Date().toISOString().split('T')[0];
      
      if (usage.date !== today) {
        // Reset for new day
        localStorage.setItem('aiAssistantUsage', JSON.stringify({
          date: today,
          count: 1
        }));
        setAiUsageRemaining(2);
        return true;
      } else if (usage.count < 3) {
        // Increment usage
        localStorage.setItem('aiAssistantUsage', JSON.stringify({
          date: today,
          count: usage.count + 1
        }));
        setAiUsageRemaining(3 - (usage.count + 1));
        return true;
      } else {
        // Usage limit reached
        toast({
          variant: "destructive",
          title: "AI usage limit reached",
          description: "You've reached your free AI assistant usage limit for today. Upgrade to premium for unlimited access.",
        });
        return false;
      }
    } else {
      // First time using AI
      localStorage.setItem('aiAssistantUsage', JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        count: 1
      }));
      setAiUsageRemaining(2);
      return true;
    }
  };

  const createNewResume = async () => {
    if (!newResumeTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Resume title required",
        description: "Please enter a title for your new resume",
      });
      return;
    }
    
    try {
      setSaving(true);
      
      // Create new resume with current user info
      const newResume: Partial<ResumeData> = {
        title: newResumeTitle.trim(),
        basic_info: {
          name: '',
          email: studentEmail,
          phone: '',
          location: ''
        },
        education: [],
        experience: [],
        skills: {
          technical: [],
          soft: []
        },
        projects: []
      };
      
      await saveResume(newResume as ResumeData);
      
      toast({
        title: "New resume created",
        description: "Your new resume has been created successfully",
      });
      
      setNewResumeOpen(false);
      setNewResumeTitle('');
    } catch (error: any) {
      console.error('Error creating new resume:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create new resume",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || resumeLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            <Badge variant={accountType === 'premium' ? 'default' : 'outline'} className={accountType === 'premium' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}>
              {accountType === 'premium' ? 'Premium' : 'Free'}
            </Badge>
          </div>
          <p className="text-muted-foreground">Create and manage your professional resume</p>
        </div>
        
        <div className="flex gap-3">
          <Dialog open={newResumeOpen} onOpenChange={setNewResumeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create New Resume</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                  Enter a title for your new resume.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Resume Title</Label>
                  <Input 
                    id="title"
                    placeholder="e.g., Software Engineer Resume" 
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewResumeOpen(false)}>Cancel</Button>
                <Button onClick={createNewResume} disabled={saving || !newResumeTitle.trim()}>
                  {saving ? 'Creating...' : 'Create Resume'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="flex items-center gap-2">
            {resumes.length > 0 && (
              <select 
                className="px-3 py-2 rounded-md border bg-background"
                value={resume?.id || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  if (selectedId) {
                    window.location.href = `/resume-builder?id=${selectedId}`;
                  }
                }}
              >
                {resumes.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title} {r.is_primary ? '(Primary)' : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-8">
                  <TabsTrigger value="basic">Basics</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="ai" className="relative">
                    AI Assistant
                    {accountType !== 'premium' && aiUsageRemaining < 3 && (
                      <Badge variant="outline" className="absolute -top-2 -right-2 text-xs">
                        {aiUsageRemaining}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic">
                  <ResumeBasicInfo 
                    data={resume?.basic_info} 
                    onChange={(data) => updateResumeSection('basic_info', data)} 
                  />
                </TabsContent>
                
                <TabsContent value="education">
                  <ResumeEducation 
                    data={resume?.education} 
                    onChange={(data) => updateResumeSection('education', data)} 
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ResumeExperience 
                    data={resume?.experience} 
                    onChange={(data) => updateResumeSection('experience', data)} 
                  />
                </TabsContent>
                
                <TabsContent value="skills">
                  <ResumeSkills 
                    data={resume?.skills} 
                    onChange={(data) => updateResumeSection('skills', data)} 
                  />
                </TabsContent>
                
                <TabsContent value="projects">
                  <ResumeProjects 
                    data={resume?.projects} 
                    onChange={(data) => updateResumeSection('projects', data)} 
                  />
                </TabsContent>
                
                <TabsContent value="ai">
                  <ResumeAIAssistant 
                    resume={resume as Resume} 
                    updateResume={(updatedResume) => {
                      // Convert the Resume type to ResumeData type
                      const resumeData: ResumeData = {
                        id: updatedResume.id,
                        user_id: updatedResume.user_id,
                        title: resume?.title || 'Untitled Resume',
                        basic_info: updatedResume.basic_info,
                        education: updatedResume.education,
                        experience: updatedResume.experience,
                        skills: updatedResume.skills,
                        projects: updatedResume.projects,
                        created_at: updatedResume.created_at,
                        updated_at: updatedResume.updated_at,
                        is_primary: resume?.is_primary || false
                      };
                      // Use the useResume hook to update the resume
                      saveResume(resumeData);
                    }} 
                    isPremium={accountType === 'premium'}
                    onAIUsage={handleAIUsage}
                    aiUsageRemaining={aiUsageRemaining}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    const prevTabs: Record<string, string> = {
                      basic: 'basic',
                      education: 'basic',
                      experience: 'education',
                      skills: 'experience',
                      projects: 'skills',
                      ai: 'projects'
                    };
                    setActiveTab(prevTabs[activeTab]);
                  }}
                  disabled={activeTab === 'basic'}
                >
                  Previous
                </Button>
                <Button onClick={handleSave} disabled={resumeSaving} className="gap-2">
                  {resumeSaving ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Resume
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    const nextTabs: Record<string, string> = {
                      basic: 'education',
                      education: 'experience',
                      experience: 'skills',
                      skills: 'projects',
                      projects: 'ai',
                      ai: 'ai'
                    };
                    setActiveTab(nextTabs[activeTab]);
                  }}
                  disabled={activeTab === 'ai'}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handlePrint}>
                    <Printer size={16} />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download size={16} />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
              {resume && <ResumePreview resume={resume as Resume} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
