import { CheckSquare, Calendar, Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  // Mock data for demonstration
  const recentTasks = [
    { id: '1', title: 'Complete project proposal', dueDate: '2024-01-15', priority: 'high' },
    { id: '2', title: 'Review team feedback', dueDate: '2024-01-16', priority: 'medium' },
    { id: '3', title: 'Update documentation', dueDate: '2024-01-17', priority: 'low' },
  ];

  const upcomingEvents = [
    { id: '1', title: 'Team Meeting', date: '2024-01-15', time: '10:00 AM' },
    { id: '2', title: 'Client Presentation', date: '2024-01-16', time: '2:00 PM' },
  ];

  const activeGoals = [
    { id: '1', title: 'Learn React Advanced Patterns', progress: 65 },
    { id: '2', title: 'Complete Fitness Challenge', progress: 40 },
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your productivity overview.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="planner-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
              <p className="text-2xl font-bold">{recentTasks.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="planner-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
              <p className="text-2xl font-bold">{upcomingEvents.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="planner-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
              <p className="text-2xl font-bold">{activeGoals.length}</p>
            </div>
            <Target className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="planner-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTasks.map((task, index) => (
              <div 
                key={task.id} 
                className="planner-card-compact cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-silver rounded"></div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${task.priority === 'high' ? 'bg-destructive/10 text-destructive' : 
                      task.priority === 'medium' ? 'bg-warning/10 text-warning' : 
                      'bg-success/10 text-success'}
                  `}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="planner-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Event
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="planner-card-compact cursor-pointer"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="planner-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Active Goals</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            <Plus className="w-4 h-4 mr-1" />
            Add Goal
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeGoals.map((goal, index) => (
            <div 
              key={goal.id} 
              className="planner-card-compact cursor-pointer"
              style={{ animationDelay: `${(index + 6) * 0.1}s` }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{goal.title}</p>
                  <span className="text-sm font-medium text-primary">{goal.progress}%</span>
                </div>
                <div className="w-full bg-silver-light rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}