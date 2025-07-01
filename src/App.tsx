import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SubmitComplaint } from './components/Complaints/SubmitComplaint';
import { MessageCenter } from './components/Messages/MessageCenter';
import { UserManagement } from './components/Admin/UserManagement';
import { ComplaintCard } from './components/Complaints/ComplaintCard';
import { Complaint } from './types';

// Mock complaints data
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

function MainApp() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <SubmitComplaint />;
      case 'complaints':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.role === 'admin' ? 'All Complaints' : 'My Complaints'}
            </h1>
            <div className="space-y-4">
              {mockComplaints.map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint}
                  showAssignedAgent={user?.role === 'admin'}
                />
              ))}
            </div>
          </div>
        );
      case 'assigned':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Assigned Cases</h1>
            <div className="space-y-4">
              {mockComplaints.filter(c => c.assignedAgentId === user?.id).map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        );
      case 'messages':
        return <MessageCenter />;
      case 'users':
        return <UserManagement />;
      case 'history':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Case History</h1>
            <div className="space-y-4">
              {mockComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}

export default App;