export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_image_url: string | null
          description: string | null
          earned_at: string
          id: string
          name: string
          type: string
          user_id: string
          xp_awarded: number
        }
        Insert: {
          badge_image_url?: string | null
          description?: string | null
          earned_at?: string
          id?: string
          name: string
          type: string
          user_id: string
          xp_awarded: number
        }
        Update: {
          badge_image_url?: string | null
          description?: string | null
          earned_at?: string
          id?: string
          name?: string
          type?: string
          user_id?: string
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_at: string
          cover_letter: string | null
          id: string
          job_id: string
          notes: string | null
          resume_id: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id: string
          notes?: string | null
          resume_id?: string | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          resume_id?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_profiles: {
        Row: {
          company_benefits: string[] | null
          company_culture: string | null
          company_description: string | null
          company_location: string | null
          company_name: string
          company_size: string | null
          company_values: string[] | null
          contact_email: string | null
          contact_phone: string | null
          id: string
          industry: string | null
          logo_url: string | null
          social_links: Json | null
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          company_benefits?: string[] | null
          company_culture?: string | null
          company_description?: string | null
          company_location?: string | null
          company_name: string
          company_size?: string | null
          company_values?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          id: string
          industry?: string | null
          logo_url?: string | null
          social_links?: Json | null
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          company_benefits?: string[] | null
          company_culture?: string | null
          company_description?: string | null
          company_location?: string | null
          company_name?: string
          company_size?: string | null
          company_values?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          social_links?: Json | null
          verified?: boolean | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string
          cover_letter: string | null
          id: string
          job_id: string
          resume_id: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id: string
          resume_id?: string | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          resume_id?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          description: string
          education_level: string | null
          employer_id: string | null
          experience_level: string | null
          expires_at: string | null
          id: string
          job_type: string
          location: string
          posted_at: string
          requirements: string[]
          responsibilities: string[]
          salary_range: string | null
          skills_required: string[]
          status: string
          title: string
        }
        Insert: {
          company: string
          description: string
          education_level?: string | null
          employer_id?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          job_type: string
          location: string
          posted_at?: string
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          skills_required?: string[]
          status?: string
          title: string
        }
        Update: {
          company?: string
          description?: string
          education_level?: string | null
          employer_id?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          job_type?: string
          location?: string
          posted_at?: string
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          skills_required?: string[]
          status?: string
          title?: string
        }
        Relationships: []
      }
      peer_squad_members: {
        Row: {
          id: string
          joined_at: string
          peer_squad_id: string
          role: string
          student_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          peer_squad_id: string
          role?: string
          student_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          peer_squad_id?: string
          role?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_squad_members_peer_squad_id_fkey"
            columns: ["peer_squad_id"]
            isOneToOne: false
            referencedRelation: "peer_squads"
            referencedColumns: ["id"]
          },
        ]
      }
      peer_squads: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          max_members: number
          name: string
          skill_focus: string[]
          status: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          max_members?: number
          name: string
          skill_focus: string[]
          status?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          max_members?: number
          name?: string
          skill_focus?: string[]
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string
          created_at: string
          id: string
          onboarding_completed: boolean | null
          role: string
          updated_at: string
        }
        Insert: {
          account_type?: string
          created_at?: string
          id: string
          onboarding_completed?: boolean | null
          role: string
          updated_at?: string
        }
        Update: {
          account_type?: string
          created_at?: string
          id?: string
          onboarding_completed?: boolean | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string
          data: Json
          id: string
          is_primary: boolean | null
          name: string
          updated_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          is_primary?: boolean | null
          name: string
          updated_at?: string
          user_id: string
          version?: number | null
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          is_primary?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          bio: string | null
          career_goals: string[] | null
          education: string | null
          first_name: string | null
          github_projects: Json[] | null
          github_username: string | null
          id: string
          last_name: string | null
          level: number
          linkedin_url: string | null
          profile_image_url: string | null
          resume_url: string | null
          skills: string[] | null
          xp_points: number
        }
        Insert: {
          bio?: string | null
          career_goals?: string[] | null
          education?: string | null
          first_name?: string | null
          github_projects?: Json[] | null
          github_username?: string | null
          id: string
          last_name?: string | null
          level?: number
          linkedin_url?: string | null
          profile_image_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          xp_points?: number
        }
        Update: {
          bio?: string | null
          career_goals?: string[] | null
          education?: string | null
          first_name?: string | null
          github_projects?: Json[] | null
          github_username?: string | null
          id?: string
          last_name?: string | null
          level?: number
          linkedin_url?: string | null
          profile_image_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          xp_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
