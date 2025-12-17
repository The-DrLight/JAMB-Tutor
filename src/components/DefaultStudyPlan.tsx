import { BookOpen, Clock, Play, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import type { Page } from '../App';

interface DefaultStudyPlanProps {
  onNavigate: (page: Page) => void;
  onStartLearning: (topic: string) => void;
}

interface Topic {
  id: string;
  title: string;
  category: string;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  videoUrl: string;
}

const topics: Topic[] = [
  {
    id: '1',
    title: 'Number Bases',
    category: 'Number Systems',
    duration: '2 hours',
    status: 'Completed',
    videoUrl: 'https://youtube.com/watch?v=example1'
  },
  {
    id: '2',
    title: 'Fractions and Decimals',
    category: 'Number Systems',
    duration: '1.5 hours',
    status: 'In Progress',
    videoUrl: 'https://youtube.com/watch?v=example2'
  },
  {
    id: '3',
    title: 'Indices and Logarithms',
    category: 'Algebra',
    duration: '3 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example3'
  },
  {
    id: '4',
    title: 'Quadratic Equations',
    category: 'Algebra',
    duration: '2.5 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example4'
  },
  {
    id: '5',
    title: 'Simultaneous Equations',
    category: 'Algebra',
    duration: '2 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example5'
  },
  {
    id: '6',
    title: 'Angles and Properties',
    category: 'Geometry',
    duration: '2 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example6'
  },
  {
    id: '7',
    title: 'Circle Theorems',
    category: 'Geometry',
    duration: '2.5 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example7'
  },
  {
    id: '8',
    title: 'Mensuration',
    category: 'Geometry',
    duration: '2 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example8'
  },
  {
    id: '9',
    title: 'Trigonometric Ratios',
    category: 'Trigonometry',
    duration: '2.5 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example9'
  },
  {
    id: '10',
    title: 'Sine and Cosine Rules',
    category: 'Trigonometry',
    duration: '2 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example10'
  },
  {
    id: '11',
    title: 'Mean, Median, Mode',
    category: 'Statistics',
    duration: '1.5 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example11'
  },
  {
    id: '12',
    title: 'Probability',
    category: 'Statistics',
    duration: '2 hours',
    status: 'Not Started',
    videoUrl: 'https://youtube.com/watch?v=example12'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Circle className="w-4 h-4" />;
  }
};

export function DefaultStudyPlan({ onNavigate, onStartLearning }: DefaultStudyPlanProps) {
  const groupedTopics = topics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);

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
                <span className="text-green-800">JAMB Prep – Mathematics</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-gray-600 hover:text-gray-800"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Default Mathematics Study Plan</h1>
          <p className="text-gray-600">
            A comprehensive study plan covering all JAMB Mathematics topics. 
            Complete each topic in order to build a strong foundation.
          </p>
        </div>

        {/* Topics by Category */}
        {Object.entries(groupedTopics).map(([category, categoryTopics]) => (
          <div key={category} className="mb-8">
            <h2 className="text-gray-800 mb-4">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-gray-800 flex-1">{topic.title}</h3>
                      {getStatusIcon(topic.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{topic.duration}</span>
                    </div>

                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm mb-4 ${getStatusColor(topic.status)}`}>
                      {topic.status}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onStartLearning(topic.title)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-800 mb-2">💡 Study Tips</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Watch each video carefully and take notes</li>
            <li>• Complete practice tests to reinforce your learning</li>
            <li>• You must score at least 70% to mark a topic as completed</li>
            <li>• Focus on understanding concepts, not just memorizing formulas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
