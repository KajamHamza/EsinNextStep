
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccountBannerProps {
  accountType: 'free' | 'premium';
}

export const AccountBanner = ({ accountType }: AccountBannerProps) => {
  if (accountType === 'premium') {
    return (
      <Card className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-1">Premium Account</h3>
          <p>You have access to all premium features</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-1">Free Account</h3>
          <p>Upgrade to Premium for unlimited mentorship and resume priority review</p>
        </div>
        <Button variant="secondary" className="shrink-0">
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
};
