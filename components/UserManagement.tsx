
import React, { useState } from 'react';
import { Plus, MoreVertical, Shield, UserX, Key, Mail, X, Check, AlertTriangle } from 'lucide-react';
import { USERS_DATA, COLORS } from '../constants';
import { UserRole, UserStatus, AppUser } from '../types';

type ModalMode = 'add' | 'edit' | 'delete' | 'none';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>(USERS_DATA);
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: UserRole.VIEWER,
    title: '',
    status: UserStatus.ACTIVE
  });

  const openModal = (mode: ModalMode, user?: AppUser) => {
    setModalMode(mode);
    setIsConfirming(false);
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        status: user.status
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        role: UserRole.VIEWER,
        title: '',
        status: UserStatus.ACTIVE
      });
    }
  };

  const closeModal = () => {
    setModalMode('none');
    setSelectedUser(null);
    setIsConfirming(false);
  };

  const handleAction = () => {
    if (!isConfirming && (modalMode === 'add' || modalMode === 'edit' || modalMode === 'delete')) {
      setIsConfirming(true);
      return;
    }

    // Final Execution
    if (modalMode === 'delete' && selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
    } else if (modalMode === 'add') {
      const newUser: AppUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lastActive: 'Just now',
        avatar: `https://picsum.photos/seed/${formData.name}/100/100`,
        title: formData.title
      };
      setUsers([newUser, ...users]);
    } else if (modalMode === 'edit' && selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    }

    closeModal();
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      <div className="flex items-center space-x-2 text-[14px] font-medium mb-8">
        <span className="text-emerald-600/70 hover:text-emerald-600 cursor-pointer">Settings</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#0F172A]">User Management</span>
      </div>

      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight leading-none">User Management</h1>
          <p className="text-[15px] text-gray-400 mt-3 font-medium">
            Manage user accounts, roles, and system access permissions.
          </p>
        </div>
        <button 
          onClick={() => openModal('add')}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#22C55E] text-white font-bold hover:bg-[#1ea34d] transition-all shadow-lg shadow-[#22C55E]/20"
        >
          <Plus size={20} />
          <span>Add New User</span>
        </button>
      </header>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FBFA] text-[11px] font-bold text-[#166534]/60 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Email Address</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Last Active</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden shadow-sm">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                        <p className="text-[12px] text-gray-400 mt-1.5">{user.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium">
                      <Mail size={14} className="text-gray-300" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      user.role === UserRole.ADMIN ? 'bg-indigo-50 text-indigo-600' :
                      user.role === UserRole.MANAGER ? 'bg-emerald-50 text-emerald-600' :
                      user.role === UserRole.FINANCE ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[11px] font-bold flex items-center space-x-1.5 ${user.status === UserStatus.ACTIVE ? 'text-emerald-500' : 'text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === UserStatus.ACTIVE ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                      <span>{user.status}</span>
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                    {user.lastActive}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openModal('edit', user)}
                        className="p-2 text-gray-400 hover:text-[#22C55E] hover:bg-emerald-50 rounded-lg transition-all" 
                        title="Edit User"
                      >
                        <Shield size={18} />
                      </button>
                      <button 
                        onClick={() => openModal('delete', user)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" 
                        title="Delete User"
                      >
                        <UserX size={18} />
                      </button>
                      <MoreVertical size={18} className="text-gray-300 cursor-pointer ml-2" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Backdrop */}
      {modalMode !== 'none' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F172A]">
                {modalMode === 'add' && 'Add New User'}
                {modalMode === 'edit' && 'Edit User Details'}
                {modalMode === 'delete' && 'Delete User Account'}
              </h3>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isConfirming ? (
                <div className="text-center py-4">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modalMode === 'delete' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {modalMode === 'delete' ? <AlertTriangle size={32} /> : <Check size={32} />}
                  </div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2">Final Confirmation</h4>
                  <p className="text-gray-500 text-sm mb-8">
                    {modalMode === 'delete' 
                      ? `Are you sure you want to permanently delete ${selectedUser?.name}? This action cannot be undone.`
                      : `You are about to ${modalMode} ${formData.name}. Please confirm to save these changes.`}
                  </p>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setIsConfirming(false)}
                      className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleAction}
                      className={`flex-1 py-3 px-4 text-white font-bold rounded-xl transition-all shadow-lg ${modalMode === 'delete' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 'bg-[#22C55E] hover:bg-[#1ea34d] shadow-emerald-200'}`}
                    >
                      Confirm & Proceed
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {modalMode === 'delete' ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-6">Are you sure you want to remove <strong>{selectedUser?.name}</strong> from the system?</p>
                      <div className="flex items-center space-x-3">
                        <button onClick={closeModal} className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50">Cancel</button>
                        <button onClick={handleAction} className="flex-1 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 shadow-lg shadow-rose-200">Delete User</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="email@riceco.com"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Role</label>
                          <select 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20"
                          >
                            {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                          <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as UserStatus})}
                            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20"
                          >
                            {Object.values(UserStatus).map(status => <option key={status} value={status}>{status}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Job Title</label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="e.g. Sales Executive"
                          className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#22C55E]/20"
                        />
                      </div>
                      <div className="pt-4">
                        <button 
                          onClick={handleAction}
                          disabled={!formData.name || !formData.email}
                          className="w-full py-3.5 bg-[#22C55E] text-white font-bold rounded-xl hover:bg-[#1ea34d] transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {modalMode === 'add' ? 'Add User Account' : 'Save Changes'}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
