
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TransactionStatus } from '../types';

interface ActivityTableProps {
  formatValue: (usdAmount: number) => string;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ formatValue }) => {
  const transactions = [
    {
      id: '#INV-2024-001',
      entity: 'SuperMart Inc.',
      avatar: 'SM',
      avatarColor: 'bg-blue-100 text-blue-600',
      type: 'Invoice Sent',
      date: 'Oct 24, 2023',
      amountUsd: 12450.00,
      status: TransactionStatus.PENDING,
    },
    {
      id: '#PAY-2024-892',
      entity: 'Global Rice Supply',
      avatar: 'GR',
      avatarColor: 'bg-purple-100 text-purple-600',
      type: 'Payment Out',
      date: 'Oct 23, 2023',
      amountUsd: 5200.00,
      status: TransactionStatus.COMPLETED,
    },
    {
      id: '#REC-2024-112',
      entity: 'Asian Resto Chain',
      avatar: 'AR',
      avatarColor: 'bg-orange-100 text-orange-600',
      type: 'Payment Received',
      date: 'Oct 22, 2023',
      amountUsd: 3850.00,
      status: TransactionStatus.COMPLETED,
    },
  ];

  return (
    <div className="bg-white rounded-[12px] border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-50">
        <h3 className="text-[17px] font-semibold text-gray-900">Recent Activity</h3>
        <button className="flex items-center space-x-1 text-sm font-semibold text-[#4CAF50] hover:translate-x-1 transition-all">
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Entity</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((t, idx) => (
              <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900">{t.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${t.avatarColor}`}>
                      {t.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t.entity}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500">{t.type}</td>
                <td className="px-6 py-5 text-sm text-gray-500">{t.date}</td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">{formatValue(t.amountUsd)}</td>
                <td className="px-6 py-5">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
                    t.status === TransactionStatus.COMPLETED 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
