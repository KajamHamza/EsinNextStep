
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Calendar, 
  ArrowLeft, 
  UserPlus, 
  LogOut,
  MessageSquare,
  Code,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { PeerSquad, PeerSquadMember, peerSquadService } from '@/services/peerSquadService';

const PeerSquadDetail = () => {
  const { squadId } = useParams<{ squadId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [squad, setSquad] = useState<PeerSquad | null>(null);
  const [members, setMembers] = useState<PeerSquadMember[]>([]);
  const [isMember, setIsMember] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
          navigate('/auth');
          return;
        }

        // Fetch profile data
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) throw profileError;
        setProfile(data);
        
        // Load squad details
        if (squadId) {
          loadSquadDetails(squadId);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Please log in again",
        });
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate, toast, squadId]);

  const loadSquadDetails = async (id: string) => {
    setLoading(true);
    try {
      const [squadData, membersData, membershipStatus] = await Promise.all([
        peerSquadService.getPeerSquadById(id),
        peerSquadService.getPeerSquadMembers(id),
        peerSquadService.isUserMember(id)
      ]);
      
      if (!squadData) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Peer squad not found",
        });
        navigate('/peer-squad');
        return;
      }
      
      setSquad(squadData);
      setMembers(membersData);
      setIsMember(membershipStatus);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading squad details",
        description: error.message || "Failed to load peer squad details",
      });
      navigate('/peer-squad');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
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
    }
  };

  const handleJoinSquad = async () => {
    if (!squadId) return;
    
    try {
      if (squad && squad.member_count && squad.member_count >= squad.max_members) {
        toast({
          variant: "destructive",
          title: "Squad is full",
          description: "This peer squad has reached its maximum member limit",
        });
        return;
      }
      
      const success = await peerSquadService.joinPeerSquad(squadId);
      
      if (!success) {
        throw new Error("Failed to join peer squad");
      }
      
      toast({
        title: "Success",
        description: "You have joined the peer squad",
      });
      
      // Reload squad details
      loadSquadDetails(squadId);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error joining peer squad",
        description: error.message || "Failed to join peer squad",
      });
    }
  };

  const handleLeaveSquad = async () => {
    if (!squadId) return;
    
    try {
      const success = await peerSquadService.leavePeerSquad(squadId);
      
      if (!success) {
        throw new Error("Failed to leave peer squad");
      }
      
      toast({
        title: "Success",
        description: "You have left the peer squad",
      });
      
      // Reload squad details
      loadSquadDetails(squadId);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error leaving peer squad",
        description: error.message || "Failed to leave peer squad",
      });
    }
  };

  const renderMemberItem = (member: PeerSquadMember) => {
    const fullName = [member.student?.first_name, member.student?.last_name]
      .filter(Boolean)
      .join(' ') || 'Anonymous';
    
    const initials = fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    return (
      <div key={member.id} className="flex items-center p-3 hover:bg-accent rounded-md">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.student?.profile_image_url || undefined} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-grow">
          <div className="flex items-center justify-between">
            <p className="font-medium">{fullName}</p>
            {member.role === 'leader' && (
              <Badge variant="outline" className="text-xs">Leader</Badge>
            )}
          </div>
          {member.student?.skills && member.student.skills.length > 0 && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {member.student.skills.slice(0, 3).join(', ')}
              {member.student.skills.length > 3 ? ` +${member.student.skills.length - 3} more` : ''}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex flex-wrap gap-1 mt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-2">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex items-center p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="ml-3 flex-grow">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar 
        userRole={profile?.role || 'student'} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <MobileHeader onLogout={handleLogout} />
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate('/peer-squad')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Peer Squads
            </Button>
            
            {loading ? (
              renderLoadingSkeleton()
            ) : squad ? (
              <>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">{squad.name}</h1>
                    <div className="flex items-center text-muted-foreground mt-1 space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{squad.member_count} / {squad.max_members} members</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Created {format(new Date(squad.created_at), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!isMember ? (
                    <Button 
                      className="mt-4 md:mt-0"
                      onClick={handleJoinSquad}
                      disabled={squad.member_count >= squad.max_members}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Join Squad
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="mt-4 md:mt-0"
                      onClick={handleLeaveSquad}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Leave Squad
                    </Button>
                  )}
                </div>
                
                {/* Description and skills */}
                {squad.description && (
                  <p className="text-muted-foreground mb-4">
                    {squad.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-1 mt-2 mb-6">
                  {squad.skill_focus.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                
                <Tabs defaultValue="members" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="members" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>Squad Members</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {members.length === 0 ? (
                          <p className="text-center py-4 text-muted-foreground">No members found</p>
                        ) : (
                          <div className="space-y-1">
                            {members.map(renderMemberItem)}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="activities" className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Code className="mr-2 h-5 w-5 text-purple-500" />
                            Collaborative Coding
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Solve coding challenges together in real-time
                          </p>
                          <Badge variant="outline">Coming Soon</Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                            Mock Interviews
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Practice technical interviews with peers
                          </p>
                          <Badge variant="outline">Coming Soon</Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:bg-accent/5 transition-colors cursor-pointer md:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            Group Project
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Collaborate on a project together to build your portfolio
                          </p>
                          <Badge variant="outline">Coming Soon</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>Shared Resources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center py-8 text-muted-foreground">
                          Resource sharing is coming soon!
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Peer squad not found</h3>
                <p className="text-muted-foreground mt-1">
                  The peer squad you're looking for doesn't exist or has been removed
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/peer-squad')}
                >
                  Back to Peer Squads
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PeerSquadDetail;
