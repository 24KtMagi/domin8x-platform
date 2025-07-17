import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  PlusIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowsRightLeftIcon,
  ShareIcon,
  PhotoIcon,
  MusicalNoteIcon,
  SparklesIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  VolumeXIcon,
  SpeakerWaveIcon,
  PaintBrushIcon,
  CloudArrowUpIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  PlayIcon as PlayIconSolid
} from '@heroicons/react/24/solid';

// Community Prompt Index Data
const communityPrompts = [
  {
    id: 1,
    prompt: "iridescent prismatic crystal formation",
    hashtags: ["#iridescent", "#prismatic", "#crystal", "#fantasy"],
    category: "Art",
    type: "image",
    author: "AI_Artist_Pro",
    likes: 342,
    uses: 156,
    successRate: 89,
    createdAt: "2024-01-15",
    description: "Creates stunning crystal-like formations with rainbow reflections"
  },
  {
    id: 2,
    prompt: "cyberpunk neon-lit urban landscape at night",
    hashtags: ["#cyberpunk", "#neon", "#urban", "#night", "#futuristic"],
    category: "Art",
    type: "image",
    author: "CyberCreator",
    likes: 287,
    uses: 203,
    successRate: 92,
    createdAt: "2024-01-14",
    description: "Perfect for futuristic city scenes with vibrant neon lighting"
  },
  {
    id: 3,
    prompt: "ethereal ambient soundscape with celestial harmonies",
    hashtags: ["#ethereal", "#ambient", "#celestial", "#peaceful"],
    category: "Music",
    type: "music",
    author: "SoundAlchemist",
    likes: 198,
    uses: 89,
    successRate: 94,
    createdAt: "2024-01-13",
    description: "Generates beautiful ambient music perfect for relaxation"
  },
  {
    id: 4,
    prompt: "watercolor botanical illustration with delicate details",
    hashtags: ["#watercolor", "#botanical", "#delicate", "#illustration"],
    category: "Art",
    type: "image",
    author: "NatureArtist",
    likes: 445,
    uses: 278,
    successRate: 87,
    createdAt: "2024-01-12",
    description: "Creates beautiful botanical art in watercolor style"
  },
  {
    id: 5,
    prompt: "epic orchestral adventure theme with heroic melodies",
    hashtags: ["#orchestral", "#epic", "#adventure", "#heroic"],
    category: "Music",
    type: "music",
    author: "EpicComposer",
    likes: 356,
    uses: 123,
    successRate: 91,
    createdAt: "2024-01-11",
    description: "Perfect for creating cinematic, heroic music pieces"
  },
  {
    id: 6,
    prompt: "minimalist geometric abstract with bold colors",
    hashtags: ["#minimalist", "#geometric", "#abstract", "#bold"],
    category: "Art",
    type: "image",
    author: "MinimalMaster",
    likes: 234,
    uses: 145,
    successRate: 85,
    createdAt: "2024-01-10",
    description: "Clean, modern geometric designs with striking color palettes"
  },
  {
    id: 7,
    prompt: "vintage retro synthwave with nostalgic vibes",
    hashtags: ["#vintage", "#retro", "#synthwave", "#nostalgic"],
    category: "Music",
    type: "music",
    author: "RetroWave80s",
    likes: 289,
    uses: 167,
    successRate: 88,
    createdAt: "2024-01-09",
    description: "Creates authentic 80s synthwave with nostalgic atmosphere"
  }
];

// Prompt Index Component
export const PromptIndex = ({ isOpen, onClose, onSelectPrompt, contentType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [filteredPrompts, setFilteredPrompts] = useState(communityPrompts);
  const [newPrompt, setNewPrompt] = useState('');
  const [newHashtags, setNewHashtags] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    let filtered = communityPrompts.filter(prompt => {
      const matchesSearch = prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      const matchesType = contentType === 'all' || prompt.type === contentType;
      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort prompts
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.prompt.localeCompare(b.prompt));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'usage':
        filtered.sort((a, b) => b.uses - a.uses);
        break;
      case 'success':
        filtered.sort((a, b) => b.successRate - a.successRate);
        break;
      default:
        break;
    }

    setFilteredPrompts(filtered);
  }, [searchTerm, selectedCategory, sortBy, contentType]);

  const handleAddPrompt = () => {
    if (!newPrompt.trim() || !newHashtags.trim()) return;

    const hashtags = newHashtags.split(',').map(tag => 
      tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`
    );

    const prompt = {
      id: Date.now(),
      prompt: newPrompt,
      hashtags,
      category: contentType === 'image' ? 'Art' : 'Music',
      type: contentType,
      author: 'You',
      likes: 0,
      uses: 0,
      successRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      description: newDescription || 'User-contributed prompt'
    };

    // Add to community prompts (in real app, this would go to backend)
    communityPrompts.unshift(prompt);
    
    // Save to localStorage
    const savedPrompts = JSON.parse(localStorage.getItem('mirrorx-prompts') || '[]');
    localStorage.setItem('mirrorx-prompts', JSON.stringify([prompt, ...savedPrompts]));

    toast.success('Prompt added to community index!');
    setNewPrompt('');
    setNewHashtags('');
    setNewDescription('');
    setShowAddForm(false);
  };

  const handleUsePrompt = (prompt) => {
    // Increment usage count
    prompt.uses += 1;
    onSelectPrompt(prompt.prompt);
    onClose();
    toast.success(`Using prompt: "${prompt.prompt.substring(0, 30)}..."`);
  };

  const handleLikePrompt = (promptId) => {
    const prompt = communityPrompts.find(p => p.id === promptId);
    if (prompt) {
      prompt.likes += 1;
      toast.success('Prompt liked!');
    }
  };

  const categories = ['All', 'Art', 'Music'];
  const sortOptions = [
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'popularity', label: 'Most Liked' },
    { value: 'usage', label: 'Most Used' },
    { value: 'success', label: 'Success Rate' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Community Prompt Index</h2>
                <p className="text-gray-600 dark:text-gray-400">Discover successful AI prompts shared by the community</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search prompts or hashtags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <PlusIcon className="w-5 h-5 inline mr-2" />
                Add Prompt
              </button>
            </div>

            {/* Add Prompt Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
              >
                <h3 className="font-semibold mb-3">Add New Prompt to Community Index</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter your successful prompt..."
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Hashtags (comma-separated): iridescent, prismatic, crystal"
                    value={newHashtags}
                    onChange={(e) => setNewHashtags(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  <textarea
                    placeholder="Description (optional): Why this prompt works well..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows="2"
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddPrompt}
                      disabled={!newPrompt.trim() || !newHashtags.trim()}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add to Index
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${prompt.type === 'image' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                      <span className="text-xs text-gray-500 font-medium">{prompt.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 font-medium">{prompt.successRate}%</span>
                      <button
                        onClick={() => handleLikePrompt(prompt.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <HeartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="font-medium text-sm mb-2 leading-relaxed">{prompt.prompt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {prompt.hashtags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {prompt.hashtags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{prompt.hashtags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{prompt.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>by @{prompt.author}</span>
                    <span>{prompt.createdAt}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-xs text-gray-500">
                      <span>{prompt.likes} likes</span>
                      <span>{prompt.uses} uses</span>
                    </div>
                    <button
                      onClick={() => handleUsePrompt(prompt)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-xs"
                    >
                      Use This
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <SparklesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No prompts found matching your criteria</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const savedLogos = [
  {
    id: 1,
    name: 'Brand Logo 1',
    url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8Ymx1ZXwxNzUyNzQ5MDY1fDA&ixlib=rb-4.1.0&q=85&w=100&h=100',
    createdAt: '2024-01-15',
    transparent: true
  },
  {
    id: 2,
    name: 'Music Logo',
    url: 'https://images.unsplash.com/photo-1491951931722-5a446214b4e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8Ymx1ZXwxNzUyNzQ5MDY1fDA&ixlib=rb-4.1.0&q=85&w=100&h=100',
    createdAt: '2024-01-14',
    transparent: true
  },
  {
    id: 3,
    name: 'Art Studio Logo',
    url: 'https://images.unsplash.com/photo-1597075095400-fb3f0de70140?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8Ymx1ZXwxNzUyNzQ5MDY1fDA&ixlib=rb-4.1.0&q=85&w=100&h=100',
    createdAt: '2024-01-13',
    transparent: true
  }
];

// Logo Manager Component
export const LogoManager = ({ isOpen, onClose, onSelectLogo }) => {
  const [logos, setLogos] = useState(savedLogos);
  const [isCreating, setIsCreating] = useState(false);
  const [logoPrompt, setLogoPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newLogo, setNewLogo] = useState(null);
  const [logoName, setLogoName] = useState('');

  const handleGenerateLogo = async () => {
    if (!logoPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI logo generation
    setTimeout(() => {
      const generatedLogo = {
        url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8Ymx1ZXwxNzUyNzQ5MDY1fDA&ixlib=rb-4.1.0&q=85&w=100&h=100',
        prompt: logoPrompt,
        transparent: false
      };
      
      setNewLogo(generatedLogo);
      setIsGenerating(false);
      toast.success('Logo generated successfully!');
    }, 2000);
  };

  const handleMakeTransparent = () => {
    if (!newLogo) return;
    
    setNewLogo({
      ...newLogo,
      transparent: true
    });
    toast.success('Logo background made transparent!');
  };

  const handleSaveLogo = () => {
    if (!newLogo || !logoName.trim()) return;
    
    const savedLogo = {
      id: Date.now(),
      name: logoName,
      url: newLogo.url,
      createdAt: new Date().toISOString().split('T')[0],
      transparent: newLogo.transparent
    };
    
    setLogos([savedLogo, ...logos]);
    
    // Save to localStorage
    const existingLogos = JSON.parse(localStorage.getItem('mirrorx-logos') || '[]');
    localStorage.setItem('mirrorx-logos', JSON.stringify([savedLogo, ...existingLogos]));
    
    toast.success('Logo saved successfully!');
    setIsCreating(false);
    setNewLogo(null);
    setLogoName('');
    setLogoPrompt('');
  };

  const handleDeleteLogo = (logoId) => {
    const updatedLogos = logos.filter(logo => logo.id !== logoId);
    setLogos(updatedLogos);
    
    // Update localStorage
    localStorage.setItem('mirrorx-logos', JSON.stringify(updatedLogos));
    toast.success('Logo deleted successfully!');
  };

  const handleSelectLogo = (logo) => {
    onSelectLogo(logo);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Logo Manager</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setIsCreating(false)}
                className={`px-4 py-2 rounded-full ${
                  !isCreating
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Saved Logos
              </button>
              <button
                onClick={() => setIsCreating(true)}
                className={`px-4 py-2 rounded-full ${
                  isCreating
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Create New Logo
              </button>
            </div>

            {!isCreating ? (
              // Saved Logos Grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {logos.map((logo) => (
                  <div
                    key={logo.id}
                    className="relative group bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square mb-3 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="w-full h-full object-contain"
                        style={{
                          backgroundColor: logo.transparent ? 'transparent' : 'white',
                          backgroundImage: logo.transparent ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                          backgroundSize: logo.transparent ? '20px 20px' : 'auto',
                          backgroundPosition: logo.transparent ? '0 0, 0 10px, 10px -10px, -10px 0px' : 'auto'
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium truncate">{logo.name}</p>
                    <p className="text-xs text-gray-500">{logo.createdAt}</p>
                    {logo.transparent && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Transparent
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={() => handleSelectLogo(logo)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => handleDeleteLogo(logo.id)}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Create New Logo Section
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <PaintBrushIcon className="w-5 h-5 mr-2 text-blue-500" />
                    AI Logo Generation
                  </h3>
                  <input
                    type="text"
                    value={logoPrompt}
                    onChange={(e) => setLogoPrompt(e.target.value)}
                    placeholder="Describe your logo (e.g., 'modern tech company logo with blue and silver colors')"
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mb-3"
                  />
                  <button
                    onClick={handleGenerateLogo}
                    disabled={isGenerating || !logoPrompt.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isGenerating ? 'Generating Logo...' : 'Generate Logo'}
                  </button>
                </div>

                {newLogo && (
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-3">Generated Logo:</h4>
                    <div className="flex space-x-4">
                      <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                        <img
                          src={newLogo.url}
                          alt="Generated Logo"
                          className="w-full h-full object-contain"
                          style={{
                            backgroundColor: newLogo.transparent ? 'transparent' : 'white',
                            backgroundImage: newLogo.transparent ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                            backgroundSize: newLogo.transparent ? '20px 20px' : 'auto',
                            backgroundPosition: newLogo.transparent ? '0 0, 0 10px, 10px -10px, -10px 0px' : 'auto'
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={handleMakeTransparent}
                            disabled={newLogo.transparent}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {newLogo.transparent ? 'Background Removed' : 'Remove Background'}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={logoName}
                          onChange={(e) => setLogoName(e.target.value)}
                          placeholder="Enter logo name"
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                        <button
                          onClick={handleSaveLogo}
                          disabled={!logoName.trim()}
                          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Save Logo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Logo Overlay Component
export const LogoOverlay = ({ 
  isOpen, 
  onClose, 
  onApplyLogo, 
  selectedLogo, 
  imageUrl 
}) => {
  const [logoSize, setLogoSize] = useState(60);
  const [logoOpacity, setLogoOpacity] = useState(0.8);
  const [showPreview, setShowPreview] = useState(true);

  const handleApply = () => {
    onApplyLogo({
      logo: selectedLogo,
      size: logoSize,
      opacity: logoOpacity
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && selectedLogo && (
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
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Logo Overlay Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Preview Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Preview</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                >
                  {showPreview ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
                </button>
              </div>
              {showPreview && (
                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Base image"
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute"
                    style={{
                      bottom: '10px',
                      left: '10px',
                      width: `${logoSize}px`,
                      height: `${logoSize}px`,
                      opacity: logoOpacity
                    }}
                  >
                    <img
                      src={selectedLogo.url}
                      alt={selectedLogo.name}
                      className="w-full h-full object-contain"
                      style={{
                        backgroundColor: selectedLogo.transparent ? 'transparent' : 'white',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Logo Size: {logoSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  value={logoSize}
                  onChange={(e) => setLogoSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>20px</span>
                  <span>150px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Logo Opacity: {Math.round(logoOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={logoOpacity}
                  onChange={(e) => setLogoOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Selected Logo:</strong> {selectedLogo.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Logo will be positioned at bottom-left corner with 10px margin
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply Logo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const mockTweets = [
  {
    id: 1,
    user: {
      name: 'AI Art Creator',
      username: 'aiartist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c7c6?w=40&h=40&fit=crop&crop=face',
      verified: true
    },
    content: 'Just created this amazing digital art using mirrorize.ai! The AI understood my vision perfectly. #AIArt #DigitalCreativity',
    timestamp: '2h',
    likes: 234,
    retweets: 45,
    comments: 23,
    image: 'https://images.unsplash.com/photo-1590870845755-4c3c46615dd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxBSSUyMGFydHxlbnwwfHx8Ymx1ZXwxNzUyNzg3ODQwfDA&ixlib=rb-4.1.0&q=85',
    type: 'image',
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: 2,
    user: {
      name: 'Music Generator',
      username: 'musicai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      verified: true
    },
    content: 'Composed this ambient track using mirrorize.ai - "Cosmic Dreams". The AI really captured the ethereal vibe I was going for! 🎵',
    timestamp: '4h',
    likes: 567,
    retweets: 89,
    comments: 34,
    music: {
      title: 'Cosmic Dreams',
      duration: '2:34',
      waveform: 'https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg',
      isPlaying: false
    },
    type: 'music',
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true
  },
  {
    id: 3,
    user: {
      name: 'Creative Studio',
      username: 'creativestudio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      verified: true
    },
    content: 'Our latest project combines AI-generated visuals with custom music. The future of creative content is here! What do you think?',
    timestamp: '6h',
    likes: 1234,
    retweets: 234,
    comments: 67,
    image: 'https://images.unsplash.com/photo-1611500815043-14c764f7d5d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxBSSUyMGFydHxlbnwwfHx8Ymx1ZXwxNzUyNzg3ODQwfDA&ixlib=rb-4.1.0&q=85',
    type: 'image',
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false
  },
  {
    id: 4,
    user: {
      name: 'TechInfluencer',
      username: 'techguru',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true
    },
    content: 'The integration between social media and AI creation tools is revolutionary. Mirrorize.ai is changing how we think about content creation. What amazing projects are you working on?',
    timestamp: '8h',
    likes: 89,
    retweets: 23,
    comments: 12,
    type: 'text',
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  }
];

const trendingTopics = [
  { name: '#AIArt', posts: '125K' },
  { name: '#MirrorizeAI', posts: '89K' },
  { name: '#DigitalCreativity', posts: '67K' },
  { name: '#AIMusic', posts: '45K' },
  { name: '#CreativeAI', posts: '34K' }
];

const suggestedUsers = [
  {
    name: 'AI Pioneer',
    username: 'aipioneer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    verified: true
  },
  {
    name: 'Digital Artist',
    username: 'digitalartist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    verified: false
  },
  {
    name: 'Music Creator',
    username: 'musiccreator',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
    verified: true
  }
];

// Navigation Component
export const Navigation = ({ darkMode, setDarkMode, currentUser }) => {
  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: MagnifyingGlassIcon, label: 'Explore' },
    { icon: BellIcon, label: 'Notifications' },
    { icon: InboxIcon, label: 'Messages' },
    { icon: BookmarkIcon, label: 'Bookmarks' },
    { icon: UserIcon, label: 'Profile' },
    { icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <div className="h-screen sticky top-0 w-64 p-4 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            MirrorX
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-full transition-all duration-200 ${
                item.active
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-600" />
          )}
          <span className="font-medium">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium text-sm">{currentUser.name}</p>
            <p className="text-gray-500 text-xs">@{currentUser.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Creation Modal Component
export const AICreationModal = ({ isOpen, onClose, onCreatePost }) => {
  const [creationType, setCreationType] = useState('text');
  const [content, setContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showLogoManager, setShowLogoManager] = useState(false);
  const [showLogoOverlay, setShowLogoOverlay] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [appliedLogo, setAppliedLogo] = useState(null);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with delay
    setTimeout(() => {
      if (creationType === 'image') {
        setGeneratedContent({
          type: 'image',
          url: 'https://images.unsplash.com/photo-1590870845755-4c3c46615dd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxBSSUyMGFydHxlbnwwfHx8Ymx1ZXwxNzUyNzg3ODQwfDA&ixlib=rb-4.1.0&q=85',
          prompt: aiPrompt
        });
      } else if (creationType === 'music') {
        setGeneratedContent({
          type: 'music',
          title: `AI Generated: ${aiPrompt}`,
          duration: '2:15',
          waveform: 'https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg',
          prompt: aiPrompt
        });
      }
      setIsGenerating(false);
      toast.success('AI content generated successfully!');
    }, 2000);
  };

  const handleSelectLogo = (logo) => {
    setSelectedLogo(logo);
    setShowLogoManager(false);
    if (generatedContent && (generatedContent.type === 'image' || generatedContent.type === 'music')) {
      setShowLogoOverlay(true);
    }
  };

  const handleApplyLogo = (logoSettings) => {
    setAppliedLogo(logoSettings);
    toast.success('Logo applied successfully!');
  };

  const handlePost = () => {
    if (!content.trim() && !generatedContent) return;
    
    const newPost = {
      content,
      generatedContent: generatedContent ? {
        ...generatedContent,
        appliedLogo
      } : null,
      timestamp: new Date().toISOString()
    };
    
    onCreatePost(newPost);
    onClose();
    
    // Reset form
    setContent('');
    setAiPrompt('');
    setGeneratedContent(null);
    setCreationType('text');
    setSelectedLogo(null);
    setAppliedLogo(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create with AI</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content Type Selection */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setCreationType('text')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    creationType === 'text'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                  <span>Text</span>
                </button>
                <button
                  onClick={() => setCreationType('image')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    creationType === 'image'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <PhotoIcon className="w-5 h-5" />
                  <span>AI Art</span>
                </button>
                <button
                  onClick={() => setCreationType('music')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    creationType === 'music'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <MusicalNoteIcon className="w-5 h-5" />
                  <span>AI Music</span>
                </button>
              </div>

              {/* Content Input */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                rows="3"
              />

              {/* AI Generation Section */}
              {creationType !== 'text' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2 text-blue-500" />
                    AI {creationType === 'image' ? 'Art' : 'Music'} Generation
                  </h3>
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={`Describe the ${creationType} you want to create...`}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mb-3"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isGenerating ? 'Generating...' : `Generate ${creationType === 'image' ? 'Art' : 'Music'}`}
                  </button>
                </div>
              )}

              {/* Generated Content Preview */}
              {generatedContent && (
                <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Generated Content:</h4>
                    <button
                      onClick={() => setShowLogoManager(true)}
                      className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors text-sm"
                    >
                      <PaintBrushIcon className="w-4 h-4" />
                      <span>Add Logo</span>
                    </button>
                  </div>
                  
                  {generatedContent.type === 'image' ? (
                    <div className="relative">
                      <img
                        src={generatedContent.url}
                        alt="Generated AI Art"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {appliedLogo && (
                        <div 
                          className="absolute"
                          style={{
                            bottom: '10px',
                            left: '10px',
                            width: `${appliedLogo.size}px`,
                            height: `${appliedLogo.size}px`,
                            opacity: appliedLogo.opacity
                          }}
                        >
                          <img
                            src={appliedLogo.logo.url}
                            alt={appliedLogo.logo.name}
                            className="w-full h-full object-contain"
                            style={{
                              backgroundColor: appliedLogo.logo.transparent ? 'transparent' : 'white',
                              borderRadius: '8px'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <MusicalNoteIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{generatedContent.title}</p>
                          <p className="text-sm text-gray-500">{generatedContent.duration}</p>
                        </div>
                      </div>
                      {appliedLogo && (
                        <div 
                          className="absolute"
                          style={{
                            bottom: '10px',
                            left: '10px',
                            width: `${appliedLogo.size}px`,
                            height: `${appliedLogo.size}px`,
                            opacity: appliedLogo.opacity
                          }}
                        >
                          <img
                            src={appliedLogo.logo.url}
                            alt={appliedLogo.logo.name}
                            className="w-full h-full object-contain"
                            style={{
                              backgroundColor: appliedLogo.logo.transparent ? 'transparent' : 'white',
                              borderRadius: '8px'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {appliedLogo && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Logo applied:</span> {appliedLogo.logo.name} 
                      <span className="ml-2">({appliedLogo.size}px, {Math.round(appliedLogo.opacity * 100)}% opacity)</span>
                    </div>
                  )}
                </div>
              )}

              {/* Post Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handlePost}
                  disabled={!content.trim() && !generatedContent}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Manager Modal */}
      <LogoManager
        isOpen={showLogoManager}
        onClose={() => setShowLogoManager(false)}
        onSelectLogo={handleSelectLogo}
      />

      {/* Logo Overlay Modal */}
      <LogoOverlay
        isOpen={showLogoOverlay}
        onClose={() => setShowLogoOverlay(false)}
        onApplyLogo={handleApplyLogo}
        selectedLogo={selectedLogo}
        imageUrl={generatedContent?.url || generatedContent?.waveform}
      />
    </>
  );
};

// Tweet Component
export const Tweet = ({ tweet, onLike, onRetweet, onBookmark }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMusicPlay = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Music paused' : 'Music playing');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
    >
      <div className="flex space-x-3">
        <img
          src={tweet.user.avatar}
          alt={tweet.user.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold">{tweet.user.name}</h3>
            {tweet.user.verified && (
              <SparklesIcon className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-gray-500">@{tweet.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet.timestamp}</span>
          </div>
          
          <p className="mt-2 text-gray-900 dark:text-gray-100">{tweet.content}</p>
          
          {/* Media Content */}
          {tweet.type === 'image' && tweet.image && (
            <div className="mt-3 rounded-2xl overflow-hidden relative">
              <img
                src={tweet.image}
                alt="Tweet image"
                className="w-full h-80 object-cover"
              />
              {tweet.generatedContent?.appliedLogo && (
                <div 
                  className="absolute"
                  style={{
                    bottom: '10px',
                    left: '10px',
                    width: `${tweet.generatedContent.appliedLogo.size}px`,
                    height: `${tweet.generatedContent.appliedLogo.size}px`,
                    opacity: tweet.generatedContent.appliedLogo.opacity
                  }}
                >
                  <img
                    src={tweet.generatedContent.appliedLogo.logo.url}
                    alt={tweet.generatedContent.appliedLogo.logo.name}
                    className="w-full h-full object-contain"
                    style={{
                      backgroundColor: tweet.generatedContent.appliedLogo.logo.transparent ? 'transparent' : 'white',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              )}
            </div>
          )}
          
          {tweet.type === 'music' && tweet.music && (
            <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl relative">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleMusicPlay}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6 text-white" />
                  ) : (
                    <PlayIcon className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="font-medium">{tweet.music.title}</p>
                  <p className="text-sm text-gray-500">{tweet.music.duration}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full">
                    <SpeakerWaveIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 h-16 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">♪ ♫ ♪ ♫ ♪ ♫ ♪</span>
              </div>
              {tweet.generatedContent?.appliedLogo && (
                <div 
                  className="absolute"
                  style={{
                    bottom: '10px',
                    left: '10px',
                    width: `${tweet.generatedContent.appliedLogo.size}px`,
                    height: `${tweet.generatedContent.appliedLogo.size}px`,
                    opacity: tweet.generatedContent.appliedLogo.opacity
                  }}
                >
                  <img
                    src={tweet.generatedContent.appliedLogo.logo.url}
                    alt={tweet.generatedContent.appliedLogo.logo.name}
                    className="w-full h-full object-contain"
                    style={{
                      backgroundColor: tweet.generatedContent.appliedLogo.logo.transparent ? 'transparent' : 'white',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Engagement Actions */}
          <div className="flex items-center justify-between mt-4 max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <ChatBubbleOvalLeftIcon className="w-5 h-5" />
              <span className="text-sm">{tweet.comments}</span>
            </button>
            
            <button
              onClick={() => onRetweet(tweet.id)}
              className={`flex items-center space-x-2 transition-colors ${
                tweet.isRetweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
              }`}
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
              <span className="text-sm">{tweet.retweets}</span>
            </button>
            
            <button
              onClick={() => onLike(tweet.id)}
              className={`flex items-center space-x-2 transition-colors ${
                tweet.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              {tweet.isLiked ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{tweet.likes}</span>
            </button>
            
            <button
              onClick={() => onBookmark(tweet.id)}
              className={`transition-colors ${
                tweet.isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tweet.isBookmarked ? (
                <BookmarkIconSolid className="w-5 h-5" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
            
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sidebar Component
export const Sidebar = () => {
  return (
    <div className="w-80 p-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search MirrorX"
          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>

      {/* Trending */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Trending in AI</h2>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.name} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
              <p className="font-medium text-blue-500">{topic.name}</p>
              <p className="text-sm text-gray-500">{topic.posts} posts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.username} className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <p className="font-medium">{user.name}</p>
                  {user.verified && (
                    <SparklesIcon className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <button className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Feed Component
export const Feed = ({ darkMode }) => {
  const [tweets, setTweets] = useState(mockTweets);
  const [showAIModal, setShowAIModal] = useState(false);
  
  const currentUser = {
    name: 'You',
    username: 'yourhandle',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  };

  const handleLike = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { 
            ...tweet, 
            isLiked: !tweet.isLiked,
            likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1
          }
        : tweet
    ));
  };

  const handleRetweet = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { 
            ...tweet, 
            isRetweeted: !tweet.isRetweeted,
            retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1
          }
        : tweet
    ));
  };

  const handleBookmark = (tweetId) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, isBookmarked: !tweet.isBookmarked }
        : tweet
    ));
  };

  const handleCreatePost = (newPost) => {
    const tweet = {
      id: Date.now(),
      user: currentUser,
      content: newPost.content,
      timestamp: 'now',
      likes: 0,
      retweets: 0,
      comments: 0,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false,
      type: newPost.generatedContent?.type || 'text',
      generatedContent: newPost.generatedContent
    };

    if (newPost.generatedContent?.type === 'image') {
      tweet.image = newPost.generatedContent.url;
    } else if (newPost.generatedContent?.type === 'music') {
      tweet.music = newPost.generatedContent;
    }

    setTweets([tweet, ...tweets]);
    toast.success('Post created successfully!');
  };

  return (
    <div className="flex-1 max-w-2xl border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Quick Post */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <button
              onClick={() => setShowAIModal(true)}
              className="w-full p-4 text-left text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              What's happening?
            </button>
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAIModal(true)}
                  className="flex items-center space-x-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-full transition-colors"
                >
                  <PhotoIcon className="w-5 h-5" />
                  <span className="text-sm">AI Art</span>
                </button>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="flex items-center space-x-2 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 p-2 rounded-full transition-colors"
                >
                  <MusicalNoteIcon className="w-5 h-5" />
                  <span className="text-sm">AI Music</span>
                </button>
              </div>
              <button
                onClick={() => setShowAIModal(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            onLike={handleLike}
            onRetweet={handleRetweet}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {/* AI Creation Modal */}
      <AICreationModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
};