// @ts-nocheck
import React, { useState } from 'react';
import { Bell, Filter, Search, Check, CheckCheck, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useNotifications } from '../contexts/NotificationContext';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || notification.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortBy === 'oldest') return a.timestamp.getTime() - b.timestamp.getTime();
      if (sortBy === 'unread') return (b.read ? 0 : 1) - (a.read ? 0 : 1);
      return 0;
    });

  const unreadNotifications = filteredNotifications.filter(n => !n.read);
  const readNotifications = filteredNotifications.filter(n => n.read);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const getNotificationTypeLabel = (type: string) => {
    const labels = {
      'gig': 'Gigs',
      'message': 'Messages',
      'payment': 'Payments',
      'system': 'System',
      'application': 'Applications'
    };
    return labels[type] || type;
  };

  const NotificationCard = ({ notification, showActions = true }) => (
    <Card className={`mb-3 transition-all hover:shadow-md ${
      !notification.read ? 'border-l-4 border-l-[#FFB300] bg-[#FFB300]/5' : 'border-l-4 border-l-transparent'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                {notification.title}
              </h3>
              <Badge variant="outline" className="text-xs">
                {getNotificationTypeLabel(notification.type)}
              </Badge>
              {notification.priority === 'high' && (
                <Badge variant="destructive" className="text-xs">
                  High Priority
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mb-2">{notification.message}</p>
            <p className="text-sm text-gray-500">{formatTimeAgo(notification.timestamp)}</p>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-2 ml-4">
              {!notification.read && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark Read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('freelancer-dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#0A2239]">Notifications</h1>
              <p className="text-[#717182]">Stay updated with your gigs and messages</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFB300]/10 rounded-lg">
                    <Bell className="h-5 w-5 text-[#FFB300]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0A2239]">{notifications.length}</p>
                    <p className="text-sm text-[#717182]">Total Notifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0A2239]">{unreadCount}</p>
                    <p className="text-sm text-[#717182]">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0A2239]">{notifications.length - unreadCount}</p>
                    <p className="text-sm text-[#717182]">Read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="gig">Gigs</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="unread">Unread First</SelectItem>
              </SelectContent>
            </Select>

            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button onClick={markAllAsRead} variant="outline">
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
                <Button 
                  onClick={clearAllNotifications} 
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterType !== 'all' ? 'No matching notifications' : 'No notifications yet'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You\'ll see updates about your gigs and messages here'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All ({filteredNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="read">
                Read ({readNotifications.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredNotifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4">
              {unreadNotifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-500">All caught up! No unread notifications.</p>
                  </CardContent>
                </Card>
              ) : (
                unreadNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="read" className="space-y-4">
              {readNotifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No read notifications yet.</p>
                  </CardContent>
                </Card>
              ) : (
                readNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
