
import React, { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Download,
  Wallet,
  TrendingUp,
  FileText,
  Calendar,
  Search,
  Box,
  Truck,
  CreditCard,
  Globe,
  Upload,
  History,
  Filter,
  X,
  Package,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import TopNav from './components/TopNav';
import ReceivablesTable from './components/ReceivablesTable';
import PayablesTable from './components/PayablesTable';
import InventoryTable from './components/InventoryTable';
import CashFlowChart from './components/CashFlowChart';
import StockLevels from './components/StockLevels';
import ActivityTable from './components/ActivityTable';
import StatCard from './components/StatCard';
import AIInsights from './components/AIInsights';
import UserManagement from './components/UserManagement';
import { PerformanceChart, ExpenseBreakdownChart } from './components/ReportsCharts';
import { CURRENCIES } from './constants';
import { Currency } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'inventory' | 'payables' | 'receivables' | 'reports' | 'users' | 'profile'>('dashboard');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Global currency formatting utility
  const formatValue = (usdAmount: number) => {
    const converted = usdAmount * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight">Dashboard Overview</h1>
          <p className="text-[15px] text-gray-400 mt-1 font-medium">Financial health and inventory status</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-[#F1FBED] rounded-lg border border-[#22C55E]/10 text-[12px] font-bold text-[#166534]">
            <Globe size={14} />
            <span>Currency: {selectedCurrency.label}</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white rounded-lg text-sm font-bold text-[#64748B] border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar size={18} className="text-gray-400" />
            <span>This Month</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Wallet}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="+12% vs last wk"
          badgeType="success"
          title="Total Receivables"
          value={formatValue(44700)} 
          subtext={`+${formatValue(4300)} collected this week`}
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          badge="3 Due Soon"
          badgeType="warning"
          title="Total Payables"
          value={formatValue(16230)}
          subtext="Next due date: Oct 24"
        />
        <StatCard
          icon={Box}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          badge="Stable"
          badgeType="info"
          title="Inventory Value"
          value={formatValue(114800)}
          subtext="Total 450 Tons in stock"
        />
        <StatCard
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="+15%"
          badgeType="success"
          title="Net Cash Flow"
          value={`+${formatValue(28470)}`}
          subtext="Healthy margin"
        />
      </div>

      <div className="grid grid-cols-10 gap-6 mb-8">
        <div className="col-span-7">
          <CashFlowChart />
        </div>
        <div className="col-span-3">
          <StockLevels />
        </div>
      </div>

      <ActivityTable formatValue={formatValue} />
    </div>
  );

  const renderInventoryManagement = () => (
    <div className="animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-[13px] font-medium text-emerald-600/70 mb-4">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span>Inventory</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#0F172A]">Stock Levels</span>
      </nav>

      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-[#0F172A] tracking-tight leading-none">Inventory Management</h1>
          <p className="text-[15px] text-gray-400 mt-3 font-medium">
            Manage stock levels, SKUs, warehouses, and replenishment efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-sm">
            <History size={18} />
            <span>History Log</span>
          </button>
          <button className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-sm">
            <Upload size={18} />
            <span>Import CSV</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-[#22C55E] text-white font-bold hover:bg-[#1ea34d] transition-all shadow-lg shadow-emerald-100 text-sm"
          >
            <Plus size={18} />
            <span>Add Inventory</span>
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Box}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="Live Value"
          badgeType="success"
          title="Total Stock Value"
          value={formatValue(320000)}
          subtext="Across all warehouses"
        />
        <StatCard
          icon={Package}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          badge="450 Tons"
          badgeType="info"
          title="Total Units"
          value="9,000 Sacks"
          subtext="50kg avg. weight"
        />
        <StatCard
          icon={AlertTriangle}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          badge="Urgent"
          badgeType="warning"
          title="Low Stock Alerts"
          value="4 SKUs"
          subtext="Need replenishment"
        />
        <StatCard
          icon={Truck}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          badge="En route"
          badgeType="info"
          title="Pending Shipments"
          value="720 Sacks"
          subtext="Estimated arrival: 2 days"
        />
      </div>

      {/* Enhanced Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 flex items-center justify-between">
        <div className="flex-1 max-w-md relative mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by SKU, product name, warehouse..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#22C55E]/20"
          />
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-[#F8FAFC] border-none rounded-lg py-2 px-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#22C55E]/20">
            <option>All Categories</option>
            <option>Long Grain</option>
            <option>Aromatic</option>
            <option>Short Grain</option>
          </select>
          <select className="bg-[#F8FAFC] border-none rounded-lg py-2 px-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#22C55E]/20">
            <option>All Warehouses</option>
            <option>Punjab Main</option>
            <option>Karachi Central</option>
          </select>
          <select className="bg-[#F8FAFC] border-none rounded-lg py-2 px-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-[#22C55E]/20">
            <option>All Statuses</option>
            <option>In Stock</option>
            <option>Low Stock</option>
          </select>
          <div className="h-6 w-px bg-gray-200 mx-1" />
          <div className="flex items-center space-x-2 mr-2">
             <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute left-0 w-4 h-4 bg-white rounded-full shadow-sm border border-gray-100" />
             </div>
             <span className="text-[11px] font-bold text-gray-500">Low Stock Only</span>
          </div>
          <button className="p-2 bg-[#F8FAFC] text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <InventoryTable formatValue={formatValue} />

      {/* Add Inventory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">Add New Inventory Item</h3>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the product and stock details below.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Product Name</label>
                  <input type="text" placeholder="e.g. Basmati Special Reserve" className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">SKU</label>
                  <input type="text" placeholder="RIC-BAS-005" className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20">
                    <option>Long Grain</option>
                    <option>Aromatic</option>
                    <option>Short Grain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Warehouse</label>
                  <select className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20">
                    <option>Punjab Main</option>
                    <option>Karachi Central</option>
                    <option>Lahore East</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Initial Stock (Sacks)</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Reorder Point</label>
                  <input type="number" placeholder="100" className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Unit Price</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 bg-[#F8FAFC] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20" />
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 border border-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button className="flex-1 py-3.5 border border-[#22C55E] text-[#22C55E] font-bold rounded-xl hover:bg-emerald-50 transition-all">
                  Save & Add Another
                </button>
                <button className="flex-[1.5] py-3.5 bg-[#22C55E] text-white font-bold rounded-xl hover:bg-[#1ea34d] transition-all shadow-lg shadow-emerald-100">
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-[#22C55E]/30">
        <FileText size={40} />
      </div>
      <h2 className="text-2xl font-bold text-[#0F172A]">{title}</h2>
      <p className="text-gray-400 mt-2 max-w-sm font-medium">
        This account setting is currently under construction. Please check back later for full functionality.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return renderDashboard();
      case 'inventory': return renderInventoryManagement();
      case 'payables': return <div className="animate-in fade-in duration-500 py-6"><PayablesTable formatValue={formatValue} /></div>;
      case 'receivables': return <div className="animate-in fade-in duration-500 py-6"><ReceivablesTable formatValue={formatValue} /></div>;
      case 'reports': return <div className="animate-in fade-in duration-500 py-6">{renderReports()}</div>;
      case 'users': return <div className="animate-in fade-in duration-500 py-6"><UserManagement /></div>;
      case 'profile': return <div className="animate-in fade-in duration-500 py-6">{renderPlaceholder('Profile & Account')}</div>;
      default: return renderDashboard();
    }
  };

  const renderReports = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center space-x-2 text-[14px] font-medium mb-8">
        <span className="text-emerald-600/70 hover:text-emerald-600 cursor-pointer">Home</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#0F172A]">Reports & Analytics</span>
      </div>

      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight leading-none">Reports & Analytics</h1>
          <p className="text-[15px] text-gray-400 mt-3 font-medium">
            AI-powered insights and performance analytics for smarter decisions.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white rounded-lg text-sm font-bold text-[#64748B] border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar size={18} className="text-gray-400" />
            <span>Oct 1 - Oct 31, 2023</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          <button className="flex items-center space-x-2 px-6 py-2.5 rounded-lg border border-[#22C55E] text-[#22C55E] font-bold hover:bg-emerald-50 transition-all">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </header>

      <AIInsights />

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="col-span-2">
          <PerformanceChart />
        </div>
        <div className="col-span-1">
          <ExpenseBreakdownChart />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopNav 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />
      <main className="max-w-[1440px] mx-auto px-10 py-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
