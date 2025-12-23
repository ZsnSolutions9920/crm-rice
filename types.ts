
export enum InventoryStatus {
  IN_STOCK = 'In Stock',
  MODERATE = 'Moderate',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

export enum PayableStatus {
  DUE_SOON = 'Due Soon',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
  SCHEDULED = 'Scheduled'
}

export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  FINANCE = 'Finance',
  INVENTORY = 'Inventory',
  VIEWER = 'Viewer'
}

export enum UserStatus {
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended'
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  avatar: string;
  title: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'PKR' | 'AED';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD base
  label: string;
}

export interface Payable {
  id: string;
  vendor: string;
  reference: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: PayableStatus;
}

export interface StockLevel {
  name: string;
  quantity: number;
  status: string;
  percentage: number;
  color: string;
}

export enum TransactionStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  packSize: string;
  category: string;
  warehouse: string;
  stockPercentage: number;
  currentQuantity: number;
  maxQuantity: number;
  available: number;
  incoming?: number;
  reorderPoint: number;
  unitPrice: number;
  supplier: string;
  status: InventoryStatus;
  image: string;
}
