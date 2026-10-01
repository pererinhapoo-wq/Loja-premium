import React from 'react';
import { Check, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1C1D20]/95 backdrop-blur-md border border-[#34363C] text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="w-5 h-5 rounded-full bg-[#344834] flex items-center justify-center text-white shrink-0">
        <Check className="w-3 h-3" />
      </div>
      <span className="text-xs font-medium text-[#F4F4EE]">{message}</span>
      <button
        onClick={onDismiss}
        className="p-1 text-[#9CA0AA] hover:text-white transition-colors ml-2"
        aria-label="Dispensar aviso"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
