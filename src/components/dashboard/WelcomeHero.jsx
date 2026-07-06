import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Award, Users } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
  >
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </motion.div>
);

export default function WelcomeHero({ user, stats }) {
  const encouragements = [
    "Your prayers are making a difference in someone's life today.",
    "Every moment spent in prayer is a seed of hope planted.",
    "You are part of something beautiful.",
    "Together, we lift each other up.",
    "Your faithfulness inspires others."
  ];
  
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
  const firstName = user?.full_name?.split(' ')[0] || 'Friend';
  
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg, #1BC0BF 0%, #1B3A4B 55%, #E8562B 100%)' }}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/80 text-sm font-medium">Welcome back</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Hello, {firstName}!
          </h1>
          <p className="text-white/90 text-lg max-w-xl leading-relaxed">
            {randomEncouragement}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard 
            icon={Clock} 
            value={stats.totalHours || 0} 
            label="Hours Served" 
            color="bg-[#1B3A4B]"
            delay={0.1}
          />
          <StatCard 
            icon={Heart} 
            value={stats.prayersOffered || 0} 
            label="Prayers Offered" 
            color="bg-[#1BC0BF]"
            delay={0.2}
          />
          <StatCard 
            icon={Award} 
            value={stats.badgesEarned || 0} 
            label="Badges Earned" 
            color="bg-[#E8562B]"
            delay={0.3}
          />
          <StatCard 
            icon={Users} 
            value={stats.friendsInvited || 0} 
            label="Active Friends" 
            color="bg-[#1B3A4B]"
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
}