import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation, Feed, Sidebar, AuthPage, Leaderboard, ChallengeCreator, Cur10saX } from './components';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showChallengeCreator, setShowChallengeCreator] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize dark mode and user from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedUser = localStorage.getItem('domin8x-user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Feed darkMode={darkMode} currentUser={currentUser} />
            <Sidebar />
          </>
        );
      case 'cur10sax':
        return <Cur10saX darkMode={darkMode} currentUser={currentUser} />;
      case 'explore':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Explore</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover new content and creators</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your activities</p>
          </div>
        );
      case 'messages':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Messages</h1>
            <p className="text-gray-600 dark:text-gray-400">Connect with your network</p>
          </div>
        );
      case 'bookmarks':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Bookmarks</h1>
            <p className="text-gray-600 dark:text-gray-400">Your saved content</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Customize your DOMin8X experience</p>
          </div>
        );
      default:
        return (
          <>
            <Feed darkMode={darkMode} currentUser={currentUser} />
            <Sidebar />
          </>
        );
    }
  };

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
          <AuthPage onAuthSuccess={handleAuthSuccess} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: darkMode ? 'dark' : '',
              style: {
                background: darkMode ? '#1f2937' : '#ffffff',
                color: darkMode ? '#f9fafb' : '#111827',
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="flex">
          <Navigation
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            currentUser={currentUser}
            onSignOut={handleSignOut}
            onShowLeaderboard={() => setShowLeaderboard(true)}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
          <main className="flex-1 flex">
            {renderCurrentPage()}
          </main>
        </div>
        
        {/* Leaderboard Modal */}
        <Leaderboard
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
        
        {/* Challenge Creator Modal */}
        <ChallengeCreator
          isOpen={showChallengeCreator}
          onClose={() => setShowChallengeCreator(false)}
        />
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: darkMode ? 'dark' : '',
            style: {
              background: darkMode ? '#1f2937' : '#ffffff',
              color: darkMode ? '#f9fafb' : '#111827',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;