import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageCircle, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';

export function BottomNavigation() {
  const location = useLocation();
  const { user, unreadMessages, unreadNotifications } = useAuth();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/messages', icon: MessageCircle, label: 'Messages', count: unreadMessages },
    { path: '/notifications', icon: Bell, label: 'Notifications', count: unreadNotifications },
    { path: user ? `/profile/${user.id}` : '/profile/1', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="mobile-nav">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center ultra-touch relative transition-all duration-150 min-w-[60px]',
                isActive ? 'text-accent' : 'text-gray-400'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center bg-accent rounded-full text-[8px] font-medium text-white"
                  >
                    {item.count}
                  </motion.span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}