import React from 'react';
import { Clock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Complaint } from '../../types';

interface ComplaintCardProps {
  complaint: Complaint;
  onClick?: () => void;
  showAssignedAgent?: boolean;
}

export function ComplaintCard({ complaint, onClick, showAssignedAgent = false }: ComplaintCardProps) {
  const getStatusIcon = () => {
    switch (complaint.status) {
      case 'open':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'closed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (complaint.status) {
      case 'open':
        return 'text-blue-600 bg-blue-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'closed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getPriorityColor = () => {
    switch (complaint.priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {complaint.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {complaint.description}
          </p>
        </div>
        <div className="ml-4 flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor()}`}>
            {complaint.priority}
          </span>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center">
            <span className="font-medium text-gray-700">#{complaint.id.slice(-6)}</span>
          </span>
          <span className="inline-flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {formatDistanceToNow(complaint.createdAt, { addSuffix: true })}
          </span>
          {showAssignedAgent && complaint.assignedAgentId && (
            <span className="inline-flex items-center">
              <User className="mr-1 h-4 w-4" />
              Agent #{complaint.assignedAgentId.slice(-4)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
            {complaint.category}
          </span>
        </div>
      </div>
    </div>
  );
}