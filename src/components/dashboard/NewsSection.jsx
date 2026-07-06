import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Megaphone, Gift, Zap, Pin, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const categoryIcons = {
  feature: Zap,
  update: Newspaper,
  referral: Gift,
  community: Megaphone,
  important: Pin
};

const categoryColors = {
  feature: 'bg-purple-100 text-purple-700',
  update: 'bg-blue-100 text-blue-700',
  referral: 'bg-pink-100 text-pink-700',
  community: 'bg-emerald-100 text-emerald-700',
  important: 'bg-amber-100 text-amber-700'
};

export default function NewsSection({ announcements }) {
  const sortedAnnouncements = [...(announcements || [])]
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.publish_date || b.created_date) - new Date(a.publish_date || a.created_date);
    })
    .slice(0, 4);
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-500" />
            What's New
          </CardTitle>
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
            All news <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {sortedAnnouncements.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-slate-600">No announcements yet</p>
            <p className="text-sm text-slate-400 mt-1">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAnnouncements.map((announcement, index) => {
              const Icon = categoryIcons[announcement.category] || Newspaper;
              const isNew = new Date(announcement.publish_date || announcement.created_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
              
              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer ${
                    announcement.is_pinned ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  {announcement.is_pinned && (
                    <Pin className="absolute top-3 right-3 w-4 h-4 text-amber-500" />
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${categoryColors[announcement.category]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-800 text-sm truncate">{announcement.title}</h4>
                        {isNew && (
                          <Badge className="bg-teal-500 text-white text-xs px-1.5 py-0">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{announcement.content}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        {format(new Date(announcement.publish_date || announcement.created_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}