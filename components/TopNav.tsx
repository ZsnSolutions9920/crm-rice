
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Tractor, Settings, Globe, LogOut, ChevronDown } from 'lucide-react';
import { TOP_NAV_LINKS, CURRENCIES, USERS_DATA } from '../constants';
import { Currency } from '../types';

interface TopNavProps {
  currentView: string;
  onViewChange: (view: any) => void;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const TopNav: React.FC<TopNavProps> = ({ currentView, onViewChange, selectedCurrency, onCurrencyChange }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const user = USERS_DATA[0]; // Active user

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="h-[72px] bg-white border-b border-gray-100 sticky top-0 z-50 px-8 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center space-x-3 mr-12 cursor-pointer" onClick={() => onViewChange('dashboard')}>
        <div className="p-1.5 bg-[#22C55E] rounded-md shadow-sm">
          <Tractor size={20} className="text-white fill-current" />
        </div>
        <span className="font-bold text-[#0F172A] text-xl tracking-tight">Rice CRM</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22C55E] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search invoices, clients..."
            className="w-full bg-[#F1F5F9] border-none rounded-lg py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#22C55E]/20 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Links & Profile */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center mr-6">
          {TOP_NAV_LINKS.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onViewChange(link.id as any)}
                className={`px-4 py-2 text-[14px] font-semibold transition-colors ${
                  isActive ? 'text-[#22C55E]' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-4 pl-6 border-l border-gray-100">
          {/* Currency Switcher Dropdown */}
          <div className="relative" ref={currencyDropdownRef}>
            <button 
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[13px] font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Globe size={14} className="text-gray-400" />
              <span>{selectedCurrency.code}</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Currency</p>
                <div className="px-2 space-y-1">
                  {CURRENCIES.map(curr => (
                    <button 
                      key={curr.code}
                      onClick={() => { onCurrencyChange(curr); setIsCurrencyOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${selectedCurrency.code === curr.code ? 'bg-[#22C55E] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2 opacity-60">{curr.code}</span>
                        <span>{curr.label}</span>
                      </span>
                      <span>{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="relative p-2 text-[#0F172A] hover:bg-gray-50 rounded-full transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1 pl-1 pr-2 hover:bg-gray-50 rounded-full transition-all border border-transparent hover:border-gray-100"
            >
              <div className="w-9 h-9 rounded-full border-2 border-[#22C55E] p-0.5 shadow-sm overflow-hidden bg-gray-100">
                <img src={user.avatar} alt="User" className="w-full h-full object-cover rounded-full" />
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                  <p className="text-sm font-bold text-[#0F172A]">{user.name}</p>
                  <p className="text-[12px] text-gray-400 font-medium">{user.email}</p>
                </div>

                <button onClick={() => { onViewChange('users'); setIsProfileOpen(false); }} className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#F0FDF4] hover:text-[#22C55E] transition-colors">
                  <Settings size={18} />
                  <span>User Management</span>
                </button>
                
                <div className="border-t border-gray-50 mt-2 pt-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
