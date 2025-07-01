import React from 'react';
import { DashboardStats } from './DashboardStats';
import { ComplaintCard } from '../Complaints/ComplaintCard';
import { useAuth } from '../../contexts/AuthContext';
import { Complaint } from '../../types';

// Mock data
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Product Quality Issue',
    description: 'The product I received has a manufacturing defect that affects its functionality.',
    category: 'Product',
    priority: 'high',
    status: 'in-progress',
    userId: '1',
    assignedAgentId: '2',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Billing Discrepancy',
    description: 'I was charged twice for the same service. Please investigate and refund the duplicate charge.',
    category: 'Billing',
    priority: 'medium',
    status: 'open',
    userId: '1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Service Outage',
    description: 'The service has been down for several hours affecting my business operations.',
    category: 'Service',
    priority: 'urgent',
    status: 'resolved',
    userId: '1',
    assignedAgentId: '2',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
];

export function Dashboard() {
  const { user } = useAuth();

  const getRecentComplaints = () => {
    if (user?.role === 'user') {
      return mockComplaints.filter(c => c.userId === user.id);
    } else if (user?.role === 'agent') {
      return mockComplaints.filter(c => c.assignedAgentId === user.id);
    } else {
      return mockComplaints.slice(0, 3);
    }
  };

  const getSectionTitle = () => {
    switch (user?.role) {
      case 'user':
        return 'My Recent Complaints';
      case 'agent':
        return 'Recently Assigned Cases';
      case 'admin':
        return 'Recent System Activity';
      default:
        return 'Recent Activity';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your {user?.role === 'admin' ? 'system' : 'complaint'} activity.
        </p>
      </div>

      <DashboardStats userRole={user?.role || 'user'} />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {getSectionTitle()}
        </h2>
        <div className="space-y-4">
          {getRecentComplaints().map((complaint) => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              showAssignedAgent={user?.role === 'admin'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}