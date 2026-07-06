import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function EventsAdmin({ initialEvents = [] }) {
  const [events, setEvents] = useState(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', event_type: 'prayer_session', date: '', time: '', is_virtual: true, meeting_link: ''
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', event_type: 'prayer_session', date: '', time: '', is_virtual: true, meeting_link: '' });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      event_type: item.event_type,
      date: item.date,
      time: item.time || '',
      is_virtual: item.is_virtual,
      meeting_link: item.meeting_link || ''
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setEvents(events.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      toast.success('Event updated');
    } else {
      setEvents([...events, { ...formData, id: Date.now().toString(), created_date: new Date().toISOString() }]);
      toast.success('Event created');
    }
    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    setEvents(events.filter(item => item.id !== id));
    toast.success('Event deleted');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Events ({events?.length || 0})</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={formData.event_type} onValueChange={(v) => setFormData({...formData, event_type: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['prayer_session', 'training', 'community_gathering', 'webinar', 'other'].map(t => (
                        <SelectItem key={t} value={t}>{t.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Virtual?</Label>
                  <Select value={formData.is_virtual.toString()} onValueChange={(v) => setFormData({...formData, is_virtual: v === 'true'})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} placeholder="7:00 PM" />
                </div>
              </div>
              {formData.is_virtual && (
                <div>
                  <Label>Meeting Link</Label>
                  <Input value={formData.meeting_link} onChange={(e) => setFormData({...formData, meeting_link: e.target.value})} placeholder="https://zoom.us/..." />
                </div>
              )}
              <Button type="submit" className="w-full">{editingItem ? 'Update' : 'Create'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Virtual</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell><Badge variant="outline">{item.event_type?.replace('_', ' ')}</Badge></TableCell>
                <TableCell>{format(new Date(item.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{item.time || '-'}</TableCell>
                <TableCell>{item.is_virtual ? '✓' : '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
