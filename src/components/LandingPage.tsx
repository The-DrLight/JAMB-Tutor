import { BookOpen, Target, Brain, ChevronRight } from 'lucide-react';
import type { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-800">JAMB Prep – Mathematics</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-green-700 hover:text-green-800 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-green-800 mb-6">
            Ace JAMB Mathematics with a Smarter Study Plan
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get AI-powered personalized study plans, take diagnostic tests to identify your weak areas, 
            and practice with hundreds of JAMB-style questions. Join thousands of Nigerian students 
            preparing for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Studying
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Take Diagnostic Test
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-green-800 mb-3">AI-Powered Study Plans</h3>
            <p className="text-gray-600">
              Get a customized study plan based on your diagnostic test results. 
              Focus on what matters most for your success.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-green-800 mb-3">Diagnostic Tests</h3>
            <p className="text-gray-600">
              Take comprehensive diagnostic tests to identify your strengths and 
              weaknesses across all Mathematics topics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-green-800 mb-3">In-App Practice Questions</h3>
            <p className="text-gray-600">
              Practice with hundreds of JAMB-style questions. Track your progress 
              and master every topic before exam day.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-800">JAMB Prep</span>
              </div>
              <p className="text-gray-600 text-sm">
                Your trusted companion for JAMB Mathematics preparation.
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-800 mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Our Story</a></li>
                <li><a href="#" className="hover:text-green-600">How It Works</a></li>
                <li><a href="#" className="hover:text-green-600">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Support</a></li>
                <li><a href="#" className="hover:text-green-600">FAQ</a></li>
                <li><a href="#" className="hover:text-green-600">Email Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p className="mb-2">
              © 2025 JAMB Prep. All rights reserved.
            </p>
            <p className="text-xs">
              <strong>Disclaimer:</strong> This platform is not affiliated with or endorsed by JAMB. 
              It is an independent study resource for students preparing for JAMB examinations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
