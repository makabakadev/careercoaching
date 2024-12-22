import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../types/conversations';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!currentUserId) return;

    try {
      setLoading(true);
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          sender:profiles!sender_id(id, full_name),
          receiver:profiles!receiver_id(id, full_name)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // Ensure we have the instructor's profile
      await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', 'be28b35e-d72b-4e89-be4b-d6ae73edc184')
        .single();

      const conversationsMap = new Map<string, Conversation>();
      
      (messages as Message[])?.forEach(message => {
        const otherUserId = message.sender_id === currentUserId 
          ? message.receiver_id 
          : message.sender_id;

        if (!conversationsMap.has(otherUserId)) {
          const userProfile = message.sender_id === currentUserId 
            ? message.receiver_profile 
            : message.sender_profile;

          conversationsMap.set(otherUserId, {
            userId: otherUserId,
            lastMessage: message.content,
            lastMessageTime: message.created_at,
            userProfile: userProfile || null
          });
        }
      });

      setConversations(Array.from(conversationsMap.values()));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching conversations');
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
      const subscription = supabase
        .channel('messages')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'messages',
          filter: `or(sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId})`
        }, () => {
          fetchConversations();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentUserId, fetchConversations]);

  return {
    conversations,
    loading,
    error,
    currentUserId,
    refresh: fetchConversations
  };
}