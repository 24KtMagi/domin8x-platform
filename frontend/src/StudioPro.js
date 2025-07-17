import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  SparklesIcon,
  PhotoIcon,
  PaintBrushIcon,
  SwatchIcon,
  RectangleStackIcon,
  CubeIcon,
  TypeIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  Cog6ToothIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  LightBulbIcon as LightBulbSolid
} from '@heroicons/react/24/solid';

// Studio Pro Main Component
const StudioPro = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [showProjectSelector, setShowProjectSelector] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('domin8x-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">DOMin8X Studio Pro</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please sign in to DOMin8X first</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            Go to DOMin8X
          </button>
        </div>
      </div>
    );
  }

  if (showProjectSelector) {
    return <ProjectSelector onSelectProject={setCurrentProject} onClose={() => setShowProjectSelector(false)} user={user} />;
  }

  if (currentProject) {
    return <GraphicsEditor project={currentProject} user={user} onBack={() => setCurrentProject(null)} />;
  }

  return <ProjectSelector onSelectProject={setCurrentProject} onClose={() => setShowProjectSelector(false)} user={user} />;
};

// Project Selector Component
const ProjectSelector = ({ onSelectProject, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [projects] = useState([
    {
      id: 1,
      name: 'Cyberpunk Logo Refinement',
      type: 'logo',
      originalPrompt: 'futuristic tech company logo with neon effects',
      thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&h=200&fit=crop',
      lastModified: '2024-01-15',
      status: 'in-progress',
      source: 'DOMin8X'
    },
    {
      id: 2,
      name: 'Digital Art Enhancement',
      type: 'image',
      originalPrompt: 'abstract digital art with flowing particles',
      thumbnail: 'https://images.unsplash.com/photo-1590870845755-4c3c46615dd1?w=300&h=200&fit=crop',
      lastModified: '2024-01-14',
      status: 'completed',
      source: 'Cur10saX'
    },
    {
      id: 3,
      name: 'Brand Identity System',
      type: 'brand',
      originalPrompt: 'modern minimalist brand identity',
      thumbnail: 'https://images.unsplash.com/photo-1611500815043-14c764f7d5d7?w=300&h=200&fit=crop',
      lastModified: '2024-01-13',
      status: 'review',
      source: 'DOMin8X'
    }
  ]);

  const [importUrl, setImportUrl] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleImportFromDOMin8X = () => {
    // Simulate import from DOMin8X
    const newProject = {
      id: Date.now(),
      name: 'Imported from DOMin8X',
      type: 'image',
      originalPrompt: 'AI-generated artwork from DOMin8X',
      thumbnail: 'https://images.unsplash.com/photo-1590870845755-4c3c46615dd1?w=300&h=200&fit=crop',
      lastModified: new Date().toISOString().split('T')[0],
      status: 'new',
      source: 'DOMin8X'
    };
    
    onSelectProject(newProject);
    toast.success('Project imported from DOMin8X successfully!');
  };

  const handleCreateNew = (type) => {
    const newProject = {
      id: Date.now(),
      name: `New ${type} Project`,
      type: type,
      originalPrompt: '',
      thumbnail: null,
      lastModified: new Date().toISOString().split('T')[0],
      status: 'new',
      source: 'Studio Pro'
    };
    
    onSelectProject(newProject);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  DOMin8X Studio Pro
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Professional Graphics Editor</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowImport(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                <ArrowUpTrayIcon className="w-4 h-4" />
                <span>Import from DOMin8X</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'new'
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            New Project
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            My Projects
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'templates'
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Templates
          </button>
        </div>

        {/* New Project Tab */}
        {activeTab === 'new' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Start a New Project</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { type: 'logo', icon: SparklesIcon, title: 'Logo Design', desc: 'Create and refine professional logos' },
                  { type: 'image', icon: PhotoIcon, title: 'Image Editing', desc: 'Edit and enhance AI-generated images' },
                  { type: 'brand', icon: SwatchIcon, title: 'Brand Identity', desc: 'Complete brand identity systems' },
                  { type: 'social', icon: ShareIcon, title: 'Social Media', desc: 'Social media graphics and posts' }
                ].map((project) => (
                  <motion.div
                    key={project.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCreateNew(project.type)}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{project.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Import from DOMin8X</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Import your AI-generated content from DOMin8X or Cur10saX to refine and personalize
              </p>
              <button
                onClick={handleImportFromDOMin8X}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Import Now
              </button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectProject(project)}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 relative">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <SparklesIcon className="w-16 h-16 text-purple-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.originalPrompt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{project.source}</span>
                      <span>{project.lastModified}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Professional Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Modern Logo Template', type: 'logo', thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&h=200&fit=crop' },
                { name: 'Social Media Kit', type: 'social', thumbnail: 'https://images.unsplash.com/photo-1611500815043-14c764f7d5d7?w=300&h=200&fit=crop' },
                { name: 'Brand Identity Pack', type: 'brand', thumbnail: 'https://images.unsplash.com/photo-1590870845755-4c3c46615dd1?w=300&h=200&fit=crop' }
              ].map((template, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{template.type}</span>
                      <button className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600 transition-colors">
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showImport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Import from DOMin8X</h3>
                <button
                  onClick={() => setShowImport(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">DOMin8X Content URL</label>
                  <input
                    type="url"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://domin8x.com/post/..."
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowImport(false)}
                    className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImportFromDOMin8X}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    Import
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudioPro;