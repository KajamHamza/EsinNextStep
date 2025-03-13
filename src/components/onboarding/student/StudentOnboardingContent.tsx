
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { BasicInfoStep } from '@/components/onboarding/student/BasicInfoStep';
import { ProfilePictureStep } from '@/components/onboarding/student/ProfilePictureStep';
import { GitHubStep } from '@/components/onboarding/student/GitHubStep';
import { LinkedInStep } from '@/components/onboarding/student/LinkedInStep';
import { ResumeStep } from '@/components/onboarding/student/ResumeStep';
import { SkillsStep } from '@/components/onboarding/student/SkillsStep';
import { CompletedStep } from '@/components/onboarding/student/CompletedStep';

export const StudentOnboardingContent = () => {
  const { studentStep, studentProgress } = useOnboarding();
  
  const getStepContent = () => {
    switch (studentStep) {
      case 'basic-info':
        return (
          <OnboardingLayout 
            title="Let's set up your student profile" 
            description="Tell us about yourself to get started"
            progress={studentProgress}
            showBackButton={false}
          >
            <BasicInfoStep />
          </OnboardingLayout>
        );
      case 'profile-picture':
        return (
          <OnboardingLayout 
            title="Add a profile picture" 
            description="Upload a professional photo for your profile"
            progress={studentProgress}
          >
            <ProfilePictureStep />
          </OnboardingLayout>
        );
      case 'github':
        return (
          <OnboardingLayout 
            title="Connect with GitHub" 
            description="Showcase your coding projects to potential employers"
            progress={studentProgress}
          >
            <GitHubStep />
          </OnboardingLayout>
        );
      case 'linkedin':
        return (
          <OnboardingLayout 
            title="Connect with LinkedIn" 
            description="Add your professional network to enhance your profile"
            progress={studentProgress}
          >
            <LinkedInStep />
          </OnboardingLayout>
        );
      case 'resume':
        return (
          <OnboardingLayout 
            title="Upload your resume" 
            description="Add your resume to apply for jobs quickly"
            progress={studentProgress}
          >
            <ResumeStep />
          </OnboardingLayout>
        );
      case 'skills':
        return (
          <OnboardingLayout 
            title="Add your skills" 
            description="List your technical and professional skills to match with jobs"
            progress={studentProgress}
          >
            <SkillsStep />
          </OnboardingLayout>
        );
      case 'completed':
        return (
          <OnboardingLayout 
            title="Onboarding Complete" 
            description="You're all set to start your job search journey"
            progress={100}
            showBackButton={false}
          >
            <CompletedStep />
          </OnboardingLayout>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return getStepContent();
};
