import { MessageSquare } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
      <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
      <h3 className="text-xl font-medium mb-2">No messages yet</h3>
      <p className="text-center text-sm">
        Start a conversation with your instructors or send a support request
      </p>
    </div>
  );
}