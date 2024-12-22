import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CourseSidebar from '../components/course/CourseSidebar';
import CourseContent from '../components/course/CourseContent';
import { updatedCourses } from '../data/courseContent';

export default function Course() {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  const currentCourse = updatedCourses.find(c => c.id === courseId);
  
  if (!currentCourse || currentCourse.isLocked) {
    return <Navigate to="/dashboard" />;
  }

  if (!moduleId && !lessonId && currentCourse.modules?.[0]) {
    const firstModule = currentCourse.modules[0];
    const firstLesson = firstModule.lessons[0];
    return <Navigate to={`/dashboard/course/${courseId}/${firstModule.id}/${firstLesson.id}`} />;
  }

  return (
    <div className="flex h-full">
      <CourseSidebar 
        modules={currentCourse.modules || []}
        isExpanded={true}
      />
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Courses
            </button>
          </div>
        </div>
        <div className="p-6">
          <CourseContent modules={currentCourse.modules || []} />
        </div>
      </div>
    </div>
  );
}