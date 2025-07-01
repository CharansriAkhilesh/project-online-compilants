import React from 'react';
import { 
  Home, 
  Plus, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings,
  BarChart3,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user } = useAuth();

  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'submit', label: 'Submit Complaint', icon: Plus },
    { id: 'complaints', label: 'My Complaints', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const agentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assigned', label: 'Assigned Cases', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'history', label: 'Case History', icon: Clock },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'complaints', label: 'All Complaints', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'agent':
        return agentMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return userMenuItems;
    }
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <nav className="mt-8">
        <div className="px-4">
          <ul className="space-y-2">
            {getMenuItems().map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}