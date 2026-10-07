import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: 'default' | 'verified' | 'review' | 'anomaly' | 'ai';
  trend?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  trend,
  onClick
}) => {
  const variantStyles = {
    default: 'border-gis-border hover:border-slate-600/80 text-slate-200',
    verified: 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50 text-emerald-400',
    review: 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50 text-amber-400',
    anomaly: 'border-rose-500/30 bg-rose-950/10 hover:border-rose-500/50 text-rose-400',
    ai: 'border-cyan-500/30 bg-cyan-950/10 hover:border-cyan-500/50 text-cyan-400',
  };

  const iconBgStyles = {
    default: 'bg-slate-800/60 text-slate-300',
    verified: 'bg-emerald-900/30 text-emerald-400',
    review: 'bg-amber-900/30 text-amber-400',
    anomaly: 'bg-rose-900/30 text-rose-400',
    ai: 'bg-cyan-900/30 text-cyan-400',
  };

  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-xl border bg-gis-card/95 transition-all duration-200 shadow-sm ${variantStyles[variant]} ${onClick ? 'cursor-pointer hover:translate-y-[-1px]' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-white">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                {trend}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-slate-400/90 leading-snug">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-lg border border-white/5 ${iconBgStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
