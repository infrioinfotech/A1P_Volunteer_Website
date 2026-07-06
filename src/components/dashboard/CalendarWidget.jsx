import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const eventTypeColors = {
  prayer_session: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  training: 'bg-amber-100 text-amber-700 border-amber-200',
  community_gathering: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  webinar: 'bg-orange-100 text-orange-700 border-orange-200',
  other: 'bg-slate-100 text-slate-700 border-slate-200'
};

export default function CalendarWidget({ events }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const eventDates = events?.map(e => e.date) || [];
  const upcomingEvents = events?.filter(e => new Date(e.date) >= new Date()).slice(0, 3) || [];
  
  const hasEvent = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return eventDates.includes(dateStr);
  };
  
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-500" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-xs font-medium text-slate-400 py-1">{day}</div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                className={`relative text-xs py-1.5 rounded-lg transition-colors ${
                  isSameDay(day, new Date()) 
                    ? 'bg-teal-500 text-white font-semibold' 
                    : hasEvent(day)
                    ? 'bg-teal-100 text-teal-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {format(day, 'd')}
                {hasEvent(day) && !isSameDay(day, new Date()) && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Upcoming Events</h4>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No upcoming events</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className={`${eventTypeColors[event.event_type]} text-xs mb-1`}>
                        {event.event_type?.replace('_', ' ')}
                      </Badge>
                      <h5 className="font-medium text-slate-800 text-sm">{event.title}</h5>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {format(new Date(event.date), 'MMM d')}
                        </span>
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </span>
                        )}
                      </div>
                    </div>
                    {event.is_virtual && (
                      <Video className="w-4 h-4 text-teal-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}