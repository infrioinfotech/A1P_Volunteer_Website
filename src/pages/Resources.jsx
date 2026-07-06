import React from 'react';
import ResourceLibrary from '../components/resources/ResourceLibrary';

const dummyResources = [
  { id: '1', title: 'Volunteer Guide', description: 'Everything you need to know about volunteering', category: 'guide', is_featured: true, file_url: '#' },
  { id: '2', title: 'Prayer Training', description: 'Learn how to pray effectively', category: 'training', is_featured: true, file_url: '#' },
  { id: '3', title: 'Daily Devotional', description: '30-day devotional', category: 'devotional', is_featured: false, file_url: '#' },
  { id: '4', title: 'Community Outreach', description: 'How to share your faith', category: 'video', is_featured: false, file_url: '#' },
  { id: '5', title: 'Bible Study Guide', description: 'Inductive Bible Study method', category: 'pdf', is_featured: false, file_url: '#' }
];

export default function Resources() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <ResourceLibrary resources={dummyResources} />
    </div>
  );
}
