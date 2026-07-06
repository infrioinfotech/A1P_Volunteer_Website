import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Video, BookOpen, Download, Search, Filter, ExternalLink, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categoryIcons = {
  training: BookOpen,
  guide: FileText,
  video: Video,
  pdf: FileText,
  devotional: BookOpen
};

const categoryColors = {
  training: 'bg-indigo-100 text-indigo-700',
  guide: 'bg-emerald-100 text-emerald-700',
  video: 'bg-blue-100 text-blue-700',
  pdf: 'bg-amber-100 text-amber-700',
  devotional: 'bg-rose-100 text-rose-700'
};

export default function ResourceLibrary({ resources }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredResources = resources?.filter(r => {
    const matchesSearch = r.title?.toLowerCase().includes(search.toLowerCase()) ||
                         r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];
  
  const featuredResources = filteredResources.filter(r => r.is_featured);
  const regularResources = filteredResources.filter(r => !r.is_featured);
  
  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="guide">Guides</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="pdf">PDFs</SelectItem>
            <SelectItem value="devotional">Devotionals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Featured
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource, index) => {
              const Icon = categoryIcons[resource.category] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-blue-50 hover:shadow-md transition-all duration-300 overflow-hidden">
                    {resource.thumbnail_url && (
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={resource.thumbnail_url} 
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl ${categoryColors[resource.category]} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className={`${categoryColors[resource.category]} text-xs mb-1`}>
                            {resource.category}
                          </Badge>
                          <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                          <p className="text-sm text-slate-600 line-clamp-2 mt-1">{resource.description}</p>
                        </div>
                      </div>
                      {resource.file_url && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => window.open(resource.file_url, '_blank')}
                        >
                          {resource.category === 'video' ? (
                            <>Watch <ExternalLink className="w-3 h-3 ml-1" /></>
                          ) : (
                            <>Download <Download className="w-3 h-3 ml-1" /></>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* All Resources */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          All Resources ({regularResources.length})
        </h3>
        {regularResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No resources found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularResources.map((resource, index) => {
              const Icon = categoryIcons[resource.category] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 h-full">
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl ${categoryColors[resource.category]} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className={`${categoryColors[resource.category]} text-xs mb-1`}>
                            {resource.category}
                          </Badge>
                          <h4 className="font-medium text-slate-800 text-sm">{resource.title}</h4>
                          {resource.description && (
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{resource.description}</p>
                          )}
                        </div>
                      </div>
                      {resource.file_url && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          onClick={() => window.open(resource.file_url, '_blank')}
                        >
                          {resource.category === 'video' ? 'Watch' : 'View'}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}