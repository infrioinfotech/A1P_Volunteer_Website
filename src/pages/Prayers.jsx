import React, { useState } from 'react';
import PrayerRequestCard from '../components/prayer/PrayerRequestCard';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const dummyPrayers = [
  { id: '1', title: 'Health for family', description: 'Please pray for my family\'s health', category: 'health', status: 'active', is_anonymous: true, prayer_count: 15, created_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '2', title: 'Guidance in career', description: 'Please pray for guidance in my career decisions', category: 'career', status: 'answered', is_anonymous: false, prayer_count: 8, created_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), testimony: 'God opened a door for a new job!' },
  { id: '3', title: 'Financial provision', description: 'Please pray for our financial needs', category: 'financial', status: 'active', is_anonymous: true, prayer_count: 22, created_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
];

export default function Prayers() {
  const [prayers, setPrayers] = useState(dummyPrayers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'other', is_anonymous: true });
  const [isPraying, setIsPraying] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrayers([{ ...formData, id: Date.now().toString(), status: 'active', prayer_count: 0, created_date: new Date().toISOString() }, ...prayers]);
    setDialogOpen(false);
    setFormData({ title: '', description: '', category: 'other', is_anonymous: true });
    toast.success('Prayer request submitted!');
  };

  const handlePray = (request) => {
    setIsPraying(request.id);
    setTimeout(() => setIsPraying(null), 1000);
    setPrayers(prayers.map(p => p.id === request.id ? { ...p, prayer_count: (p.prayer_count || 0) + 1 } : p));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Prayer Requests</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Prayer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Prayer Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['health', 'family', 'financial', 'spiritual', 'career', 'relationships', 'other'].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" checked={formData.is_anonymous} onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })} />
                <Label htmlFor="anonymous">Anonymous</Label>
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {prayers.map(prayer => (
          <PrayerRequestCard key={prayer.id} request={prayer} onPray={handlePray} isPraying={isPraying === prayer.id} />
        ))}
      </div>
    </div>
  );
}
