import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import AnnouncementsAdmin from '../components/admin/AnnouncementsAdmin';
import EventsAdmin from '../components/admin/EventsAdmin';
import ImpactStoriesAdmin from '../components/admin/ImpactStoriesAdmin';
import PrayerRequestsAdmin from '../components/admin/PrayerRequestsAdmin';
import ResourcesAdmin from '../components/admin/ResourcesAdmin';

// Dummy data for admin
const dummyAnnouncements = [
  { id: '1', title: 'Welcome to the community!', content: 'We are so glad you are here.', category: 'community', publish_date: new Date().toISOString(), is_pinned: true },
  { id: '2', title: 'New training available', content: 'Check out the new training resources in the Resources section.', category: 'update', publish_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), is_pinned: false }
];
const dummyEvents = [
  { id: '1', title: 'Weekly Prayer', event_type: 'prayer_session', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], time: '7:00 PM', is_virtual: true }
];
const dummyStories = [
  { id: '1', title: 'Healing Story', story: 'God healed my grandmother!', category: 'healing', is_featured: true, author_name: 'Sarah' }
];
const dummyPrayers = [
  { id: '1', title: 'Family health', description: 'Please pray for my family.', category: 'health', status: 'active', is_anonymous: true, prayer_count: 15, created_date: new Date().toISOString() }
];
const dummyResources = [
  { id: '1', title: 'Prayer Guide', description: 'How to pray effectively', category: 'guide', is_featured: true }
];

export default function Admin() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <Tabs defaultValue="announcements">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          <TabsTrigger value="prayers">Prayer Requests</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements">
          <AnnouncementsAdmin initialAnnouncements={dummyAnnouncements} />
        </TabsContent>
        <TabsContent value="events">
          <EventsAdmin initialEvents={dummyEvents} />
        </TabsContent>
        <TabsContent value="stories">
          <ImpactStoriesAdmin initialStories={dummyStories} />
        </TabsContent>
        <TabsContent value="prayers">
          <PrayerRequestsAdmin initialPrayers={dummyPrayers} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourcesAdmin initialResources={dummyResources} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
