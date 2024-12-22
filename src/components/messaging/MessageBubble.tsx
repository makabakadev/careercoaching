import { formatDistanceToNow } from '../../utils/dateUtils';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  sender_profile: {
    full_name: string | null;
  };
  receiver_profile: {
    full_name: string | null;
  };
}

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const displayName = isCurrentUser 
    ? 'You'
    : message.sender_profile?.full_name || 'Anonymous';

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${
        isCurrentUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-800 text-gray-300'
      } p-4 rounded-lg`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`font-medium ${isCurrentUser ? 'text-white' : 'text-blue-400'}`}>
            {displayName}
          </span>
          <span className="text-sm text-gray-400 ml-4">
            {formatDistanceToNow(new Date(message.created_at))}
          </span>
        </div>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}