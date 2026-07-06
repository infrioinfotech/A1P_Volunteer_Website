import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Minimize2, Users, Heart, Sparkles, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const channelConfig = {
  general: { icon: MessageCircle, color: 'bg-blue-500', label: 'General' },
  prayer_requests: { icon: Heart, color: 'bg-rose-500', label: 'Prayers' },
  encouragement: { icon: Sparkles, color: 'bg-amber-500', label: 'Encourage' },
  testimonies: { icon: BookOpen, color: 'bg-emerald-500', label: 'Testimonies' }
};

export default function CommunityChat({ messages, onSendMessage, user, isMinimized, onToggle }) {
  const [message, setMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesEndRef = useRef(null);
  
  const filteredMessages = messages?.filter(m => m.channel === activeChannel).slice(-50) || [];
  
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages, isMinimized]);
  
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage({
      message: message.trim(),
      channel: activeChannel,
      sender_email: user?.email,
      sender_name: user?.full_name || 'Anonymous'
    });
    setMessage('');
  };
  
  const prompts = [
    "Share a blessing from today",
    "Who can we pray for?",
    "Share an encouragement",
    "Praise report!"
  ];
  
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
        {filteredMessages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-xs flex items-center justify-center font-medium">
            {Math.min(filteredMessages.length, 9)}
          </span>
        )}
      </motion.button>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      className="fixed bottom-6 right-6 w-80 md:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">Community</h3>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={onToggle}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Channel Tabs */}
        <div className="flex gap-1">
          {Object.entries(channelConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveChannel(key)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChannel === key ? 'bg-white/30 text-white' : 'hover:bg-white/10 text-white/70'
                }`}
              >
                <Icon className="w-3 h-3 mx-auto mb-0.5" />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No messages yet</p>
            <p className="text-slate-400 text-xs mt-1">Be the first to share!</p>
          </div>
        ) : (
          filteredMessages.map((msg, index) => {
            const isOwn = msg.sender_email === user?.email;
            return (
              <motion.div
                key={msg.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${isOwn ? 'order-1' : ''}`}>
                  {!isOwn && (
                    <p className="text-xs text-slate-500 mb-1 px-1">{msg.sender_name}</p>
                  )}
                  <div className={`p-3 rounded-2xl ${
                    isOwn 
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-br-sm' 
                      : 'bg-white shadow-sm rounded-bl-sm'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className={`text-xs mt-1 px-1 ${isOwn ? 'text-right' : ''} text-slate-400`}>
                    {msg.created_date && format(new Date(msg.created_date), 'h:mm a')}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Prompts */}
      <div className="px-3 py-2 flex gap-1 overflow-x-auto border-t border-slate-100 bg-white">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => setMessage(prompt)}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-600 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
      
      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-slate-100 border-0 focus-visible:ring-teal-500"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!message.trim()}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}