import type { Conversation } from '../../types/conversations';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useUserProfile } from '../../hooks/useUserProfile';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const { profile } = useUserProfile(conversation.userId);
  const displayName = profile?.full_name || conversation.userProfile?.full_name || 'Anonymous';
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
        isSelected ? 'bg-gray-800' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">
            {displayName[0] || 'A'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-gray-300 font-medium truncate">
            {displayName}
          </div>
          {conversation.lastMessage && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 truncate mr-2">
                {conversation.lastMessage}
              </p>
              {conversation.lastMessageTime && (
                <span className="text-xs text-gray-600">
                  {formatDistanceToNow(new Date(conversation.lastMessageTime))}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}