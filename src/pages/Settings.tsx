import { useState } from 'react';
import { Moon, Sun, Volume2, Clock, Smartphone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [ringDuration, setRingDuration] = useState([30]);
  const [snoozeDuration, setSnoozeDuration] = useState([5]);
  const [selectedRingtone, setSelectedRingtone] = useState('default');

  const defaultRingtones = [
    { id: 'default', name: 'Default Chime' },
    { id: 'gentle', name: 'Gentle Bell' },
    { id: 'classic', name: 'Classic Ring' },
    { id: 'modern', name: 'Modern Tone' },
    { id: 'nature', name: 'Nature Sounds' },
  ];

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // TODO: Implement actual dark mode toggle
    document.documentElement.classList.toggle('dark');
  };

  const handleCustomRingtone = () => {
    // TODO: Implement file picker for custom ringtone
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Selected custom ringtone:', file.name);
        // Handle custom ringtone upload
      }
    };
    input.click();
  };

  return (
    <div className="space-y-8 fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your planner experience
        </p>
      </div>

      {/* Appearance Settings */}
      <div className="planner-card">
        <h2 className="text-xl font-semibold mb-6">Appearance</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="planner-card">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>
        
        <div className="space-y-8">
          {/* Ring Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Ring Duration</Label>
              <span className="text-sm text-muted-foreground">
                {ringDuration[0]} seconds
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              How long notifications will ring before automatically stopping
            </p>
            <div className="px-2">
              <Slider
                value={ringDuration}
                onValueChange={setRingDuration}
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5s</span>
                <span>60s</span>
              </div>
            </div>
          </div>

          {/* Snooze Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Snooze Duration</Label>
              <span className="text-sm text-muted-foreground">
                {snoozeDuration[0]} minutes
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              How long to wait before showing the notification again after snoozing
            </p>
            <div className="px-2">
              <Slider
                value={snoozeDuration}
                onValueChange={setSnoozeDuration}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1m</span>
                <span>30m</span>
              </div>
            </div>
          </div>

          {/* Ringtone Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Ringtone</Label>
            <p className="text-sm text-muted-foreground">
              Choose your notification sound
            </p>
            
            <div className="space-y-3">
              <Select value={selectedRingtone} onValueChange={setSelectedRingtone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a ringtone" />
                </SelectTrigger>
                <SelectContent>
                  {defaultRingtones.map((ringtone) => (
                    <SelectItem key={ringtone.id} value={ringtone.id}>
                      {ringtone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Test Sound
                </Button>
                <Button variant="outline" size="sm" onClick={handleCustomRingtone}>
                  <Download className="w-4 h-4 mr-2" />
                  Upload Custom
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="planner-card">
        <h2 className="text-xl font-semibold mb-6">About</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">January 2024</span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Theme</span>
            <span className="font-medium">Clean & Modern</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="planner-card">
        <h2 className="text-xl font-semibold mb-6">Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              Export Data
            </Button>
            <Button variant="outline" className="flex-1">
              Import Data
            </Button>
          </div>
          
          <div className="pt-4 border-t border-card-border">
            <Button variant="destructive" className="w-full">
              Clear All Data
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This action cannot be undone. All your tasks, events, and goals will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}