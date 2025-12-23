
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CHART_DATA, COLORS } from '../constants';

const CashFlowChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[12px] border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[17px] font-semibold text-gray-900">Cash Flow Analysis</h3>
          <p className="text-xs text-gray-400 mt-1">Income vs Expenses (Last 6 Months)</p>
        </div>
        <div className="flex items-center space-x-6 text-xs font-medium">
          <div className="flex items-center space-x-2">
            {/* Replaced successGreen with brandGreen */}
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.brandGreen }}></span>
            <span className="text-gray-600">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            <span className="text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                {/* Replaced successGreen with brandGreen */}
                <stop offset="5%" stopColor={COLORS.brandGreen} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={COLORS.brandGreen} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              hide 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke={COLORS.brandGreen} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#D1D5DB" 
              strokeWidth={3}
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;
