import { useState } from 'react';
import { Plus, Search, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data
  const events = [
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync and planning session',
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '11:00',
      location: 'Conference Room A',
      completed: false
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Present Q1 roadmap to key stakeholders',
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Virtual - Zoom',
      completed: false
    },
    {
      id: '3',
      title: 'Product Demo',
      description: 'Demo new features to the product team',
      date: '2024-01-17',
      startTime: '09:00',
      endTime: '10:00',
      location: 'Product Lab',
      completed: true
    },
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage your schedule and appointments</p>
        </div>
        <Button className="btn-planner">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="planner-card">
            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              modifiers={{
                hasEvents: events.map(event => new Date(event.date))
              }}
              modifiersStyles={{
                hasEvents: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '50%'
                }
              }}
            />
            
            {selectedDate && (
              <div className="mt-4 pt-4 border-t border-card-border">
                <h3 className="font-medium mb-3">
                  Events on {selectedDate.toLocaleDateString()}
                </h3>
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="p-2 bg-secondary rounded-lg">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))}
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Events */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="planner-card text-center py-12">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first event to get started'}
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`planner-card cursor-pointer ${event.completed ? 'opacity-60' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Date indicator */}
                    <div className="flex flex-col items-center bg-primary text-primary-foreground rounded-lg p-2 min-w-[4rem]">
                      <div className="text-xs font-medium">
                        {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold ${event.completed ? 'line-through' : ''}`}>
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{event.description}</p>
                        </div>
                        
                        {event.completed && (
                          <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                            Completed
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}