import { useState } from 'react';
import { CheckSquare, Calendar, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import TaskFormModal from './task-form-modal';
import EventFormModal from './event-form-modal';
import GoalFormModal from './goal-form-modal';
import LoadingScreen from './loading-screen';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'task' | 'event' | 'goal';
}

export default function QuickAddModal({ isOpen, onClose, defaultType }: QuickAddModalProps) {
  const [selectedType, setSelectedType] = useState<'task' | 'event' | 'goal'>(defaultType || 'task');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const types = [
    { id: 'task', name: 'Task', icon: CheckSquare, description: 'Create a new task' },
    { id: 'event', name: 'Event', icon: Calendar, description: 'Schedule an event' },
    { id: 'goal', name: 'Goal', icon: Target, description: 'Set a new goal' },
  ];

  const handleCreate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowForm(true);
    }, 800);
  };

  const handleFormSubmit = (data: any) => {
    console.log(`Created ${selectedType}:`, data);
    setShowForm(false);
    onClose();
  };

  const handleModalClose = () => {
    setShowForm(false);
    onClose();
  };

  return (
    <>
      {isLoading && <LoadingScreen message={`Creating ${selectedType}...`} />}
      
      <Dialog open={isOpen && !showForm} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Quick Add</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {types.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as 'task' | 'event' | 'goal')}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-all
                    ${selectedType === type.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-card-border hover:border-silver'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${selectedType === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="text-left">
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="flex-1">
              Create {types.find(t => t.id === selectedType)?.name}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TaskFormModal 
        isOpen={showForm && selectedType === 'task'} 
        onClose={handleModalClose} 
        onSubmit={handleFormSubmit}
      />
      
      <EventFormModal 
        isOpen={showForm && selectedType === 'event'} 
        onClose={handleModalClose} 
        onSubmit={handleFormSubmit}
      />
      
      <GoalFormModal 
        isOpen={showForm && selectedType === 'goal'} 
        onClose={handleModalClose} 
        onSubmit={handleFormSubmit}
      />
    </>
  );
}