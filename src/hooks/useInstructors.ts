import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/conversations';

export function useInstructors() {
  const [instructors, setInstructors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructors();
  }, []);

  async function fetchInstructors() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', 'be28b35e-d72b-4e89-be4b-d6ae73edc184');

      if (error) throw error;
      setInstructors(data || []);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  }

  return { instructors, loading };
}