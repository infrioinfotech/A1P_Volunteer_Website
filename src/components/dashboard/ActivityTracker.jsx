import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressRing = ({ progress, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          style={{ color: '#1BC0BF', strokeDasharray: circumference }}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">{Math.round(progress)}%</span>
        <span className="text-xs text-slate-500">Weekly Goal</span>
      </div>
    </div>
  );
};

export default function ActivityTracker({ activities, weeklyGoal = 2 }) {
  const thisWeekHours = activities?.reduce((acc, a) => acc + (a.duration_minutes || 0), 0) / 60 || 0;
  const progress = Math.min((thisWeekHours / weeklyGoal) * 100, 100);
  
  // Calculate streak
  const today = new Date();
  let streak = 0;
  const activityDates = [...new Set(activities?.map(a => a.date))].sort().reverse();
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    if (activityDates.includes(dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          Personal Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <ProgressRing progress={progress} />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E8562B' }}>
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{streak}</p>
                <p className="text-xs text-slate-500">Day Streak</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1BC0BF' }}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{thisWeekHours.toFixed(1)}</p>
                <p className="text-xs text-slate-500">Hours This Week</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-600 text-center">
            {progress >= 100 ? (
              <span className="font-medium" style={{ color: '#1BC0BF' }}>🎉 Weekly goal achieved! Amazing!</span>
            ) : (
              <span>{(weeklyGoal - thisWeekHours).toFixed(1)} more hours to reach your weekly goal</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}