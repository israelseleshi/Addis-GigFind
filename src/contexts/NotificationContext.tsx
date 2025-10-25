// @ts-nocheck
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'gig' | 'message' | 'payment' | 'system' | 'application';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'gig',
    title: 'New Gig Application',
    message: 'Sarah M. applied for your "Website Design" gig',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    actionUrl: '/gig-details/1',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    priority: 'high'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'John D. sent you a message about the tutoring gig',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    actionUrl: '/messages/2',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received 2,500 ETB for "Logo Design" project',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    actionUrl: '/payments',
    priority: 'high'
  },
  {
    id: '4',
    type: 'gig',
    title: 'Gig Completed',
    message: 'Your "Photography Session" gig has been marked as completed',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    actionUrl: '/gig-details/4',
    priority: 'medium'
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Update',
    message: 'Your profile has been successfully updated',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: '/profile',
    priority: 'low'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
