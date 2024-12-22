import { Clock, BookOpen, Star } from 'lucide-react';
import { Course } from '../../data/courses';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onAction: (course: Course) => void;
  loading: boolean;
}

export default function CourseCard({ course, isEnrolled, onAction, loading }: CourseCardProps) {
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500 bg-opacity-20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500 bg-opacity-20 text-yellow-400';
      default:
        return 'bg-red-500 bg-opacity-20 text-red-400';
    }
  };

  return (
    <div className="course-card">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm px-3 py-1 rounded-full ${getLevelStyle(course.level)}`}>
            {course.level}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">4.9</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>10 Lessons</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          <button
            onClick={() => onAction(course)}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 disabled:opacity-50"
          >
            {isEnrolled ? 'Go to Course' : 'Enroll'}
          </button>
        </div>
      </div>
    </div>
  );
}