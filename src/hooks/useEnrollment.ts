import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Course } from '../data/courses';

export function useEnrollment() {
  const [loading, setLoading] = useState(false);

  const isEnrolled = async (courseId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      return false;
    }
  };

  const enrollInCourse = async (course: Course) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    isEnrolled,
    enrollInCourse,
    loading
  };
}