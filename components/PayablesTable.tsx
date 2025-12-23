
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { PAYABLES_DATA } from '../constants';
import { PayableStatus } from '../types';

interface PayablesTableProps {
  formatValue: (usdAmount: number) => string;
}

const PayablesTable: React.FC<PayablesTableProps> = ({ formatValue }) => {
  const getStatusStyle = (status: PayableStatus) => {
    switch (status) {
      case PayableStatus.DUE_SOON:
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case PayableStatus.PAID:
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case PayableStatus.OVERDUE:
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case PayableStatus.SCHEDULED:
        return 'bg-gray-50 text-gray-600 border-gray-100';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getDueDateStyle = (status: PayableStatus) => {
    if (status === PayableStatus.OVERDUE) return 'text-rose-600 font-bold';
    if (status === PayableStatus.DUE_SOON) return 'text-amber-600 font-bold';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FBF8] text-[11px] font-bold text-[#2E7D32]/60 uppercase tracking-widest border-b border-gray-100">
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Vendor Details</th>
              <th className="px-6 py-4">Issue Date</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PAYABLES_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-[#F4FBF2]/30 transition-colors group">
                <td className="px-6 py-5 text-sm font-semibold text-gray-900">{item.id}</td>
                <td className="px-6 py-5">
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">{item.vendor}</p>
                    <p className="text-[12px] text-[#2E7D32] mt-1.5">{item.reference}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 font-medium">{item.issueDate}</td>
                <td className={`px-6 py-5 text-sm font-medium ${getDueDateStyle(item.status)}`}>
                  {item.dueDate}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">
                  {formatValue(item.amount)}
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button className="p-1 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-[#F8FBF8]/50 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500">
          Showing <span className="text-gray-900 font-bold">1 to 5</span> of <span className="text-gray-900 font-bold">42</span> invoices
        </p>
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300">
            <span className="sr-only">Previous</span>
            &larr;
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-[#7BEA4E] text-white shadow-sm">1</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">2</button>
          <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300">
            <span className="sr-only">Next</span>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayablesTable;
