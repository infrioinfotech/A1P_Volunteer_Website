import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  healing: 'bg-rose-100 text-rose-700',
  provision: 'bg-emerald-100 text-emerald-700',
  restoration: 'bg-amber-100 text-amber-700',
  guidance: 'bg-indigo-100 text-indigo-700',
  miracle: 'bg-teal-100 text-teal-700'
};

const placeholderImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';

export default function ImpactStories({ stories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const featuredStories = stories?.filter(s => s.is_featured).slice(0, 5) || [];
  
  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
  };
  
  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };
  
  if (featuredStories.length === 0) {
    return (
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-rose-500" />
            Impact Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
              <BookHeart className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-slate-600">Stories of hope coming soon</p>
            <p className="text-sm text-slate-400 mt-1">Real testimonies of answered prayers</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const currentStory = featuredStories[currentIndex];
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <BookHeart className="w-5 h-5 text-rose-500" />
          Impact Stories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Image */}
              <div className="relative h-40 rounded-xl overflow-hidden">
                <img
                  src={currentStory.image_url || placeholderImage}
                  alt={currentStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className={`absolute bottom-3 left-3 ${categoryColors[currentStory.category]}`}>
                  {currentStory.category}
                </Badge>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">{currentStory.title}</h3>
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-rose-200" />
                  <p className="text-sm text-slate-600 pl-6 line-clamp-3 italic">
                    {currentStory.story}
                  </p>
                </div>
                {!currentStory.is_anonymous && currentStory.author_name && (
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    — {currentStory.author_name}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          {featuredStories.length > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevStory}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              
              <div className="flex gap-1.5">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-rose-500 w-4' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextStory}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}