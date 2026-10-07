import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { ExplainabilityFactor } from '../../types/parcel';

interface ExplainabilityPanelProps {
  factors: ExplainabilityFactor[];
  overallConfidence: number;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({
  factors,
  overallConfidence
}) => {
  return (
    <div className="bg-gis-darkest/90 border border-gis-border rounded-xl p-4 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-gis-border/70 mb-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Why this boundary? (AI Explainability)
          </h4>
        </div>
        <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
          {overallConfidence}% Model Concordance
        </span>
      </div>

      <div className="space-y-2.5">
        {factors.map((factor, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-gis-card/60 border border-gis-border/40"
          >
            {factor.matched ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-200">
                  {factor.label}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {factor.score}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {factor.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-gis-border/50 text-[11px] text-slate-400/90 italic flex items-center gap-1.5">
        <span>ℹ️</span>
        <span>Candidate boundary synthesized by Cadastra-SegNet v3.2 edge-gradient loss function.</span>
      </div>
    </div>
  );
};
