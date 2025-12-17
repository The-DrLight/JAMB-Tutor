import { BookOpen, Clock, Play, ArrowLeft, AlertCircle } from 'lucide-react';
import type { Page, DiagnosticResults } from '../App';

interface PersonalizedStudyPlanProps {
  onNavigate: (page: Page) => void;
  onStartLearning: (topic: string) => void;
  diagnosticResults: DiagnosticResults | null;
}

interface Topic {
  id: string;
  title: string;
  category: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
}

export function PersonalizedStudyPlan({ onNavigate, onStartLearning, diagnosticResults }: PersonalizedStudyPlanProps) {
  // Generate personalized topics based on diagnostic results
  const getPersonalizedTopics = (): Topic[] => {
    if (!diagnosticResults) {
      return [];
    }

    const topics: Topic[] = [];

    // High priority - weak areas
    diagnosticResults.weak.forEach((topic, index) => {
      topics.push({
        id: `weak-${index}`,
        title: topic,
        category: 'Priority Focus',
        duration: '3 hours',
        priority: 'High',
        reason: 'Weak area - needs immediate attention'
      });
    });

    // Medium priority - moderate areas
    diagnosticResults.moderate.forEach((topic, index) => {
      topics.push({
        id: `moderate-${index}`,
        title: topic,
        category: 'Improvement Needed',
        duration: '2 hours',
        priority: 'Medium',
        reason: 'Good foundation - practice for mastery'
      });
    });

    // Low priority - strong areas (for review)
    diagnosticResults.strong.slice(0, 3).forEach((topic, index) => {
      topics.push({
        id: `strong-${index}`,
        title: topic,
        category: 'Review & Maintain',
        duration: '1 hour',
        priority: 'Low',
        reason: 'Strong area - periodic review recommended'
      });
    });

    return topics;
  };

  const personalizedTopics = getPersonalizedTopics();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const groupedTopics = personalizedTopics.reduce((acc, topic) => {
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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-green-800 mb-2">Your Personalized Study Plan</h1>
              <p className="text-gray-600">
                Based on your diagnostic test results, this study plan prioritizes your weak areas 
                while maintaining your strengths. Follow this plan to maximize your JAMB preparation.
              </p>
            </div>
          </div>
        </div>

        {/* Priority Guide */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h3 className="text-gray-800 mb-4">Priority Levels Explained</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-red-700 mb-1">High Priority</div>
                <div className="text-gray-600 text-sm">Topics that need immediate attention and more practice</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-yellow-700 mb-1">Medium Priority</div>
                <div className="text-gray-600 text-sm">Good foundation - practice to achieve mastery</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-green-700 mb-1">Low Priority</div>
                <div className="text-gray-600 text-sm">Strong areas - maintain with periodic review</div>
              </div>
            </div>
          </div>
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
                    <div className="mb-3">
                      <h3 className="text-gray-800 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 text-sm">{topic.reason}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{topic.duration}</span>
                    </div>

                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm mb-4 ${getPriorityColor(topic.priority)}`}>
                      {topic.priority} Priority
                    </div>

                    <button 
                      onClick={() => onStartLearning(topic.title)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Action Button */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-8 text-white">
          <h3 className="mb-3">Want to Update Your Study Plan?</h3>
          <p className="text-purple-100 mb-6">
            Take the diagnostic test again to reassess your knowledge and get an updated personalized study plan.
          </p>
          <button 
            onClick={() => onNavigate('diagnostic')}
            className="px-6 py-3 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Retake Diagnostic Test
          </button>
        </div>
      </div>
    </div>
  );
}
