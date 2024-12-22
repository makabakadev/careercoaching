export interface User {
  id: string;
  full_name: string | null;
}

export interface Conversation {
  userId: string;
  lastMessage?: string;
  lastMessageTime?: string;
  userProfile?: User;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender_profile?: User;
  receiver_profile?: User;
}