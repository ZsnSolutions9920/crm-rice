
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { REPORT_CHART_DATA, EXPENSE_BREAKDOWN, COLORS } from '../constants';

export const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[17px] font-bold text-[#0F172A]">Revenue vs Expenses</h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Weekly performance tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[11px] font-bold text-gray-500">Revenue</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
            <span className="text-[11px] font-bold text-gray-500">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REPORT_CHART_DATA}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={3} fill="url(#colorRev)" />
            <Area type="monotone" dataKey="expenses" stroke="#e2e8f0" strokeWidth={3} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ExpenseBreakdownChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
      <h3 className="text-[17px] font-bold text-[#0F172A] mb-6">Expense Breakdown</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_BREAKDOWN}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {EXPENSE_BREAKDOWN.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full mt-6 space-y-3">
          {EXPENSE_BREAKDOWN.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-[13px] font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="font-bold text-[#0F172A]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
