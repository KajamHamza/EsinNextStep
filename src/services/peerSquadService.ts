
import { supabase } from "@/integrations/supabase/client";

export interface PeerSquad {
  id: string;
  name: string;
  description: string | null;
  skill_focus: string[];
  max_members: number;
  created_at: string;
  created_by: string;
  status: string;
  member_count?: number;
}

export interface PeerSquadMember {
  id: string;
  peer_squad_id: string;
  student_id: string;
  joined_at: string;
  role: 'leader' | 'member';
  student?: {
    first_name: string | null;
    last_name: string | null;
    profile_image_url: string | null;
    skills: string[] | null;
  };
}

export const peerSquadService = {
  async getAllPeerSquads(): Promise<PeerSquad[]> {
    try {
      // Get all peer squads
      const { data: peerSquads, error } = await supabase
        .from('peer_squads')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get member counts for each peer squad
      const squadsWithMemberCount = await Promise.all(
        peerSquads.map(async (squad) => {
          const { count, error: countError } = await supabase
            .from('peer_squad_members')
            .select('*', { count: 'exact', head: true })
            .eq('peer_squad_id', squad.id);

          if (countError) throw countError;

          return {
            ...squad,
            member_count: count || 0
          };
        })
      );

      return squadsWithMemberCount;
    } catch (error) {
      console.error('Error fetching peer squads:', error);
      return [];
    }
  },

  async getPeerSquadById(peerSquadId: string): Promise<PeerSquad | null> {
    try {
      const { data, error } = await supabase
        .from('peer_squads')
        .select('*')
        .eq('id', peerSquadId)
        .single();

      if (error) throw error;
      
      // Get member count
      const { count, error: countError } = await supabase
        .from('peer_squad_members')
        .select('*', { count: 'exact', head: true })
        .eq('peer_squad_id', peerSquadId);

      if (countError) throw countError;

      return { ...data, member_count: count || 0 };
    } catch (error) {
      console.error('Error fetching peer squad details:', error);
      return null;
    }
  },

  async getPeerSquadMembers(peerSquadId: string): Promise<PeerSquadMember[]> {
    try {
      // First fetch the members
      const { data: members, error } = await supabase
        .from('peer_squad_members')
        .select('id, peer_squad_id, student_id, joined_at, role')
        .eq('peer_squad_id', peerSquadId);

      if (error) throw error;
      
      // Then get student profile data separately for each member
      const membersWithProfiles = await Promise.all(
        members.map(async (member) => {
          const { data: profileData, error: profileError } = await supabase
            .from('student_profiles')
            .select('first_name, last_name, profile_image_url, skills')
            .eq('id', member.student_id)
            .maybeSingle();

          if (profileError) {
            console.error('Error fetching student profile:', profileError);
            return {
              ...member,
              role: member.role as 'leader' | 'member',
              student: {
                first_name: null,
                last_name: null,
                profile_image_url: null,
                skills: null
              }
            };
          }

          return {
            ...member,
            role: member.role as 'leader' | 'member',
            student: {
              first_name: profileData?.first_name || null,
              last_name: profileData?.last_name || null,
              profile_image_url: profileData?.profile_image_url || null,
              skills: profileData?.skills || null
            }
          };
        })
      );

      return membersWithProfiles;
    } catch (error) {
      console.error('Error fetching peer squad members:', error);
      return [];
    }
  },

  async createPeerSquad(peerSquadData: Omit<PeerSquad, 'id' | 'created_at' | 'created_by' | 'status'>): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('peer_squads')
        .insert({
          ...peerSquadData,
          created_by: session.user.id
        })
        .select('id')
        .single();

      if (error) throw error;

      // Automatically add creator as a member with leader role
      const { error: memberError } = await supabase
        .from('peer_squad_members')
        .insert({
          peer_squad_id: data.id,
          student_id: session.user.id,
          role: 'leader'
        });

      if (memberError) throw memberError;

      return data.id;
    } catch (error) {
      console.error('Error creating peer squad:', error);
      return null;
    }
  },

  async joinPeerSquad(peerSquadId: string): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { error } = await supabase
        .from('peer_squad_members')
        .insert({
          peer_squad_id: peerSquadId,
          student_id: session.user.id,
          role: 'member'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error joining peer squad:', error);
      return false;
    }
  },

  async leavePeerSquad(peerSquadId: string): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { error } = await supabase
        .from('peer_squad_members')
        .delete()
        .eq('peer_squad_id', peerSquadId)
        .eq('student_id', session.user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error leaving peer squad:', error);
      return false;
    }
  },

  async isUserMember(peerSquadId: string): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { data, error } = await supabase
        .from('peer_squad_members')
        .select('id')
        .eq('peer_squad_id', peerSquadId)
        .eq('student_id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking membership:', error);
      return false;
    }
  },
  
  async getUserPeerSquads(): Promise<PeerSquad[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data: membershipData, error: membershipError } = await supabase
        .from('peer_squad_members')
        .select('peer_squad_id')
        .eq('student_id', session.user.id);

      if (membershipError) throw membershipError;
      
      if (membershipData.length === 0) return [];
      
      const peerSquadIds = membershipData.map(m => m.peer_squad_id);
      
      const { data: peerSquads, error } = await supabase
        .from('peer_squads')
        .select('*')
        .in('id', peerSquadIds)
        .eq('status', 'active');

      if (error) throw error;

      return peerSquads;
    } catch (error) {
      console.error('Error fetching user peer squads:', error);
      return [];
    }
  }
};
