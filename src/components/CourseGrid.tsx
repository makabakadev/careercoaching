import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import type { Course } from '../types/course';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    if (course.isLocked) {
      return;
    }
    navigate(`/dashboard/course/${course.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <div
          key={course.id}
          onClick={() => handleCourseClick(course)}
          className={`course-card cursor-pointer ${
            course.isLocked ? 'opacity-75' : ''
          }`}
        >
          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900" />
            {course.isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Lock className="w-12 h-12 text-white opacity-75" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{course.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{course.duration}</span>
              <span className={`px-2 py-1 rounded-full ${
                course.level === 'Beginner' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                course.level === 'Intermediate' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                'bg-red-500 bg-opacity-20 text-red-400'
              }`}>
                {course.level}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}