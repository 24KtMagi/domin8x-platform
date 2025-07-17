import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation, Feed, Sidebar } from './components';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
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

  const currentUser = {
    name: 'You',
    username: 'yourhandle',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <BrowserRouter>
          <div className="flex">
            <Navigation
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              currentUser={currentUser}
            />
            <main className="flex-1 flex">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Feed darkMode={darkMode} />
                      <Sidebar />
                    </>
                  }
                />
              </Routes>
            </main>
          </div>
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