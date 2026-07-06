import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, Sparkles, HandHeart, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

const categoryColors = {
  health: 'bg-rose-100 text-rose-700 border-rose-200',
  family: 'bg-amber-100 text-amber-700 border-amber-200',
  financial: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  spiritual: 'bg-teal-100 text-teal-700 border-teal-200',
  career: 'bg-blue-100 text-blue-700 border-blue-200',
  relationships: 'bg-pink-100 text-pink-700 border-pink-200',
  other: 'bg-slate-100 text-slate-700 border-slate-200'
};

const categoryIcons = {
  health: '🏥',
  family: '👨‍👩‍👧‍👦',
  financial: '💰',
  spiritual: '✝️',
  career: '💼',
  relationships: '💑',
  other: '🙏'
};

export default function PrayerRequestCard({ request, onPray, isPraying }) {
  const [expanded, setExpanded] = useState(false);
  const [showGratitude, setShowGratitude] = useState(false);
  
  const handlePray = () => {
    onPray(request);
    setShowGratitude(true);
    setTimeout(() => setShowGratitude(false), 3000);
  };
  
  const isAnswered = request.status === 'answered';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border-0 shadow-sm overflow-hidden transition-all duration-300 ${
        isAnswered ? 'bg-gradient-to-br from-emerald-50 to-teal-50' : 'bg-white hover:shadow-md'
      }`}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${categoryColors[request.category]} border`}>
                  <span className="mr-1">{categoryIcons[request.category]}</span>
                  {request.category}
                </Badge>
                {isAnswered && (
                  <Badge className="bg-emerald-500 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-slate-800 text-lg mb-2">{request.title}</h3>
              
              <p className={`text-slate-600 text-sm ${expanded ? '' : 'line-clamp-2'}`}>
                {request.description}
              </p>
              
              {request.description?.length > 100 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-indigo-600 text-sm font-medium mt-1 flex items-center gap-1 hover:text-indigo-700"
                >
                  {expanded ? (
                    <>Show less <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Read more <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              )}
              
              {/* Testimony for answered prayers */}
              {isAnswered && request.testimony && (
                <div className="mt-3 p-3 bg-white/60 rounded-xl">
                  <p className="text-sm font-medium text-emerald-700 mb-1">Testimony:</p>
                  <p className="text-sm text-slate-600 italic">{request.testimony}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {request.prayer_count || 0} prayers
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDistanceToNow(new Date(request.created_date), { addSuffix: true })}
              </span>
            </div>
            
            {!isAnswered && (
              <div className="relative">
                <Button
                  onClick={handlePray}
                  disabled={isPraying}
                  className={`bg-gradient-to-r transition-all duration-300 ${
                    showGratitude 
                      ? 'from-emerald-500 to-teal-500' 
                      : 'from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                  }`}
                >
                  {showGratitude ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Answered
                    </>
                  ) : (
                    <>
                      <HandHeart className="w-4 h-4 mr-2" />
                      Pray Now
                    </>
                  )}
                </Button>
                
                {/* Gratitude Animation */}
                {showGratitude && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl"
                  >
                    🙏
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}