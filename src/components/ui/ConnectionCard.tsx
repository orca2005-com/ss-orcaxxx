import React, { useState } from 'react';
import { UserPlus, Check, X, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';

interface Connection {
  id: string;
  name: string;
  role: string;
  avatar: string;
  mutualConnections?: number;
}

interface ConnectionCardProps {
  connection: Connection;
  onFollow?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  showMutualConnections?: boolean;
  showDismiss?: boolean;
  index?: number;
}

export function ConnectionCard({
  connection,
  onFollow,
  onDismiss,
  onViewProfile,
  showMutualConnections = true,
  showDismiss = true,
  index = 0
}: ConnectionCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(true);
    
    // Simulate follow process
    setTimeout(() => {
      setIsFollowing(false);
      setIsFollowed(true);
      onFollow?.(connection.id);
    }, 2000);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.(connection.id);
  };

  const handleViewProfile = () => {
    onViewProfile?.(connection.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card hover className="group relative">
        {showDismiss && onDismiss && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
            title="Dismiss suggestion"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}

        <div className="flex items-start space-x-4">
          <Avatar
            src={connection.avatar}
            alt={connection.name}
            size="lg"
            onClick={handleViewProfile}
            priority={index < 2}
          />

          <div className="flex-1 min-w-0">
            <button
              onClick={handleViewProfile}
              className="block w-full text-left group/profile"
            >
              <h3 className="font-semibold text-white group-hover/profile:text-accent transition-colors duration-200 truncate text-sm md:text-base">
                {connection.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 mb-2 truncate">
                {connection.role}
              </p>
            </button>

            {showMutualConnections && connection.mutualConnections !== undefined && (
              <div className="mb-3">
                <Badge variant="default" icon={Users} size="sm">
                  {connection.mutualConnections} mutual
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between">
              {isFollowed ? (
                <Badge variant="success" icon={Check}>
                  Following
                </Badge>
              ) : isFollowing ? (
                <Badge variant="info">
                  <div className="w-2.5 h-2.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                  Following...
                </Badge>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={UserPlus}
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewProfile}
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}