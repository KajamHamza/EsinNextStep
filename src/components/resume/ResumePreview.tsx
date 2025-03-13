
import { Resume } from "./ResumeBuilderContent";

interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview = ({ resume }: ResumePreviewProps) => {
  return (
    <div className="border rounded-md p-4 text-xs bg-white text-black overflow-auto max-h-[600px]">
      {/* Header with Name and Contact Info */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">{resume.basic_info.name || 'Your Name'}</h1>
        
        <div className="text-gray-700 mt-1">
          {resume.basic_info.email && (
            <span className="inline-block mx-1">{resume.basic_info.email}</span>
          )}
          {resume.basic_info.phone && (
            <span className="inline-block mx-1">• {resume.basic_info.phone}</span>
          )}
          {resume.basic_info.location && (
            <span className="inline-block mx-1">• {resume.basic_info.location}</span>
          )}
        </div>
        
        <div className="text-gray-700 mt-1">
          {resume.basic_info.website && (
            <span className="inline-block mx-1">{resume.basic_info.website}</span>
          )}
          {resume.basic_info.linkedin && (
            <span className="inline-block mx-1">• {resume.basic_info.linkedin}</span>
          )}
        </div>
      </div>
      
      {/* Work Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-semibold border-b pb-1 mb-2">EXPERIENCE</h2>
          
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold">{exp.position}</div>
                <div className="text-gray-600">
                  {exp.start_date && new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.end_date && new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">{exp.company}</div>
                {exp.location && <div className="text-gray-600">{exp.location}</div>}
              </div>
              <div className="text-gray-800 mt-1">{exp.description}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-semibold border-b pb-1 mb-2">EDUCATION</h2>
          
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold">{edu.institution}</div>
                <div className="text-gray-600">
                  {edu.start_date && new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {edu.current ? 'Present' : edu.end_date && new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">{edu.degree} in {edu.field}</div>
                {edu.location && <div className="text-gray-600">{edu.location}</div>}
              </div>
              {edu.gpa && <div className="text-gray-800 mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills */}
      {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0) && (
        <div className="mb-4">
          <h2 className="text-base font-semibold border-b pb-1 mb-2">SKILLS</h2>
          
          {resume.skills.technical.length > 0 && (
            <div className="mb-2">
              <span className="font-medium">Technical Skills: </span>
              <span>{resume.skills.technical.join(', ')}</span>
            </div>
          )}
          
          {resume.skills.soft.length > 0 && (
            <div>
              <span className="font-medium">Soft Skills: </span>
              <span>{resume.skills.soft.join(', ')}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-base font-semibold border-b pb-1 mb-2">PROJECTS</h2>
          
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold">{project.title}</div>
                <div className="text-gray-600">
                  {project.technologies.join(', ')}
                </div>
              </div>
              <div className="text-gray-800 mt-1">{project.description}</div>
              {(project.link || project.github_link) && (
                <div className="text-gray-600 mt-1">
                  {project.github_link && <span className="mr-2">GitHub: {project.github_link}</span>}
                  {project.link && <span>Link: {project.link}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
