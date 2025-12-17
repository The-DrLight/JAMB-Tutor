import { BookOpen, Target, TrendingUp, AlertCircle, PlayCircle, FileText } from 'lucide-react';
import type { Page, UserProgress } from '../App';

interface DashboardProps {
  userName: string;
  progress: UserProgress;
  onNavigate: (page: Page) => void;
  hasPersonalizedPlan: boolean;
}

export function Dashboard({ userName, progress, onNavigate, hasPersonalizedPlan }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-800">JAMB Prep – Mathematics</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800">Settings</button>
              <button 
                onClick={() => onNavigate('landing')}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Welcome back, {userName} 👋</h1>
          <p className="text-gray-600">Let's continue building your path to JAMB success</p>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                Great!
              </span>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{progress.topicsMastered}</div>
            <div className="text-gray-600">Topics Mastered</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
                In Progress
              </span>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{progress.topicsInProgress}</div>
            <div className="text-gray-600">Topics In Progress</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
                Focus Needed
              </span>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{progress.weakAreas}</div>
            <div className="text-gray-600">Weak Areas</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800">Mathematics Syllabus Completion</h3>
            <span className="text-green-600">{progress.overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress.overallProgress}%` }}
            />
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Keep going! You're making great progress.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button 
            onClick={() => onNavigate(hasPersonalizedPlan ? 'personalized-study' : 'default-study')}
            className="bg-green-600 text-white rounded-xl p-8 hover:bg-green-700 transition-colors text-left shadow-sm"
          >
            <PlayCircle className="w-10 h-10 mb-4" />
            <h3 className="mb-2">Continue Study Plan</h3>
            <p className="text-green-100">
              {hasPersonalizedPlan 
                ? 'Resume your personalized study plan based on your diagnostic results'
                : 'Start with the default Mathematics study plan'}
            </p>
          </button>

          <button 
            onClick={() => onNavigate('diagnostic')}
            className="bg-white border-2 border-green-600 text-green-700 rounded-xl p-8 hover:bg-green-50 transition-colors text-left shadow-sm"
          >
            <FileText className="w-10 h-10 mb-4" />
            <h3 className="mb-2">
              {hasPersonalizedPlan ? 'Retake Diagnostic Test' : 'Take Diagnostic Test'}
            </h3>
            <p className="text-gray-600">
              {hasPersonalizedPlan 
                ? 'Update your study plan with a new diagnostic assessment'
                : 'Identify your strengths and weaknesses to get a personalized study plan'}
            </p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white">
          <h3 className="mb-6">Your Study Statistics</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-1">15</div>
              <div className="text-green-100">Hours Studied</div>
            </div>
            <div>
              <div className="text-3xl mb-1">127</div>
              <div className="text-green-100">Questions Answered</div>
            </div>
            <div>
              <div className="text-3xl mb-1">73%</div>
              <div className="text-green-100">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
