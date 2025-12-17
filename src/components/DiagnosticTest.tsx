import { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import type { Page, DiagnosticResults } from '../App';

interface DiagnosticTestProps {
  onNavigate: (page: Page) => void;
  onComplete: (results: DiagnosticResults) => void;
}

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const diagnosticQuestions: Question[] = [
  {
    id: 1,
    topic: 'Number Bases',
    question: 'Convert 101₂ to base 10',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2
  },
  {
    id: 2,
    topic: 'Number Bases',
    question: 'What is 23₅ in base 10?',
    options: ['11', '12', '13', '14'],
    correctAnswer: 2
  },
  {
    id: 3,
    topic: 'Fractions and Decimals',
    question: 'Simplify: 3/4 + 1/2',
    options: ['1/4', '5/4', '5/6', '7/8'],
    correctAnswer: 1
  },
  {
    id: 4,
    topic: 'Fractions and Decimals',
    question: 'Convert 0.75 to a fraction',
    options: ['3/4', '2/3', '7/10', '4/5'],
    correctAnswer: 0
  },
  {
    id: 5,
    topic: 'Indices and Logarithms',
    question: 'Simplify: 2³ × 2²',
    options: ['2⁵', '2⁶', '4⁵', '4⁶'],
    correctAnswer: 0
  },
  {
    id: 6,
    topic: 'Indices and Logarithms',
    question: 'What is log₂ 8?',
    options: ['2', '3', '4', '8'],
    correctAnswer: 1
  },
  {
    id: 7,
    topic: 'Quadratic Equations',
    question: 'Solve: x² - 5x + 6 = 0',
    options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = 1, 5'],
    correctAnswer: 1
  },
  {
    id: 8,
    topic: 'Quadratic Equations',
    question: 'What is the discriminant of x² + 2x + 1 = 0?',
    options: ['-3', '0', '3', '4'],
    correctAnswer: 1
  },
  {
    id: 9,
    topic: 'Simultaneous Equations',
    question: 'If 2x + y = 7 and x - y = 2, what is x?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1
  },
  {
    id: 10,
    topic: 'Simultaneous Equations',
    question: 'Solve: x + y = 5, x - y = 1',
    options: ['x=2, y=3', 'x=3, y=2', 'x=4, y=1', 'x=1, y=4'],
    correctAnswer: 1
  },
  {
    id: 11,
    topic: 'Trigonometric Ratios',
    question: 'In a right triangle, sin θ = opposite/hypotenuse. What is cos θ?',
    options: ['opposite/adjacent', 'adjacent/hypotenuse', 'hypotenuse/adjacent', 'opposite/hypotenuse'],
    correctAnswer: 1
  },
  {
    id: 12,
    topic: 'Trigonometric Ratios',
    question: 'What is sin 30°?',
    options: ['1/4', '1/3', '1/2', '√3/2'],
    correctAnswer: 2
  },
  {
    id: 13,
    topic: 'Mean, Median, Mode',
    question: 'Find the mean of: 2, 4, 6, 8, 10',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1
  },
  {
    id: 14,
    topic: 'Mean, Median, Mode',
    question: 'What is the median of: 3, 7, 2, 9, 5?',
    options: ['3', '5', '7', '9'],
    correctAnswer: 1
  },
  {
    id: 15,
    topic: 'Probability',
    question: 'What is the probability of getting heads when tossing a fair coin?',
    options: ['1/4', '1/3', '1/2', '2/3'],
    correctAnswer: 2
  }
];

export function DiagnosticTest({ onNavigate, onComplete }: DiagnosticTestProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(diagnosticQuestions.length).fill(null)
  );
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  useEffect(() => {
    if (hasStarted && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && hasStarted) {
      handleSubmit();
    }
  }, [timeRemaining, hasStarted]);

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
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate scores by topic
    const topicScores: { [key: string]: { correct: number; total: number } } = {};
    
    diagnosticQuestions.forEach((question, index) => {
      if (!topicScores[question.topic]) {
        topicScores[question.topic] = { correct: 0, total: 0 };
      }
      topicScores[question.topic].total++;
      if (selectedAnswers[index] === question.correctAnswer) {
        topicScores[question.topic].correct++;
      }
    });

    // Categorize topics
    const weak: string[] = [];
    const moderate: string[] = [];
    const strong: string[] = [];
    const scores: { [key: string]: number } = {};

    Object.entries(topicScores).forEach(([topic, { correct, total }]) => {
      const percentage = (correct / total) * 100;
      scores[topic] = Math.round(percentage);
      
      if (percentage < 50) {
        weak.push(topic);
      } else if (percentage < 75) {
        moderate.push(topic);
      } else {
        strong.push(topic);
      }
    });

    onComplete({ weak, moderate, strong, scores });
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-800">JAMB Prep – Mathematics</span>
              </div>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>

            <h1 className="text-green-800 text-center mb-4">Diagnostic Test</h1>
            
            <p className="text-gray-600 text-center mb-8">
              This diagnostic test will help us identify your strengths and weaknesses across 
              all Mathematics topics. The results will be used to create a personalized study plan 
              tailored to your needs.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-blue-800 mb-4">Test Information:</h3>
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Questions:</strong> {diagnosticQuestions.length} questions covering multiple topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Duration:</strong> 30 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Topics Covered:</strong> Number Bases, Algebra, Geometry, Trigonometry, Statistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Purpose:</strong> Identify areas for improvement and create your personalized study plan</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 text-sm">
                <strong>Tip:</strong> Answer all questions to the best of your ability. 
                Don't worry about your score - this test is designed to help you, not judge you.
              </p>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Diagnostic Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const answeredCount = selectedAnswers.filter(a => a !== null).length;

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
                <span className="text-green-800">Diagnostic Test</span>
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
            <span>Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-6">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm mb-4">
              {currentQuestion.topic}
            </span>
          </div>
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

          {currentQuestionIndex === diagnosticQuestions.length - 1 ? (
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
