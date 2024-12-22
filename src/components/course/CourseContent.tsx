import { useParams } from 'react-router-dom';
import { Module } from '../../types/course';
import LessonContent from './LessonContent';

interface CourseContentProps {
  modules: Module[];
}

export default function CourseContent({ modules }: CourseContentProps) {
  const { moduleId, lessonId } = useParams();

  const currentModule = modules.find(m => m.id === moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId);

  if (!currentLesson) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Select a lesson from the sidebar to begin learning
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <LessonContent lesson={currentLesson} />
    </div>
  );
}