import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

type Listener = (toast: ToastMessage) => void;
const listeners: Listener[] = [];

export const showToast = (message: string, type: ToastMessage['type'] = 'success', duration = 4000) => {
  const toast: ToastMessage = {
    id: `toast-${Date.now()}-${Math.random()}`,
    message,
    type,
    duration
  };
  listeners.forEach(l => l(toast));
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (toast: ToastMessage) => {
      setToasts(prev => [...prev, toast]);
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts(current => current.filter(t => t.id !== toast.id));
        }, toast.duration);
      }
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map(t => {
        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        }[t.type || 'info'];

        const border = {
          success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-100',
          warning: 'border-amber-500/40 bg-slate-900/95 text-amber-100',
          error: 'border-rose-500/40 bg-slate-900/95 text-rose-100',
          info: 'border-cyan-500/40 bg-slate-900/95 text-cyan-100'
        }[t.type || 'info'];

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg border shadow-2xl backdrop-blur-md transition-all duration-300 animate-slide-up ${border}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="text-xs font-medium tracking-wide text-slate-200">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
