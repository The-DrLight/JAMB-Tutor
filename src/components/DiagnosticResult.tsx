import { BookOpen, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import type { Page, DiagnosticResults } from '../App';

interface DiagnosticResultProps {
  results: DiagnosticResults;
  onNavigate: (page: Page) => void;
  onGeneratePersonalizedPlan: () => void;
}

export function DiagnosticResult({ results, onNavigate, onGeneratePersonalizedPlan }: DiagnosticResultProps) {
  const totalTopics = Object.keys(results.scores).length;
  const averageScore = Math.round(
    Object.values(results.scores).reduce((sum, score) => sum + score, 0) / totalTopics
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score */}
        <div className="text-center mb-8">
          <h1 className="text-green-800 mb-4">Your Diagnostic Results</h1>
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
            <div className="text-white">
              <div className="text-4xl" style={{ fontWeight: 700 }}>{averageScore}%</div>
              <div className="text-sm text-green-100">Average</div>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've analyzed your performance across all Mathematics topics. 
            Below is a detailed breakdown of your strengths and areas for improvement.
          </p>
        </div>

        {/* Performance Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Weak Areas</div>
                <div className="text-2xl text-gray-900">{results.weak.length}</div>
              </div>
            </div>
            <div className="text-red-600 text-sm">Below 50%</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Moderate Areas</div>
                <div className="text-2xl text-gray-900">{results.moderate.length}</div>
              </div>
            </div>
            <div className="text-yellow-600 text-sm">50% - 74%</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Strong Areas</div>
                <div className="text-2xl text-gray-900">{results.strong.length}</div>
              </div>
            </div>
            <div className="text-green-600 text-sm">75% and above</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weak Areas */}
          {results.weak.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-red-800">Weak Areas</h3>
                </div>
                <p className="text-red-700 text-sm">Prioritize these topics in your study plan</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {results.weak.map((topic, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <div className="text-gray-800 mb-1">{topic}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${results.scores[topic]}%` }}
                          />
                        </div>
                        <span className="text-red-600 text-sm">{results.scores[topic]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Moderate Areas */}
          {results.moderate.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-yellow-800">Moderate Areas</h3>
                </div>
                <p className="text-yellow-700 text-sm">Build on your foundation to achieve mastery</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {results.moderate.map((topic, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <div className="text-gray-800 mb-1">{topic}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: `${results.scores[topic]}%` }}
                          />
                        </div>
                        <span className="text-yellow-600 text-sm">{results.scores[topic]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strong Areas */}
          {results.strong.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-green-800">Strong Areas</h3>
                </div>
                <p className="text-green-700 text-sm">Maintain with periodic review</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {results.strong.map((topic, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="text-gray-800 mb-1">{topic}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${results.scores[topic]}%` }}
                          />
                        </div>
                        <span className="text-green-600 text-sm">{results.scores[topic]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-3">Ready for Your Personalized Study Plan?</h2>
              <p className="text-purple-100 mb-6">
                Based on your diagnostic results, we'll create a customized study plan that focuses 
                on your weak areas while maintaining your strengths. This plan is optimized to help 
                you achieve the best results in the shortest time.
              </p>
              <button 
                onClick={onGeneratePersonalizedPlan}
                className="px-8 py-4 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Generate Personalized Study Plan
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-800 mb-4">💡 What's Next?</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Focus on your weak areas first - they offer the most room for improvement</li>
            <li>• Don't neglect your moderate areas - with practice, they can become strengths</li>
            <li>• Periodically review your strong areas to maintain your knowledge</li>
            <li>• Retake the diagnostic test after studying to track your progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
