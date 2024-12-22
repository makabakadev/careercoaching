export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isLocked?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'content' | 'quiz' | 'assignment';
  content?: string;
  questions?: Question[];
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  isLocked?: boolean;
  modules?: Module[];
}