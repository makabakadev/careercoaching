import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Module } from '../../types/course';

interface CourseSidebarProps {
  modules: Module[];
  isExpanded: boolean;
}

export default function CourseSidebar({ modules, isExpanded }: CourseSidebarProps) {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  const handleLessonClick = (module: Module, lessonId: string) => {
    if (module.isLocked) return;
    navigate(`/dashboard/course/${courseId}/${module.id}/${lessonId}`);
  };

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="w-80 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Course Content</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className={`flex items-center justify-between p-2 rounded-lg ${
                module.isLocked ? 'text-gray-500' : 'text-white'
              }`}>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">{module.title}</span>
                </div>
                {module.isLocked && <Lock className="w-4 h-4" />}
              </div>

              {!module.isLocked && (
                <div className="ml-4 space-y-1">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(module, lesson.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        lessonId === lesson.id
                          ? 'bg-blue-500 bg-opacity-20 text-blue-400'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4" />
                        <span>{lesson.title}</span>
                      </div>
                      {lesson.completed && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}