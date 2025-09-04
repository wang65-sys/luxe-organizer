import { useState } from 'react';
import { Search, Archive as ArchiveIcon, CheckSquare, Calendar, Target, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'task' | 'event' | 'goal'>('all');

  // Mock archived data
  const archivedItems = [
    {
      id: '1',
      type: 'task' as const,
      title: 'Update user interface',
      description: 'Redesign the main dashboard with new components',
      completedAt: '2024-01-12',
      archivedAt: '2024-01-13',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'event' as const,
      title: 'Project Kickoff Meeting',
      description: 'Initial meeting with stakeholders to define project scope',
      completedAt: '2024-01-10',
      archivedAt: '2024-01-11',
      date: '2024-01-10',
      time: '09:00 - 10:30'
    },
    {
      id: '3',
      type: 'goal' as const,
      title: 'Complete TypeScript Course',
      description: 'Master TypeScript fundamentals and advanced concepts',
      completedAt: '2024-01-08',
      archivedAt: '2024-01-09',
      progress: 100
    },
    {
      id: '4',
      type: 'task' as const,
      title: 'Write technical documentation',
      description: 'Document the new API endpoints and usage examples',
      completedAt: '2024-01-05',
      archivedAt: '2024-01-06',
      priority: 'high'
    },
  ];

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return CheckSquare;
      case 'event': return Calendar;
      case 'goal': return Target;
      default: return ArchiveIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'event': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'goal': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority?: string) => {
    if (!priority) return '';
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDaysInArchive = (archivedAt: string) => {
    const archived = new Date(archivedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - archived.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
          <p className="text-muted-foreground">Completed tasks, events, and goals</p>
        </div>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
          Items auto-delete after 7 days
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search archived items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'task', label: 'Tasks' },
            { value: 'event', label: 'Events' },
            { value: 'goal', label: 'Goals' }
          ].map((filterOption) => (
            <Button
              key={filterOption.value}
              variant={filter === filterOption.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption.value as typeof filter)}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="planner-card-compact">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Archived</p>
              <p className="text-xl font-bold">{archivedItems.length}</p>
            </div>
            <ArchiveIcon className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="planner-card-compact">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks</p>
              <p className="text-xl font-bold">{archivedItems.filter(i => i.type === 'task').length}</p>
            </div>
            <CheckSquare className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="planner-card-compact">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Events</p>
              <p className="text-xl font-bold">{archivedItems.filter(i => i.type === 'event').length}</p>
            </div>
            <Calendar className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="planner-card-compact">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Goals</p>
              <p className="text-xl font-bold">{archivedItems.filter(i => i.type === 'goal').length}</p>
            </div>
            <Target className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Archived Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="planner-card text-center py-12">
            <ArchiveIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No archived items found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'Complete some tasks, events, or goals to see them here'}
            </p>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const Icon = getTypeIcon(item.type);
            const daysInArchive = getDaysInArchive(item.archivedAt);
            const daysRemaining = 7 - daysInArchive;
            
            return (
              <div 
                key={item.id} 
                className="planner-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold line-through opacity-75">{item.title}</h3>
                          <Badge className={getTypeColor(item.type)} variant="secondary">
                            {item.type}
                          </Badge>
                          {item.type === 'task' && item.priority && (
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Completed: {item.completedAt}</span>
                      <span>•</span>
                      <span>Archived: {item.archivedAt}</span>
                      {item.type === 'event' && item.time && (
                        <>
                          <span>•</span>
                          <span>{item.time}</span>
                        </>
                      )}
                      {item.type === 'goal' && item.progress && (
                        <>
                          <span>•</span>
                          <span>{item.progress}% Complete</span>
                        </>
                      )}
                    </div>

                    {/* Auto-delete countdown */}
                    <div className="flex items-center justify-between pt-2 border-t border-card-border">
                      <div className="text-xs text-muted-foreground">
                        {daysRemaining > 0 
                          ? `Auto-delete in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}` 
                          : 'Will be deleted soon'
                        }
                      </div>
                      <div className="w-24 bg-silver-light rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(daysInArchive / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}