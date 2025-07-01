import React from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-lg ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  userRole: 'user' | 'agent' | 'admin';
}

export function DashboardStats({ userRole }: DashboardStatsProps) {
  const getUserStats = () => [
    {
      title: 'Total Complaints',
      value: '12',
      change: '+2.5%',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Pending',
      value: '3',
      change: '-12.3%',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      title: 'Resolved',
      value: '8',
      change: '+18.2%',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Urgent',
      value: '1',
      change: '0%',
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
    },
  ];

  const getAgentStats = () => [
    {
      title: 'Assigned Cases',
      value: '24',
      change: '+5.2%',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Active Cases',
      value: '8',
      change: '+3.1%',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      title: 'Resolved Today',
      value: '5',
      change: '+25.0%',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Urgent Cases',
      value: '2',
      change: '-33.3%',
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
    },
  ];

  const getAdminStats = () => [
    {
      title: 'Total Complaints',
      value: '1,234',
      change: '+12.5%',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Active Cases',
      value: '89',
      change: '+8.2%',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      title: 'Resolved This Month',
      value: '456',
      change: '+15.3%',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Urgent Cases',
      value: '12',
      change: '-8.7%',
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
    },
  ];

  const stats = userRole === 'user' ? getUserStats() : 
                userRole === 'agent' ? getAgentStats() : 
                getAdminStats();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}