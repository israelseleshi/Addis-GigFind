// @ts-nocheck
import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck, Trash2, MessageSquare, Briefcase, DollarSign, Settings, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useNotifications, Notification } from '../contexts/NotificationContext';

function getNotificationIcon(type: string) {
  const iconMap = {
    'gig': Briefcase,
    'message': MessageSquare,
    'payment': DollarSign,
    'system': Settings,
    'application': Briefcase
  };
  return iconMap[type] || Bell;
}

function getNotificationColor(type: string) {
  const colorMap = {
    'gig': 'text-blue-600',
    'message': 'text-green-600',
    'payment': 'text-yellow-600',
    'system': 'text-gray-600',
    'application': 'text-purple-600'
  };
  return colorMap[type] || 'text-gray-600';
}

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onNavigate?: (url: string) => void;
}

function NotificationItem({ notification, onMarkAsRead, onRemove, onNavigate }: NotificationItemProps) {
  const IconComponent = getNotificationIcon(notification.type);
  const iconColor = getNotificationColor(notification.type);

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl);
    }
  };

  return (
    <div
      className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
        notification.read 
          ? 'border-l-transparent bg-white' 
          : 'border-l-[#FFB300] bg-[#FFB300]/5'
      } ${notification.priority === 'high' ? 'ring-1 ring-red-100' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.avatar ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>
                <IconComponent className={`h-4 w-4 ${iconColor}`} />
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className={`p-2 rounded-full bg-gray-100`}>
              <IconComponent className={`h-4 w-4 ${iconColor}`} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                {notification.title}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(notification.timestamp)}
                </span>
                {notification.priority === 'high' && (
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    High
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                >
                  <Check className="h-3 w-3 text-blue-600" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(notification.id);
                }}
              >
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationDropdownProps {
  onNavigate?: (page: string) => void;
}

export function NotificationDropdown({ onNavigate }: NotificationDropdownProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    if (onNavigate) {
      // Convert URL to page navigation
      if (url.includes('messages')) onNavigate('messages');
      else if (url.includes('gig-details')) onNavigate('freelancer-dashboard');
      else if (url.includes('profile')) onNavigate('profile');
      else if (url.includes('payments')) onNavigate('freelancer-dashboard');
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#E74C3C] text-white border-none">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0 mr-4" align="end">
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-[#FFB300] text-[#0A2239]">
                    {unreadCount} new
                  </Badge>
                )}
                {notifications.length > 0 && (
                  <div className="flex gap-1">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={markAllAsRead}
                      >
                        <CheckCheck className="h-3 w-3 mr-1" />
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={clearAllNotifications}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
                <p className="text-gray-400 text-xs mt-1">
                  You'll see updates about your gigs and messages here
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <NotificationItem
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onRemove={removeNotification}
                      onNavigate={handleNavigate}
                    />
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
            
            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="p-3">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-[#0A2239] hover:bg-[#FFB300]/10"
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigate) onNavigate('notifications');
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
