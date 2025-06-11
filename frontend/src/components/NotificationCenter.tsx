import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellOff,
  Check,
  Trash2,
  ShoppingCart,
  Star,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  data?: Record<string, any>;
}

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], refetch } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/notifications/');
      return response.data;
    },
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const response = await api.get('/notifications/unread-count');
      return response.data.count;
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      await api.put('/notifications/mark-all-read');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });

  const deleteNotification = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ORDER_RECEIVED':
      case 'ORDER_STATUS_CHANGED':
        return <ShoppingCart className="w-5 h-5" />;
      case 'NEW_REVIEW':
        return <Star className="w-5 h-5" />;
      case 'LOW_STOCK':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        {unreadCount > 0 ? (
          <Bell className="w-6 h-6" />
        ) : (
          <BellOff className="w-6 h-6" />
        )}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Уведомления</h3>
              {notifications.length > 0 && (
                <button
                  onClick={() => markAllAsRead.mutate()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Отметить все как прочитанные
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Нет уведомлений
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 ${
                    !notification.is_read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                          locale: ru,
                        })}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      {!notification.is_read && (
                        <button
                          onClick={() => markAsRead.mutate(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification.mutate(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 