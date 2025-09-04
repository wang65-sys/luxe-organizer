import { useState } from 'react';
import { Plus, Search, Target, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function Goals() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const goals = [
    {
      id: '1',
      title: 'Learn React Advanced Patterns',
      description: 'Master advanced React concepts and patterns for better code architecture',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      sections: [
        { id: '1', title: 'Complete Hooks Deep Dive', completed: true },
        { id: '2', title: 'Learn Context Patterns', completed: true },
        { id: '3', title: 'Master Performance Optimization', completed: false },
        { id: '4', title: 'Build Advanced Project', completed: false },
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Complete Fitness Challenge',
      description: '30-day fitness transformation challenge with daily workouts',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      sections: [
        { id: '1', title: 'Week 1: Foundation Building', completed: true },
        { id: '2', title: 'Week 2: Intensity Increase', completed: true },
        { id: '3', title: 'Week 3: Strength Focus', completed: false },
        { id: '4', title: 'Week 4: Peak Performance', completed: false },
      ],
      completed: false
    },
  ];

  const filteredGoals = goals.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateProgress = (sections: any[]) => {
    const completed = sections.filter(s => s.completed).length;
    return Math.round((completed / sections.length) * 100);
  };

  const totalProgress = goals.reduce((acc, goal) => {
    return acc + calculateProgress(goal.sections);
  }, 0) / goals.length;

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">Track your long-term objectives and milestones</p>
        </div>
        <Button className="btn-planner">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Progress Tracker */}
      <div className="planner-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <p className="text-muted-foreground">Your goal completion across all active goals</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        
        <div className="relative">
          <Progress value={totalProgress} className="h-3" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Just started</span>
            <span>Halfway there</span>
            <span>Almost done!</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-card-border">
          <div className="text-center">
            <div className="text-lg font-semibold">{goals.length}</div>
            <div className="text-sm text-muted-foreground">Active Goals</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {goals.reduce((acc, goal) => acc + goal.sections.filter(s => s.completed).length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Completed Steps</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {goals.reduce((acc, goal) => acc + goal.sections.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Steps</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search goals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {filteredGoals.length === 0 ? (
          <div className="planner-card text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No goals found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first goal to get started'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        ) : (
          filteredGoals.map((goal, index) => (
            <div 
              key={goal.id} 
              className="planner-card cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{goal.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{goal.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{goal.startDate} - {goal.endDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-xl font-bold text-primary">
                    {calculateProgress(goal.sections)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <Progress value={calculateProgress(goal.sections)} className="h-2" />
              </div>

              {/* Sections */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Progress Steps:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goal.sections.map((section) => (
                    <div 
                      key={section.id}
                      className={`
                        flex items-center gap-2 p-2 rounded-lg border transition-colors
                        ${section.completed 
                          ? 'bg-success/10 border-success/20 text-success' 
                          : 'bg-secondary border-card-border hover:border-primary/20'
                        }
                      `}
                    >
                      <div className={`
                        w-4 h-4 border-2 rounded flex items-center justify-center text-xs
                        ${section.completed 
                          ? 'bg-success border-success text-success-foreground' 
                          : 'border-silver'
                        }
                      `}>
                        {section.completed && '✓'}
                      </div>
                      <span className={`text-sm ${section.completed ? 'line-through' : ''}`}>
                        {section.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-card-border">
                <Button variant="outline" size="sm" className="w-full">
                  Update Progress
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}