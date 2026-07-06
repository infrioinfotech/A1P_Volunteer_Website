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

export default function ImpactStoriesAdmin({ initialStories = [] }) {
  const [stories, setStories] = useState(initialStories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', story: '', author_name: '', category: 'guidance', is_featured: false, is_anonymous: false, image_url: ''
  });

  const resetForm = () => {
    setFormData({ title: '', story: '', author_name: '', category: 'guidance', is_featured: false, is_anonymous: false, image_url: '' });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      story: item.story,
      author_name: item.author_name || '',
      category: item.category,
      is_featured: item.is_featured,
      is_anonymous: item.is_anonymous,
      image_url: item.image_url || ''
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setStories(stories.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      toast.success('Story updated');
    } else {
      setStories([...stories, { ...formData, id: Date.now().toString(), created_date: new Date().toISOString() }]);
      toast.success('Story created');
    }
    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    setStories(stories.filter(item => item.id !== id));
    toast.success('Story deleted');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Impact Stories ({stories?.length || 0})</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Impact Story</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <Label>Story</Label>
                <Textarea value={formData.story} onChange={(e) => setFormData({...formData, story: e.target.value})} className="h-32" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Author Name</Label>
                  <Input value={formData.author_name} onChange={(e) => setFormData({...formData, author_name: e.target.value})} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['healing', 'provision', 'restoration', 'guidance', 'miracle'].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Image URL (optional)</Label>
                <Input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.is_anonymous}
                    onChange={(e) => setFormData({...formData, is_anonymous: e.target.checked})}
                  />
                  <Label htmlFor="anonymous">Anonymous</Label>
                </div>
              </div>
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
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                <TableCell>{item.is_anonymous ? 'Anonymous' : item.author_name || '-'}</TableCell>
                <TableCell>{item.is_featured ? '⭐' : '-'}</TableCell>
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
