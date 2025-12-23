
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AI_INSIGHTS, COLORS } from '../constants';

const AIInsights: React.FC = () => {
  return (
    <div className="bg-[#F1FBED] rounded-xl border border-[#22C55E]/10 p-6 shadow-sm mb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles size={120} className="text-[#22C55E]" />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Sparkles size={20} className="text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">AI Business Insights</h2>
            <p className="text-sm text-[#166534]/70 font-medium">Automatically generated based on current data trends</p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 bg-white/60 text-[#166534] rounded-full border border-white">
          Updated just now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {AI_INSIGHTS.map((insight) => (
          <div key={insight.id} className="bg-white/80 backdrop-blur-sm border border-white p-4 rounded-xl flex items-start space-x-4 hover:shadow-md hover:bg-white transition-all group">
            <div className={`p-2.5 rounded-lg bg-gray-50/50 ${insight.iconColor}`}>
              <insight.icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-[#0F172A] mb-1">{insight.headline}</h3>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{insight.description}</p>
              <button className="mt-3 flex items-center space-x-1.5 text-[12px] font-bold text-[#22C55E] hover:text-[#166534] transition-colors">
                <span>{insight.action}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
