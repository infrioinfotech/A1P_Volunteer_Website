import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Users, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function ReferralProgram({ referrals, userEmail }) {
  const [copied, setCopied] = useState(false);
  
  const referralCode = userEmail?.split('@')[0] || 'friend';
  const referralLink = `https://anyonepray.com/join?ref=${referralCode}`;
  
  const totalReferrals = referrals?.length || 0;
  const activeReferrals = referrals?.filter(r => r.status === 'active').length || 0;
  const nextMilestone = totalReferrals < 5 ? 5 : totalReferrals < 10 ? 10 : totalReferrals < 25 ? 25 : 50;
  const progress = (totalReferrals / nextMilestone) * 100;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Anyone Pray',
          text: 'Join me in making a difference through prayer!',
          url: referralLink
        });
      } catch (err) {
        // User cancelled
      }
    }
  };
  
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 via-amber-50 to-stone-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Gift className="w-5 h-5 text-pink-500" />
          Invite Friends
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-sm text-slate-600 mb-4">
          Spread the mission! Invite friends to join our prayer community.
        </p>
        
        {/* Stats */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 p-3 bg-white/60 rounded-xl">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-500" />
              <span className="text-2xl font-bold text-slate-800">{totalReferrals}</span>
            </div>
            <p className="text-xs text-slate-500">Friends Invited</p>
          </div>
          <div className="flex-1 p-3 bg-white/60 rounded-xl">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-2xl font-bold text-slate-800">{activeReferrals}</span>
            </div>
            <p className="text-xs text-slate-500">Now Active</p>
          </div>
        </div>
        
        {/* Progress to next milestone */}
        <div className="mb-4 p-3 bg-white/60 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm text-orange-600 font-semibold">{totalReferrals}/{nextMilestone}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 mt-2">
            {nextMilestone - totalReferrals} more to earn "Referral Champion" badge!
          </p>
        </div>
        
        {/* Referral Link */}
        <div className="p-3 bg-white/80 rounded-xl mb-4">
          <p className="text-xs text-slate-500 mb-2">Your referral link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-slate-100 rounded-lg text-sm text-slate-600 truncate">
              {referralLink}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Share Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            className="p-2"
            onClick={() => window.open(`mailto:?subject=Join%20Anyone%20Pray&body=Join%20me%20in%20making%20a%20difference!%20${encodeURIComponent(referralLink)}`)}
          >
            <Mail className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="p-2"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Join me in making a difference through prayer! ${referralLink}`)}`)}
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}