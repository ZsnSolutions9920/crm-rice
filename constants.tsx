
import React from 'react';
import { LayoutDashboard, Box, Banknote, Receipt, BarChart3, Users, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { PayableStatus, InventoryStatus, UserRole, UserStatus, AppUser, Currency, InventoryItem } from './types';

export const COLORS = {
  primaryGreen: '#7BEA4E', 
  brandGreen: '#22C55E', 
  darkGreenText: '#166534',
  lightGreenBG: '#F0FDF4',
  aiInsightBG: '#F1FBED',
  warningYellow: '#FACC15',
  dangerRed: '#EF4444',
  mutedGray: '#64748B',
  textDark: '#0F172A',
  pageBG: '#F8FAFC',
};

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1, label: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'British Pound' },
  { code: 'PKR', symbol: '₨', rate: 278.50, label: 'Pakistani Rupee' },
  { code: 'AED', symbol: 'د.إ', rate: 3.67, label: 'UAE Dirham' },
];

export const USERS_DATA: AppUser[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@riceco.com',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    lastActive: '2 mins ago',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    title: 'System Administrator'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 's.chen@riceco.com',
    role: UserRole.FINANCE,
    status: UserStatus.ACTIVE,
    lastActive: '1 hour ago',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    title: 'Financial Controller'
  },
  {
    id: '3',
    name: 'Michael Ross',
    email: 'm.ross@riceco.com',
    role: UserRole.MANAGER,
    status: UserStatus.ACTIVE,
    lastActive: '3 hours ago',
    avatar: 'https://picsum.photos/seed/mike/100/100',
    title: 'Logistics Manager'
  }
];

export const TOP_NAV_LINKS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'payables', label: 'Payables' },
  { id: 'receivables', label: 'Receivables' },
  { id: 'reports', label: 'Reports' },
];

export const AI_INSIGHTS = [
  {
    id: 1,
    type: 'growth',
    icon: TrendingUp,
    iconColor: 'text-emerald-500',
    headline: 'Revenue Growth Detected',
    description: 'Revenue increased by 8.4% compared to last month, primarily driven by Basmati Premium sales in the Punjab region.',
    action: 'View Details',
    link: '#',
  },
  {
    id: 2,
    type: 'risk',
    icon: AlertTriangle,
    iconColor: 'text-rose-500',
    headline: 'Rising Expense Alert',
    description: 'Logistics costs rose 14% this month, exceeding the normal operating range due to fuel price adjustments.',
    action: 'Review Logistics',
    link: '#',
  }
];

export const INVENTORY_DATA: InventoryItem[] = [
  {
    id: '1',
    sku: 'RIC-BAS-001',
    name: 'Basmati Premium',
    packSize: '50kg',
    category: 'Long Grain',
    warehouse: 'Punjab Main',
    stockPercentage: 80,
    currentQuantity: 800,
    maxQuantity: 1000,
    available: 750,
    incoming: 200,
    reorderPoint: 300,
    unitPrice: 85.00,
    supplier: 'Himalayan Agri',
    status: InventoryStatus.IN_STOCK,
    image: 'https://picsum.photos/seed/rice1/100/100'
  },
  {
    id: '2',
    sku: 'RIC-JAS-002',
    name: 'Jasmine AAA',
    packSize: '25kg',
    category: 'Aromatic',
    warehouse: 'Karachi Central',
    stockPercentage: 60,
    currentQuantity: 600,
    maxQuantity: 1000,
    available: 580,
    incoming: 0,
    reorderPoint: 250,
    unitPrice: 72.50,
    supplier: 'Asian Rice Hub',
    status: InventoryStatus.MODERATE,
    image: 'https://picsum.photos/seed/rice2/100/100'
  },
  {
    id: '3',
    sku: 'RIC-WHT-003',
    name: 'Long Grain White',
    packSize: '50kg',
    category: 'Standard',
    warehouse: 'Punjab Main',
    stockPercentage: 25,
    currentQuantity: 250,
    maxQuantity: 1000,
    available: 220,
    incoming: 500,
    reorderPoint: 400,
    unitPrice: 45.00,
    supplier: 'Standard Grains Co.',
    status: InventoryStatus.LOW_STOCK,
    image: 'https://picsum.photos/seed/rice3/100/100'
  },
  {
    id: '4',
    sku: 'RIC-ARB-004',
    name: 'Arborio',
    packSize: '20kg',
    category: 'Short Grain',
    warehouse: 'Lahore East',
    stockPercentage: 40,
    currentQuantity: 160,
    maxQuantity: 400,
    available: 150,
    incoming: 0,
    reorderPoint: 200,
    unitPrice: 110.00,
    supplier: 'Euro Grains Importers',
    status: InventoryStatus.LOW_STOCK,
    image: 'https://picsum.photos/seed/rice4/100/100'
  }
];

export const CHART_DATA = [
  { name: 'May', income: 4500000, expenses: 3200000 },
  { name: 'Jun', income: 5200000, expenses: 3800000 },
  { name: 'Jul', income: 4800000, expenses: 4100000 },
  { name: 'Aug', income: 6100000, expenses: 4200000 },
  { name: 'Sep', income: 5900000, expenses: 4500000 },
  { name: 'Oct', income: 7200000, expenses: 4800000 },
];

export const REPORT_CHART_DATA = [
  { name: 'Week 1', revenue: 4200000, expenses: 3100000 },
  { name: 'Week 2', revenue: 4800000, expenses: 3400000 },
  { name: 'Week 3', revenue: 5100000, expenses: 3200000 },
  { name: 'Week 4', revenue: 5900000, expenses: 4100000 },
];

export const EXPENSE_BREAKDOWN = [
  { name: 'Logistics', value: 45, color: '#22C55E' },
  { name: 'Packaging', value: 25, color: '#FACC15' },
  { name: 'Labor', value: 20, color: '#3B82F6' },
  { name: 'Marketing', value: 10, color: '#EF4444' },
];

export const RECEIVABLES_DATA = [
  {
    id: '#INV-2023-001',
    customer: 'Golden Grains',
    customerType: 'Wholesaler',
    initials: 'GG',
    avatarColor: 'bg-orange-100 text-orange-600',
    product: 'Jasmine Rice (Premium)',
    quantity: '2.5 Tons',
    dueDate: 'Oct 24, 2023',
    amount: 4500.00,
    status: 'Overdue'
  }
];

export const PAYABLES_DATA = [
  {
    id: '#INV-2024-001',
    vendor: 'Basmati Bros Ltd.',
    reference: 'Long Grain Batch A2',
    issueDate: 'Oct 24, 2024',
    dueDate: 'Oct 31, 2024',
    amount: 12500.00,
    status: PayableStatus.DUE_SOON,
  }
];
