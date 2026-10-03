import React from 'react'
import { ExtractedProfileProps } from './profile/types'
import { SkillsMatrix } from './profile/SkillsMatrix'
import { ExperienceTimeline } from './profile/ExperienceTimeline'
import { EducationSection } from './profile/EducationSection'
import { SoftSkillsSection } from './profile/SoftSkillsSection'

export type { Skill, CareerTrajectory, Experience, Education, StructuredProfile, ExtractedProfileProps } from './profile/types'

const ExtractedProfile: React.FC<ExtractedProfileProps> = ({ structuredProfile = {} as any }) => {
    return (
        <div className="space-y-12 animate-fade-in">
            <SkillsMatrix skills={structuredProfile?.skills || []} />
            <ExperienceTimeline 
                experiences={structuredProfile?.experiences || []} 
                trajectory={structuredProfile?.career_trajectory} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <EducationSection education={structuredProfile?.education || []} />
                <SoftSkillsSection softSkills={structuredProfile?.soft_skills_inferred || []} />
            </div>
        </div>
    )
}

export default ExtractedProfile
