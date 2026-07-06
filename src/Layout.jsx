import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Heart, 
  BookOpen, 
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Shield,
  Repeat
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from './lib/AuthContext';

const navItems = [
  { name: 'Dashboard', icon: Home, page: 'Dashboard' },
  { name: 'Prayer Wall', icon: Heart, page: 'Prayers' },
  { name: 'Resources', icon: BookOpen, page: 'Resources' },
  { name: 'Profile', icon: User, page: 'Profile' }
];

const adminNavItems = [
  ...navItems,
  { name: 'Admin', icon: Shield, page: 'Admin', adminOnly: true }
];

export default function Layout({ children, currentPageName }) {
  const { user, switchUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleLogout = () => {
    console.log('Logout (disabled for demo)');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/30">
      <style>{`
        :root {
          --primary: 173 80% 40%;
          --primary-foreground: 0 0% 100%;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white border-r border-slate-200 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100">
          <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2">
            <img 
              src="/src/public/a1p-logo.svg" 
              alt="A1P" 
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {(user?.role === 'admin' ? adminNavItems : navItems).map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
              key={item.page}
              to={createPageUrl(item.page)}
              style={isActive ? { background: 'linear-gradient(135deg, #1BC0BF, #1B3A4B)' } : {}}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="font-medium">{item.name}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t border-slate-100">
          {user && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #1BC0BF, #1B3A4B)' }}>
                  {user.full_name?.[0] || user.email?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{user.full_name || 'Volunteer'}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                onClick={switchUser}
              >
                <Repeat className="w-4 h-4 mr-2" />
                Switch to {user.role === 'admin' ? 'Volunteer' : 'Admin'}
              </Button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-40">
        <div className="flex items-center justify-between h-full px-4">
          <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2">
            <img 
              src="/src/public/a1p-logo.svg" 
              alt="A1P" 
              className="h-8 w-auto object-contain"
            />
          </Link>
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="p-6 border-b border-slate-100">
                <img 
                  src="/src/public/a1p-logo.svg" 
                  alt="A1P" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              
              <nav className="p-4 space-y-1">
                {(user?.role === 'admin' ? adminNavItems : navItems).map((item) => {
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileOpen(false)}
                      style={isActive ? { background: 'linear-gradient(135deg, #1BC0BF, #1B3A4B)' } : {}}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {user && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #1BC0BF, #1B3A4B)' }}>
                        {user.full_name?.[0] || user.email?.[0] || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">{user.full_name || 'Volunteer'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        switchUser();
                        setMobileOpen(false);
                      }}
                    >
                      <Repeat className="w-4 h-4 mr-2" />
                      Switch to {user.role === 'admin' ? 'Volunteer' : 'Admin'}
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-40">
        <div className="flex items-center justify-around h-full">
          {(user?.role === 'admin' ? adminNavItems : navItems).filter(item => !item.adminOnly || user?.role === 'admin').slice(0, 4).map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-[#1BC0BF]' : 'text-slate-400'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#1BC0BF]' : ''}`} />
                <span className="text-xs font-medium">{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}