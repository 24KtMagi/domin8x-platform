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

// Graphics Editor Component
const GraphicsEditor = ({ project, user, onBack }) => {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', type: 'background', visible: true, locked: false, opacity: 1 },
    { id: 2, name: 'Main Content', type: 'image', visible: true, locked: false, opacity: 1 }
  ]);
  const [selectedLayer, setSelectedLayer] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPanel, setShowFontPanel] = useState(false);
  const [showMediaPanel, setShowMediaPanel] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Image adjustments
  const [imageAdjustments, setImageAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    blur: 0,
    sharpen: 0
  });

  // Typography settings
  const [textSettings, setTextSettings] = useState({
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  });

  const tools = [
    { id: 'select', icon: '↖', label: 'Select', shortcut: 'V' },
    { id: 'brush', icon: '🖌', label: 'Brush', shortcut: 'B' },
    { id: 'text', icon: 'T', label: 'Text', shortcut: 'T' },
    { id: 'shapes', icon: '⬜', label: 'Shapes', shortcut: 'R' },
    { id: 'crop', icon: '✂', label: 'Crop', shortcut: 'C' },
    { id: 'clone', icon: '⚇', label: 'Clone', shortcut: 'S' },
    { id: 'eraser', icon: '🧽', label: 'Eraser', shortcut: 'E' }
  ];

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'Playfair Display',
    'Merriweather', 'Dancing Script', 'Bebas Neue', 'Oswald', 'Raleway'
  ];

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
    '#000000', '#FFFFFF', '#808080', '#FF0000', '#00FF00', '#0000FF'
  ];

  const handleImportFromLink = () => {
    const link = prompt('Paste your DOMin8X workspace link:');
    if (link) {
      // Simulate importing content from DOMin8X
      toast.success('Content imported from DOMin8X!');
      // Add new layer with imported content
      const newLayer = {
        id: Date.now(),
        name: 'Imported Content',
        type: 'image',
        visible: true,
        locked: false,
        opacity: 1,
        content: link
      };
      setLayers([...layers, newLayer]);
    }
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
    setShowColorPicker(false);
  };

  const handleAddText = () => {
    const newLayer = {
      id: Date.now(),
      name: 'Text Layer',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 1,
      content: 'Your text here'
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer.id);
    setShowFontPanel(true);
  };

  const handleAddShape = (shape) => {
    const newLayer = {
      id: Date.now(),
      name: `${shape} Shape`,
      type: 'shape',
      visible: true,
      locked: false,
      opacity: 1,
      content: shape
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer.id);
  };

  const handleLayerVisibility = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleLayerLock = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const handleLayerOpacity = (layerId, opacity) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, opacity: opacity / 100 } : layer
    ));
  };

  const handleDuplicateLayer = (layerId) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      const newLayer = {
        ...layer,
        id: Date.now(),
        name: `${layer.name} Copy`
      };
      setLayers([...layers, newLayer]);
    }
  };

  const handleDeleteLayer = (layerId) => {
    setLayers(layers.filter(layer => layer.id !== layerId));
    if (selectedLayer === layerId) {
      setSelectedLayer(layers[0]?.id || null);
    }
  };

  const handleExport = (format) => {
    toast.success(`Exporting as ${format}...`);
    // Simulate export process
    setTimeout(() => {
      toast.success(`${format} export complete!`);
    }, 2000);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast.success('Undo');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast.success('Redo');
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-semibold">{project.name}</h1>
            <p className="text-sm text-gray-400">DOMin8X Studio Pro</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleUndo}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            disabled={historyIndex <= 0}
          >
            ↶ Undo
          </button>
          <button
            onClick={handleRedo}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            disabled={historyIndex >= history.length - 1}
          >
            ↷ Redo
          </button>
          
          <div className="flex items-center space-x-2 mx-4">
            <span className="text-sm">Zoom:</span>
            <input
              type="range"
              min="25"
              max="500"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(e.target.value)}
              className="w-20"
            />
            <span className="text-sm">{zoomLevel}%</span>
          </div>

          <button
            onClick={handleImportFromLink}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Import Link
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMediaPanel(!showMediaPanel)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Export
            </button>
            {showMediaPanel && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg p-2 w-32 z-50">
                {['PNG', 'JPG', 'SVG', 'PDF'].map(format => (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm"
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-colors ${
                selectedTool === tool.id 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-gray-700 text-gray-400'
              }`}
              title={`${tool.label} (${tool.shortcut})`}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Tool Properties Panel */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 space-y-6">
          <h3 className="text-lg font-semibold">Tool Properties</h3>
          
          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-8 h-8 rounded border-2 border-gray-600"
                style={{ backgroundColor: currentColor }}
              />
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-8 h-8 rounded border-none bg-transparent"
              />
            </div>
            {showColorPicker && (
              <div className="mt-2 grid grid-cols-6 gap-1">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className="w-6 h-6 rounded border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Brush Size */}
          {selectedTool === 'brush' && (
            <div>
              <label className="block text-sm font-medium mb-2">Brush Size</label>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">{brushSize}px</div>
            </div>
          )}

          {/* Typography Controls */}
          {selectedTool === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Font Family</label>
                <select
                  value={textSettings.fontFamily}
                  onChange={(e) => setTextSettings({...textSettings, fontFamily: e.target.value})}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                >
                  {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Font Size</label>
                <input
                  type="number"
                  value={textSettings.fontSize}
                  onChange={(e) => setTextSettings({...textSettings, fontSize: e.target.value})}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Font Weight</label>
                <select
                  value={textSettings.fontWeight}
                  onChange={(e) => setTextSettings({...textSettings, fontWeight: e.target.value})}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                >
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Text Align</label>
                <div className="flex space-x-1">
                  {['left', 'center', 'right', 'justify'].map(align => (
                    <button
                      key={align}
                      onClick={() => setTextSettings({...textSettings, textAlign: align})}
                      className={`flex-1 p-2 rounded text-xs ${
                        textSettings.textAlign === align 
                          ? 'bg-purple-600' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shape Tools */}
          {selectedTool === 'shapes' && (
            <div>
              <label className="block text-sm font-medium mb-2">Shapes</label>
              <div className="grid grid-cols-3 gap-2">
                {['rectangle', 'circle', 'triangle', 'star', 'arrow', 'heart'].map(shape => (
                  <button
                    key={shape}
                    onClick={() => handleAddShape(shape)}
                    className="p-3 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              onClick={handleAddText}
              className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Add Text
            </button>
            <button
              onClick={() => setShowAdjustments(!showAdjustments)}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Adjustments
            </button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center p-8">
          <div className="relative bg-white rounded-lg shadow-2xl" style={{ transform: `scale(${zoomLevel / 100})` }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-300 rounded-lg cursor-crosshair"
              style={{ backgroundColor: '#ffffff' }}
            />
            
            {/* Canvas Overlay for Tools */}
            <div className="absolute inset-0 pointer-events-none">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className={`absolute inset-0 ${layer.visible ? 'block' : 'hidden'}`}
                  style={{ opacity: layer.opacity }}
                >
                  {layer.type === 'text' && (
                    <div
                      className="absolute top-4 left-4 cursor-move"
                      style={{
                        fontFamily: textSettings.fontFamily,
                        fontSize: textSettings.fontSize,
                        fontWeight: textSettings.fontWeight,
                        textAlign: textSettings.textAlign,
                        color: textSettings.color
                      }}
                    >
                      {layer.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Layers & Adjustments */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 space-y-6">
          {/* Image Adjustments */}
          {showAdjustments && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Image Adjustments</h3>
              <div className="space-y-4">
                {Object.entries(imageAdjustments).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={value}
                      onChange={(e) => setImageAdjustments({
                        ...imageAdjustments,
                        [key]: parseInt(e.target.value)
                      })}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-400 mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layers Panel */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layers</h3>
            <div className="space-y-2">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedLayer === layer.id 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-gray-600 bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLayerVisibility(layer.id);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        {layer.visible ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLayerLock(layer.id);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        {layer.locked ? <LockClosedIcon className="w-4 h-4" /> : <LockOpenIcon className="w-4 h-4" />}
                      </button>
                      <span className="text-sm font-medium">{layer.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateLayer(layer.id);
                        }}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <DocumentDuplicateIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLayer(layer.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <label className="block text-xs text-gray-400 mb-1">Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={layer.opacity * 100}
                      onChange={(e) => handleLayerOpacity(layer.id, e.target.value)}
                      className="w-full h-1"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleAddText}
              className="w-full mt-4 p-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-purple-500 transition-colors"
            >
              + Add Layer
            </button>
          </div>

          {/* Quick Media Library */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Media Library</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600 cursor-pointer">
                  <PhotoIcon className="w-8 h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};