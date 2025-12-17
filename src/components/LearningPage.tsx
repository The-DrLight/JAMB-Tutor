import { BookOpen, ArrowLeft, PlayCircle, FileText, ExternalLink } from 'lucide-react';
import type { Page } from '../App';

interface LearningPageProps {
  topic: string;
  onNavigate: (page: Page) => void;
  onStartQuiz: (topic: string) => void;
}

export function LearningPage({ topic, onNavigate, onStartQuiz }: LearningPageProps) {
  // Mock video URLs - in a real app, these would be stored with each topic
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Topic Header */}
        <div className="mb-6">
          <h1 className="text-green-800 mb-2">{topic}</h1>
          <p className="text-gray-600">
            Watch the video lesson carefully, then test your understanding with the practice quiz below.
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={`${topic} Video Lesson`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-800 mb-2">{topic} - Complete Video Lesson</h3>
                <p className="text-gray-600 text-sm">
                  Master the concepts with this comprehensive video tutorial
                </p>
              </div>
              <a 
                href={`https://youtube.com/watch?v=${videoUrl.split('/').pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open in YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Learning Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-blue-800 mb-3">📚 Study Tips for {topic}</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Take notes while watching the video - write down key formulas and concepts</li>
            <li>• Pause the video when needed to fully understand each concept</li>
            <li>• Review difficult sections multiple times until you're confident</li>
            <li>• Try working through examples on your own before watching the solutions</li>
          </ul>
        </div>

        {/* Practice Test Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="mb-3">Ready to Test Your Knowledge?</h2>
              <p className="text-green-100 mb-6">
                Complete the practice test below to check your understanding of {topic}. 
                You'll need to score at least 70% to mark this topic as completed.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <div className="text-yellow-600 mt-0.5">⚠️</div>
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> Make sure you've watched and understood the entire video 
                    before taking the test. Tests must be completed to unlock your progress.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onStartQuiz(topic)}
                className="px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Start Practice Test
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-gray-800 mb-4">Additional Resources</h3>
          <div className="space-y-3">
            <a 
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Download Topic Summary PDF</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Practice Worksheets</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Related Past Questions</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
