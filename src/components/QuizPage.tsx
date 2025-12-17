import { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft, Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { Page } from '../App';

interface QuizPageProps {
  topic: string;
  onNavigate: (page: Page) => void;
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const generateQuestions = (topic: string): Question[] => {
  // Mock questions - in a real app, these would be fetched based on the topic
  return [
    {
      id: 1,
      question: `If 2x + 5 = 13, what is the value of x?`,
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: `Simplify: 3(x + 2) - 2x`,
      options: ['x + 6', 'x + 2', '5x + 6', 'x - 6'],
      correctAnswer: 0
    },
    {
      id: 3,
      question: `What is the value of 5² - 3²?`,
      options: ['8', '12', '16', '20'],
      correctAnswer: 2
    },
    {
      id: 4,
      question: `If y = 2x + 1 and x = 3, what is y?`,
      options: ['5', '6', '7', '8'],
      correctAnswer: 2
    },
    {
      id: 5,
      question: `Solve: 4x - 8 = 12`,
      options: ['3', '4', '5', '6'],
      correctAnswer: 2
    },
    {
      id: 6,
      question: `What is 20% of 150?`,
      options: ['20', '25', '30', '35'],
      correctAnswer: 2
    },
    {
      id: 7,
      question: `Simplify: (x³)²`,
      options: ['x⁵', 'x⁶', 'x⁹', '2x³'],
      correctAnswer: 1
    },
    {
      id: 8,
      question: `If 3x = 15, what is x?`,
      options: ['3', '4', '5', '6'],
      correctAnswer: 2
    },
    {
      id: 9,
      question: `What is the area of a rectangle with length 8 and width 5?`,
      options: ['13', '26', '40', '80'],
      correctAnswer: 2
    },
    {
      id: 10,
      question: `Simplify: 2(3 + 4) - 5`,
      options: ['7', '9', '11', '14'],
      correctAnswer: 1
    }
  ];
};

export function QuizPage({ topic, onNavigate, onComplete }: QuizPageProps) {
  const [questions] = useState<Question[]>(generateQuestions(topic));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(10).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = selectedAnswers.filter(a => a !== null).length;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-800">JAMB Prep – Mathematics</span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 70 ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <CheckCircle className={`w-12 h-12 ${score >= 70 ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>

            <h1 className="text-green-800 mb-4">Test Completed!</h1>
            
            <div className="text-6xl mb-6" style={{ fontWeight: 700 }}>
              {score}%
            </div>

            <p className="text-gray-600 mb-8">
              You answered {selectedAnswers.filter((a, i) => a === questions[i].correctAnswer).length} out of {questions.length} questions correctly
            </p>

            {score >= 70 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <p className="text-green-800">
                  🎉 Congratulations! You've mastered {topic}. Keep up the excellent work!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <p className="text-yellow-800">
                  You're making progress! Review the video lesson and try again to improve your score.
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Dashboard
              </button>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers(new Array(10).fill(null));
                  setTimeRemaining(1200);
                }}
                className="px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-800">Practice Test: {topic}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-green-700" />
              <span className="text-green-700">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-6">
          <div className="mb-8">
            <div className="text-gray-500 mb-2">Question {currentQuestionIndex + 1}</div>
            <h2 className="text-gray-900">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-green-600 bg-green-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
