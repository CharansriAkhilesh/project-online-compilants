import React, { useState } from 'react';
import { Send, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    complaintId: '1',
    senderId: '2',
    senderName: 'Sarah Agent',
    senderRole: 'agent',
    content: 'Hello! I\'ve been assigned to handle your complaint regarding the product quality issue. I\'ve reviewed the details and will start investigating immediately.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    complaintId: '1',
    senderId: '1',
    senderName: 'John Doe',
    senderRole: 'user',
    content: 'Thank you for taking this on. The defect is quite noticeable and affects the product\'s main functionality. I can provide additional photos if needed.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: '3',
    complaintId: '1',
    senderId: '2',
    senderName: 'Sarah Agent',
    senderRole: 'agent',
    content: 'Additional photos would be very helpful. Please upload them to the complaint thread. I\'ve also contacted our quality assurance team to investigate this batch.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export function MessageCenter() {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      complaintId: '1',
      senderId: user?.id || '1',
      senderName: user?.name || 'User',
      senderRole: user?.role === 'agent' ? 'agent' : 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            Messages - Complaint #CNT-000001
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Product Quality Issue
          </p>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.senderId === user?.id
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.senderRole === 'agent' 
                      ? 'bg-orange-100 text-orange-600' 
                      : message.senderId === user?.id 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    <User className="h-3 w-3" />
                  </div>
                  <span className={`text-xs font-medium ${
                    message.senderId === user?.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {message.senderName}
                  </span>
                  <span className={`text-xs ${
                    message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    ({message.senderRole})
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`flex items-center mt-2 text-xs ${
                  message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}