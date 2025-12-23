
import React, { useState } from 'react';
import { MoreVertical, Truck, AlertCircle, Eye, Edit2, Copy, Archive, CheckCircle2, Trash2, SlidersHorizontal } from 'lucide-react';
import { INVENTORY_DATA } from '../constants';
import { InventoryItem } from '../types';

interface InventoryTableProps {
  formatValue: (usdAmount: number) => string;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ formatValue }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(INVENTORY_DATA.map(i => i.id));
    } else {
      setSelectedItems([]);
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Low Stock':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Out of Stock':
        return 'bg-gray-50 text-gray-600 border-gray-100';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'In Stock': return '#4CAF50';
      case 'Moderate': return '#F4C430';
      case 'Low Stock': return '#E53935';
      default: return '#D1D5DB';
    }
  };

  return (
    <div className="relative">
      {/* Bulk Action Toolbar */}
      {selectedItems.length > 0 && (
        <div className="absolute -top-16 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg p-3 flex items-center justify-between z-20 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-4 pl-2">
            <span className="text-sm font-bold text-[#0F172A]">{selectedItems.length} items selected</span>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-1.5 transition-colors">
                <Edit2 size={14} />
                <span>Bulk Update</span>
              </button>
              <button className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-1.5 transition-colors">
                <SlidersHorizontal size={14} />
                <span>Adjust Stock</span>
              </button>
              <button className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-1.5 transition-colors">
                <Archive size={14} />
                <span>Mark as Inactive</span>
              </button>
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg flex items-center space-x-1.5 transition-colors">
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}

      <div className="bg-white rounded-[12px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FBF8] text-[11px] font-bold text-[#2E7D32]/60 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-[#7BEA4E] focus:ring-[#7BEA4E]" 
                    onChange={toggleSelectAll}
                    checked={selectedItems.length === INVENTORY_DATA.length}
                  />
                </th>
                <th className="px-6 py-4">SKU / Product Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Available</th>
                <th className="px-6 py-4">Incoming</th>
                <th className="px-6 py-4">Reorder Point</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {INVENTORY_DATA.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-[#F4FBF2]/30 transition-all group relative ${selectedItems.includes(item.id) ? 'bg-[#F4FBF2]/50' : ''}`}
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#7BEA4E] focus:ring-[#7BEA4E]" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                        {hoveredRow === item.id && (
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer">
                            <Eye size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-1.5">{item.sku} • {item.packSize}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{item.warehouse}</td>
                  <td className="px-6 py-4 w-48">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span style={{ color: getProgressColor(item.status) }}>{item.stockPercentage}%</span>
                        <span className="text-gray-400">{item.currentQuantity} / {item.maxQuantity}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.stockPercentage}%`, backgroundColor: getProgressColor(item.status) }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{item.available} sacks</span>
                  </td>
                  <td className="px-6 py-4">
                    {item.incoming ? (
                      <div className="flex items-center space-x-1.5 text-blue-600 font-bold text-sm">
                        <Truck size={14} />
                        <span>{item.incoming}</span>
                      </div>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">{item.reorderPoint}</span>
                      {item.available <= item.reorderPoint && (
                        <div className="group/tip relative">
                          <AlertCircle size={14} className="text-rose-500" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tip:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl z-50">
                            Available stock ({item.available}) is at or below reorder point ({item.reorderPoint}).
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {formatValue(item.unitPrice)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full border ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 relative">
                    {hoveredRow === item.id ? (
                      <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2 duration-200">
                         <button className="px-2 py-1 bg-[#F4FBF2] text-[#2E7D32] text-[10px] font-bold rounded border border-[#7BEA4E]/30 hover:bg-[#7BEA4E] hover:text-white transition-colors">
                           + Adjust
                         </button>
                         <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                           <MoreVertical size={16} />
                         </button>
                      </div>
                    ) : (
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-[#F8FBF8]/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500">
            Showing <span className="text-gray-900 font-bold">1 to 4</span> of <span className="text-gray-900 font-bold">{INVENTORY_DATA.length}</span> results
          </p>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-900 disabled:opacity-50">Previous</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-[#7BEA4E] text-white shadow-sm shadow-[#7BEA4E]/40">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">12</button>
            <button className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
