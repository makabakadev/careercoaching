import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Lesson } from '../../types/course';
import ReactMarkdown from 'react-markdown';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizSubmit = () => {
    if (!lesson.questions) return;
    
    let correctAnswers = 0;
    lesson.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  if (!lesson) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Select a lesson to begin learning
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
        <div className="flex items-center space-x-2 text-gray-400">
          <CheckCircle className="w-5 h-5" />
          <span>{lesson.duration}</span>
        </div>
      </div>

      {lesson.type === 'content' && lesson.content && (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </div>
      )}

      {lesson.type === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            {quizSubmitted && (
              <div className={`mb-6 p-4 rounded-lg ${
                score === lesson.questions?.length 
                  ? 'bg-green-500 bg-opacity-20 text-green-400' 
                  : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
              }`}>
                <div className="flex items-center">
                  {score === lesson.questions?.length ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  )}
                  <span>
                    You scored {score} out of {lesson.questions?.length} questions correctly!
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {lesson.questions?.map((q, index) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-medium text-white">Question {index + 1}: {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <label 
                        key={optionIndex} 
                        className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer ${
                          quizSubmitted
                            ? optionIndex === q.correctAnswer
                              ? 'bg-green-500 bg-opacity-20 text-green-400'
                              : selectedAnswers[q.id] === optionIndex
                                ? 'bg-red-500 bg-opacity-20 text-red-400'
                                : 'text-gray-300'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          disabled={quizSubmitted}
                          checked={selectedAnswers[q.id] === optionIndex}
                          onChange={() => setSelectedAnswers({
                            ...selectedAnswers,
                            [q.id]: optionIndex
                          })}
                          className="text-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted && (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length !== lesson.questions?.length}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}