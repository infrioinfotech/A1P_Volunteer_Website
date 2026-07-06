import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Heart, Users, Flame, BookOpen, Gift, ChevronRight, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const badgeConfig = {
  first_prayer: { 
    icon: Heart, 
    name: 'First Prayer', 
    description: 'Offered your first prayer',
    color: 'from-rose-400 to-orange-500',
    bgColor: 'bg-rose-50'
  },
  prayer_warrior_10: { 
    icon: Star, 
    name: 'Prayer Warrior', 
    description: '10 prayers offered',
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-50'
  },
  prayer_warrior_50: { 
    icon: Star, 
    name: 'Devoted Intercessor', 
    description: '50 prayers offered',
    color: 'from-teal-400 to-blue-500',
    bgColor: 'bg-teal-50'
  },
  prayer_warrior_100: { 
    icon: Award, 
    name: 'Prayer Champion', 
    description: '100 prayers offered',
    color: 'from-blue-400 to-teal-500',
    bgColor: 'bg-blue-50'
  },
  faithful_week: { 
    icon: Flame, 
    name: 'Faithful Week', 
    description: '7 day prayer streak',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50'
  },
  faithful_month: { 
    icon: Flame, 
    name: 'Faithful Month', 
    description: '30 day prayer streak',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50'
  },
  community_builder: { 
    icon: Users, 
    name: 'Community Builder', 
    description: 'Active in community',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50'
  },
  referral_champion: { 
    icon: Gift, 
    name: 'Referral Champion', 
    description: 'Invited 5+ friends',
    color: 'from-orange-400 to-rose-500',
    bgColor: 'bg-orange-50'
  },
  training_complete: { 
    icon: BookOpen, 
    name: 'Trained & Ready', 
    description: 'Completed training',
    color: 'from-teal-400 to-emerald-500',
    bgColor: 'bg-teal-50'
  }
};

const BadgeItem = ({ badge, earned, index }) => {
  const config = badgeConfig[badge] || badgeConfig.first_prayer;
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
        earned ? `${config.bgColor} hover:scale-105` : 'bg-slate-50 opacity-50'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        earned ? `bg-gradient-to-br ${config.color}` : 'bg-slate-200'
      }`}>
        {earned ? (
          <Icon className="w-6 h-6 text-white" />
        ) : (
          <Lock className="w-5 h-5 text-slate-400" />
        )}
      </div>
      <p className={`mt-2 text-xs font-medium text-center ${earned ? 'text-slate-700' : 'text-slate-400'}`}>
        {config.name}
      </p>
    </motion.div>
  );
};

export default function AchievementsBadges({ achievements, stats }) {
  const earnedBadges = achievements?.map(a => a.badge_type) || [];
  const allBadges = Object.keys(badgeConfig);
  
  // Calculate progress to next badge
  const prayerCount = stats?.prayersOffered || 0;
  let nextMilestone = 10;
  let currentProgress = prayerCount;
  
  if (prayerCount >= 100) {
    nextMilestone = 200;
    currentProgress = prayerCount;
  } else if (prayerCount >= 50) {
    nextMilestone = 100;
  } else if (prayerCount >= 10) {
    nextMilestone = 50;
  }
  
  const progressPercent = Math.min((currentProgress / nextMilestone) * 100, 100);
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Badges Earned
          </CardTitle>
          <span className="text-sm text-slate-500">{earnedBadges.length}/{allBadges.length}</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-2">
          {allBadges.slice(0, 6).map((badge, index) => (
            <BadgeItem 
              key={badge} 
              badge={badge} 
              earned={earnedBadges.includes(badge)}
              index={index}
            />
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center justify-center gap-1">
          View all achievements <ChevronRight className="w-4 h-4" />
        </button>
      </CardContent>
    </Card>
  );
}