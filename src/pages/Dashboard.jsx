import React from 'react';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import NewsSection from '../components/dashboard/NewsSection';
import ActivityTracker from '../components/dashboard/ActivityTracker';
import AchievementsBadges from '../components/dashboard/AchievementsBadges';
import AnsweredPrayers from '../components/dashboard/AnsweredPrayers';
import ImpactStories from '../components/dashboard/ImpactStories';
import ReferralProgram from '../components/dashboard/ReferralProgram';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import { useAuth } from '../lib/AuthContext';

// Dummy data
const dummyUser = {
  id: '1',
  full_name: 'Test Volunteer',
  email: 'test@example.com',
  role: 'volunteer'
};

const dummyStats = {
  totalHours: 5.5,
  prayersOffered: 23,
  badgesEarned: 3,
  friendsInvited: 4
};

const dummyAnnouncements = [
  {
    id: '1',
    title: 'Welcome to the community!',
    content: 'We are so glad you are here.',
    category: 'community',
    publish_date: new Date().toISOString(),
    is_pinned: true
  },
  {
    id: '2',
    title: 'New training available',
    content: 'Check out the new training resources in the Resources section.',
    category: 'update',
    publish_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const dummyActivities = [
  { id: '1', date: new Date().toISOString().split('T')[0], duration_minutes: 60 },
  { id: '2', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], duration_minutes: 45 }
];

const dummyAchievements = [
  { id: '1', badge_type: 'first_prayer' },
  { id: '2', badge_type: 'prayer_warrior_10' },
  { id: '3', badge_type: 'community_builder' }
];

const dummyPrayers = [
  {
    id: '1', title: 'Family health', content: 'Please pray for my family\'s health.', category: 'health', status: 'answered', testimony: 'God answered!', answered_date: new Date().toISOString(), prayer_count: 15 },
  { id: '2', title: 'Guidance', category: 'spiritual', status: 'active', prayer_count: 8 }
];

const dummyStories = [
  {
    id: '1', title: 'Healing story', story: 'God healed my grandmother!', category: 'healing', is_featured: true, author_name: 'Sarah', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' }
];

const dummyReferrals = [
  { id: '1', status: 'active' },
  { id: '2', status: 'pending' }
];

const dummyEvents = [
  { id: '1', title: 'Prayer Session', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], time: '7:00 PM', event_type: 'prayer_session', is_virtual: true }
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-8 space-y-6">
      <WelcomeHero user={user || dummyUser} stats={dummyStats} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsSection announcements={dummyAnnouncements} />
        <ActivityTracker activities={dummyActivities} />
        <AchievementsBadges achievements={dummyAchievements} stats={dummyStats} />
        <AnsweredPrayers prayers={dummyPrayers} />
        <ImpactStories stories={dummyStories} />
        <CalendarWidget events={dummyEvents} />
      </div>
      <ReferralProgram referrals={dummyReferrals} userEmail={(user || dummyUser).email} />
    </div>
  );
}
