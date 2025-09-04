import { useState } from 'react';
import { Plus, Search, Filter, CheckSquare2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Mock data
  const tasks = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Write and review the Q1 project proposal document',
      dueDate: '2024-01-15',
      priority: 'high' as const,
      completed: false,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Review team feedback',
      description: 'Go through all team feedback from last sprint',
      dueDate: '2024-01-16',
      priority: 'medium' as const,
      completed: false,
      createdAt: '2024-01-11'
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Update API documentation with new endpoints',
      dueDate: '2024-01-17',
      priority: 'low' as const,
      completed: true,
      createdAt: '2024-01-09'
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) ||
                         (filter === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        <Button className="btn-planner">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption as typeof filter)}
              className="capitalize"
            >
              {filterOption}
            </Button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="planner-card text-center py-12">
            <CheckSquare2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first task to get started'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`planner-card cursor-pointer ${task.completed ? 'opacity-60' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button className="mt-1">
                  <div className={`
                    w-5 h-5 border-2 rounded flex items-center justify-center
                    ${task.completed 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-silver hover:border-primary'
                    }
                  `}>
                    {task.completed && <CheckSquare2 className="w-3 h-3" />}
                  </div>
                </button>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{task.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      {isOverdue(task.dueDate) && (
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                    <span>•</span>
                    <span>Created: {task.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}