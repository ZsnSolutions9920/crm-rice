
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { StockLevel } from '../types';

const STOCK_DATA: StockLevel[] = [
  { name: 'Basmati Premium', quantity: 20, status: 'Healthy', percentage: 80, color: '#4CAF50' },
  { name: 'Jasmine AAA', quantity: 12, status: 'Good', percentage: 60, color: '#4CAF50' },
  { name: 'Long Grain White', quantity: 5, status: 'Action Needed', percentage: 25, color: '#E53935' },
  { name: 'Arborio', quantity: 8, status: 'Running Low', percentage: 40, color: '#F4C430' },
];

const StockLevels: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[12px] border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[17px] font-semibold text-gray-900">Rice Stock Levels</h3>
        <button className="text-sm font-semibold text-[#4CAF50] hover:text-[#3e8e41] transition-colors">
          Manage
        </button>
      </div>

      <div className="flex-1 space-y-7">
        {STOCK_DATA.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-[14px] font-semibold text-gray-800">{item.name}</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.quantity} tons</p>
              </div>
              <div className="flex items-center space-x-1.5">
                {item.status === 'Action Needed' && <AlertCircle size={14} className="text-[#E53935]" />}
                <span 
                  className="text-[11px] font-bold" 
                  style={{ color: item.color }}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-3 bg-[#F6F7F9] text-gray-500 text-sm font-semibold rounded-[10px] hover:bg-gray-200 transition-colors">
        View Full Inventory
      </button>
    </div>
  );
};

export default StockLevels;
