import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const PrayerCard = ({ prayer, index }) => {
  const categoryColors = {
    health: 'bg-rose-100 text-rose-700',
    family: 'bg-amber-100 text-amber-700',
    financial: 'bg-emerald-100 text-emerald-700',
    spiritual: 'bg-purple-100 text-purple-700',
    career: 'bg-blue-100 text-blue-700',
    relationships: 'bg-pink-100 text-pink-700',
    other: 'bg-slate-100 text-slate-700'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-4 hover:shadow-md transition-all duration-300 border border-emerald-100/50"
    >
      <div className="absolute top-3 right-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <Badge className={`${categoryColors[prayer.category]} mb-2 text-xs font-medium`}>
        {prayer.category}
      </Badge>
      
      <h3 className="font-semibold text-slate-800 pr-10 mb-2">{prayer.title}</h3>
      
      {prayer.testimony && (
        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{prayer.testimony}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Heart className="w-3 h-3 text-rose-400" />
          <span>{prayer.prayer_count || 0} prayers</span>
        </div>
        {prayer.answered_date && (
          <span className="text-xs text-emerald-600 font-medium">
            Answered {format(new Date(prayer.answered_date), 'MMM d')}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default function AnsweredPrayers({ prayers }) {
  const answeredPrayers = prayers?.filter(p => p.status === 'answered').slice(0, 4) || [];
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            Answered Prayers
          </CardTitle>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {answeredPrayers.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-slate-600">Answered prayers will appear here</p>
            <p className="text-sm text-slate-400 mt-1">Keep praying with faith!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {answeredPrayers.map((prayer, index) => (
              <PrayerCard key={prayer.id} prayer={prayer} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}