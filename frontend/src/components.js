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

// Mock data for the Twitter clone
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

  const handlePost = () => {
    if (!content.trim() && !generatedContent) return;
    
    const newPost = {
      content,
      generatedContent,
      timestamp: new Date().toISOString()
    };
    
    onCreatePost(newPost);
    onClose();
    
    // Reset form
    setContent('');
    setAiPrompt('');
    setGeneratedContent(null);
    setCreationType('text');
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
                <h4 className="font-semibold mb-3">Generated Content:</h4>
                {generatedContent.type === 'image' ? (
                  <img
                    src={generatedContent.url}
                    alt="Generated AI Art"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MusicalNoteIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{generatedContent.title}</p>
                        <p className="text-sm text-gray-500">{generatedContent.duration}</p>
                      </div>
                    </div>
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
            <div className="mt-3 rounded-2xl overflow-hidden">
              <img
                src={tweet.image}
                alt="Tweet image"
                className="w-full h-80 object-cover"
              />
            </div>
          )}
          
          {tweet.type === 'music' && tweet.music && (
            <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
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
      type: newPost.generatedContent?.type || 'text'
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