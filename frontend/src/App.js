import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation, Feed, Sidebar, AuthPage, Leaderboard, ChallengeCreator } from './components';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showChallengeCreator, setShowChallengeCreator] = useState(false);

  // Initialize dark mode and user from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedUser = localStorage.getItem('mirrorx-user');
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
        <BrowserRouter>
          <div className="flex">
            <Navigation
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              currentUser={currentUser}
              onSignOut={handleSignOut}
              onShowLeaderboard={() => setShowLeaderboard(true)}
            />
            <main className="flex-1 flex">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Feed darkMode={darkMode} currentUser={currentUser} />
                      <Sidebar />
                    </>
                  }
                />
              </Routes>
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
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;