import { Plus } from 'lucide-react';
import { useState } from 'react';
import QuickAddModal from './quick-add-modal';

export default function QuickAddButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="quick-add-btn"
        aria-label="Quick add task, event, or goal"
      >
        <Plus className="w-6 h-6" />
      </button>

      <QuickAddModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}