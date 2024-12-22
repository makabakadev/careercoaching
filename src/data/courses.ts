export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Career Planning Fundamentals',
    description: 'Learn the essential steps to plan and develop your career path',
    instructor: 'Dr. Sarah Johnson',
    duration: '6 weeks',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    title: 'Professional Networking Mastery',
    description: 'Build and maintain meaningful professional relationships',
    instructor: 'Michael Chen',
    duration: '4 weeks',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    title: 'Interview Success Strategies',
    description: 'Master the art of interviewing and land your dream job',
    instructor: 'Emma Rodriguez',
    duration: '3 weeks',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&q=80&w=600',
  },
];