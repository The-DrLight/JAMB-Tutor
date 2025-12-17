import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';
import { DefaultStudyPlan } from './components/DefaultStudyPlan';
import { PersonalizedStudyPlan } from './components/PersonalizedStudyPlan';
import { LearningPage } from './components/LearningPage';
import { QuizPage } from './components/QuizPage';
import { DiagnosticTest } from './components/DiagnosticTest';
import { DiagnosticResult } from './components/DiagnosticResult';

export type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'default-study' | 'personalized-study' | 'learning' | 'quiz' | 'diagnostic' | 'diagnostic-result';

export interface UserProgress {
  topicsMastered: number;
  topicsInProgress: number;
  weakAreas: number;
  overallProgress: number;
}

export interface DiagnosticResults {
  weak: string[];
  moderate: string[];
  strong: string[];
  scores: { [key: string]: number };
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Student');
  const [currentTopic, setCurrentTopic] = useState('');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    topicsMastered: 0,
    topicsInProgress: 0,
    weakAreas: 0,
    overallProgress: 0
  });
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResults | null>(null);
  const [hasPersonalizedPlan, setHasPersonalizedPlan] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignup = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleStartLearning = (topic: string) => {
    setCurrentTopic(topic);
    setCurrentPage('learning');
  };

  const handleStartQuiz = (topic: string) => {
    setCurrentTopic(topic);
    setCurrentPage('quiz');
  };

  const handleDiagnosticComplete = (results: DiagnosticResults) => {
    setDiagnosticResults(results);
    setCurrentPage('diagnostic-result');
  };

  const handleGeneratePersonalizedPlan = () => {
    setHasPersonalizedPlan(true);
    setCurrentPage('personalized-study');
  };

  const handleQuizComplete = (score: number) => {
    // Update progress
    setUserProgress(prev => ({
      ...prev,
      topicsMastered: prev.topicsMastered + (score >= 70 ? 1 : 0),
      topicsInProgress: prev.topicsInProgress + (score < 70 && score > 0 ? 1 : 0),
      overallProgress: Math.min(prev.overallProgress + 5, 100)
    }));
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'signup':
        return <SignUpPage onSignup={handleSignup} onNavigate={navigateTo} />;
      case 'dashboard':
        return (
          <Dashboard 
            userName={userName}
            progress={userProgress}
            onNavigate={navigateTo}
            hasPersonalizedPlan={hasPersonalizedPlan}
          />
        );
      case 'default-study':
        return (
          <DefaultStudyPlan 
            onNavigate={navigateTo}
            onStartLearning={handleStartLearning}
          />
        );
      case 'personalized-study':
        return (
          <PersonalizedStudyPlan 
            onNavigate={navigateTo}
            onStartLearning={handleStartLearning}
            diagnosticResults={diagnosticResults}
          />
        );
      case 'learning':
        return (
          <LearningPage 
            topic={currentTopic}
            onNavigate={navigateTo}
            onStartQuiz={handleStartQuiz}
          />
        );
      case 'quiz':
        return (
          <QuizPage 
            topic={currentTopic}
            onNavigate={navigateTo}
            onComplete={handleQuizComplete}
          />
        );
      case 'diagnostic':
        return (
          <DiagnosticTest 
            onNavigate={navigateTo}
            onComplete={handleDiagnosticComplete}
          />
        );
      case 'diagnostic-result':
        return (
          <DiagnosticResult 
            results={diagnosticResults!}
            onNavigate={navigateTo}
            onGeneratePersonalizedPlan={handleGeneratePersonalizedPlan}
          />
        );
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;
