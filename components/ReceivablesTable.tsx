
import React from 'react';
import { MoreVertical, CheckCircle, Bell, Eye } from 'lucide-react';
import { RECEIVABLES_DATA } from '../constants';

interface ReceivablesTableProps {
  formatValue: (usdAmount: number) => string;
}

const ReceivablesTable: React.FC<ReceivablesTableProps> = ({ formatValue }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Overdue':
        return 'bg-rose-50 text-rose-500 border-none';
      case 'Pending':
        return 'bg-amber-50 text-amber-500 border-none';
      case 'Paid':
        return 'bg-emerald-50 text-emerald-500 border-none';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FBFA] text-[12px] font-semibold text-[#166534]/60 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 w-12">
                <input type="checkbox" className="rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]" />
              </th>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Product Info</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECEIVABLES_DATA.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <input type="checkbox" className="rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]" />
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-semibold text-[#22C55E] cursor-pointer hover:underline">{item.id}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${item.avatarColor}`}>
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none">{item.customer}</p>
                      <p className="text-[12px] text-gray-400 mt-1">{item.customerType}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">{item.product}</p>
                    <p className="text-[12px] text-emerald-600 mt-0.5">{item.quantity}</p>
                  </div>
                </td>
                <td className={`px-6 py-5 text-sm font-medium ${item.status === 'Overdue' ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {item.dueDate}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">
                  {formatValue(item.amount)}
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border-none ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end space-x-3">
                    {item.status === 'Paid' ? (
                      <Eye size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    ) : (
                      <>
                        <CheckCircle size={18} className="text-emerald-500 cursor-pointer" />
                        {item.status === 'Overdue' && <Bell size={18} className="text-rose-400 cursor-pointer" />}
                      </>
                    )}
                    <MoreVertical size={18} className="text-gray-300 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-8 py-4 flex items-center justify-between border-t border-gray-50 bg-[#F9FAFB]">
        <p className="text-sm text-gray-400 font-medium">
          Showing <span className="text-gray-900">1 to 5</span> of <span className="text-gray-900">24</span> results
        </p>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-white disabled:opacity-50">
            &lsaquo;
          </button>
          <button className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold bg-[#22C55E] text-white shadow-sm">1</button>
          <button className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-200 border border-transparent">2</button>
          <button className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-200 border border-transparent">3</button>
          <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-white">
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivablesTable;
