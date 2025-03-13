
import { supabase } from '@/integrations/supabase/client';
import { ResumeData, ResumeBasicInfo, ResumeEducation, ResumeExperience, ResumeSkills, ResumeProject } from '@/types/resume';

export const fetchUserResumes = async (): Promise<ResumeData[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Convert database format to ResumeData format
  return data.map(item => ({
    id: item.id,
    user_id: item.user_id,
    title: item.name, // Use name field as title
    basic_info: item.data?.basic_info as ResumeBasicInfo || {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    education: item.data?.education as ResumeEducation[] || [],
    experience: item.data?.experience as ResumeExperience[] || [],
    skills: item.data?.skills as ResumeSkills || { technical: [], soft: [] },
    projects: item.data?.projects as ResumeProject[] || [],
    created_at: item.created_at,
    updated_at: item.updated_at,
    is_primary: item.is_primary
  }));
};

export const fetchResumeById = async (resumeId: string): Promise<ResumeData> => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .single();

  if (error) throw error;
  
  // Convert database format to ResumeData format
  return {
    id: data.id,
    user_id: data.user_id,
    title: data.name, // Use name field as title
    basic_info: data.data?.basic_info as ResumeBasicInfo || {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    education: data.data?.education as ResumeEducation[] || [],
    experience: data.data?.experience as ResumeExperience[] || [],
    skills: data.data?.skills as ResumeSkills || { technical: [], soft: [] },
    projects: data.data?.projects as ResumeProject[] || [],
    created_at: data.created_at,
    updated_at: data.updated_at,
    is_primary: data.is_primary
  };
};

export const saveResume = async (resume: ResumeData): Promise<ResumeData> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("User not authenticated");

  // Convert ResumeData format to database format
  const dbResume = {
    name: resume.title,
    data: {
      basic_info: resume.basic_info,
      education: resume.education,
      experience: resume.experience,
      skills: resume.skills,
      projects: resume.projects
    },
    is_primary: resume.is_primary
  };

  // If resume has an ID, update it; otherwise, insert a new one
  if (resume.id) {
    const { data, error } = await supabase
      .from('resumes')
      .update({
        ...dbResume,
        updated_at: new Date().toISOString()
      })
      .eq('id', resume.id)
      .select()
      .single();

    if (error) throw error;
    
    // Convert back to ResumeData format
    return {
      id: data.id,
      user_id: data.user_id,
      title: data.name,
      basic_info: data.data?.basic_info as ResumeBasicInfo || {
        name: '',
        email: '',
        phone: '',
        location: ''
      },
      education: data.data?.education as ResumeEducation[] || [],
      experience: data.data?.experience as ResumeExperience[] || [],
      skills: data.data?.skills as ResumeSkills || { technical: [], soft: [] },
      projects: data.data?.projects as ResumeProject[] || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      is_primary: data.is_primary
    };
  } else {
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        name: dbResume.name,
        data: dbResume.data,
        is_primary: dbResume.is_primary,
        user_id: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    
    // Convert back to ResumeData format
    return {
      id: data.id,
      user_id: data.user_id,
      title: data.name,
      basic_info: data.data?.basic_info as ResumeBasicInfo || {
        name: '',
        email: '',
        phone: '',
        location: ''
      },
      education: data.data?.education as ResumeEducation[] || [],
      experience: data.data?.experience as ResumeExperience[] || [],
      skills: data.data?.skills as ResumeSkills || { technical: [], soft: [] },
      projects: data.data?.projects as ResumeProject[] || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      is_primary: data.is_primary
    };
  }
};

export const deleteResume = async (resumeId: string): Promise<void> => {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId);

  if (error) throw error;
};

export const setPrimaryResume = async (resumeId: string): Promise<void> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("User not authenticated");

  // First, set all resumes as not primary
  await supabase
    .from('resumes')
    .update({ is_primary: false })
    .eq('user_id', session.user.id);

  // Then set the specified resume as primary
  const { error } = await supabase
    .from('resumes')
    .update({ is_primary: true })
    .eq('id', resumeId);

  if (error) throw error;
};

export const getAIResumeAssistance = async (
  resumeData: Partial<ResumeData>,
  prompt: string
): Promise<string> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("User not authenticated");

  const { data, error } = await supabase.functions.invoke('resume-ai', {
    body: {
      resume: resumeData,
      prompt: prompt
    }
  });

  if (error) throw error;
  return data.response;
};

// Export a resumeService object for ease of use
export const resumeService = {
  getAllResumes: fetchUserResumes,
  getResumeById: fetchResumeById,
  saveResume,
  deleteResume,
  setPrimaryResume,
  getAIResumeAssistance
};
