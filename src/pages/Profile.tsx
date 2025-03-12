
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Plus, Trash2 } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Profile</h1>
            <p className="text-gray-600">Manage your professional information</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Basic Info */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="Alex"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Johnson"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  defaultValue="Computer Science Graduate | Full Stack Developer"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <Textarea
            className="min-h-[150px]"
            placeholder="Tell us about yourself..."
            disabled={!isEditing}
          />
        </Card>

        {/* Experience */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Experience</h2>
            {isEditing && (
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            )}
          </div>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Software Development Intern</h3>
                <p className="text-gray-600">TechCorp</p>
                <p className="text-sm text-gray-500">Jun 2023 - Aug 2023</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Education</h2>
            {isEditing && (
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            )}
          </div>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                <p className="text-gray-600">University of Technology</p>
                <p className="text-sm text-gray-500">2020 - 2024</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Save Changes */}
        {isEditing && (
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
