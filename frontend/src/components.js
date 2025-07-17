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
  EyeSlashIcon,
  LockClosedIcon,
  UserPlusIcon,
  AtSymbolIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  PlayIcon as PlayIconSolid
} from '@heroicons/react/24/solid';

// Authentication and User Management
const mockUsers = [
  {
    id: 1,
    username: 'aiartist_pro',
    email: 'alex@example.com',
    password: 'password123',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c7c6?w=40&h=40&fit=crop&crop=face',
    bio: 'AI Artist & Creative Technologist',
    joinDate: '2024-01-10',
    followers: 1234,
    following: 567,
    posts: 89,
    verified: true,
    badges: ['🏆', '🎨', '⚡']
  },
  {
    id: 2,
    username: 'music_master',
    email: 'jordan@example.com',
    password: 'music456',
    name: 'Jordan Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    bio: 'AI Music Composer & Sound Designer',
    joinDate: '2024-01-08',
    followers: 892,
    following: 234,
    posts: 67,
    verified: true,
    badges: ['🎵', '🌟', '💫']
  }
];

// Authentication Component
export const AuthPage = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isSignUp) {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.username === formData.username || u.email === formData.email);
        if (existingUser) {
          setErrors({ username: 'Username or email already exists' });
          setIsLoading(false);
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
          bio: 'New DOMin8X creator',
          joinDate: new Date().toISOString().split('T')[0],
          followers: 0,
          following: 0,
          posts: 0,
          verified: false,
          badges: []
        };

        mockUsers.push(newUser);
        localStorage.setItem('domin8x-user', JSON.stringify(newUser));
        toast.success('Account created successfully!');
        onAuthSuccess(newUser);
      } else {
        // Sign in
        const user = mockUsers.find(u => 
          (u.username === formData.username || u.email === formData.username) && 
          u.password === formData.password
        );

        if (user) {
          localStorage.setItem('domin8x-user', JSON.stringify(user));
          toast.success('Welcome back!');
          onAuthSuccess(user);
        } else {
          setErrors({ username: 'Invalid username/email or password' });
        }
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              DOMin8X
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              {isSignUp ? 'Username' : 'Username or Email'}
            </label>
            <div className="relative">
              <AtSymbolIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={isSignUp ? 'Choose a username' : 'Enter username or email'}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                  errors.username ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                }`}
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <AtSymbolIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                  errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {isSignUp ? <UserPlusIcon className="w-5 h-5" /> : <ArrowRightOnRectangleIcon className="w-5 h-5" />}
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Demo Accounts:</p>
          <div className="space-y-1 text-xs">
            <p><strong>Username:</strong> aiartist_pro <strong>Password:</strong> password123</p>
            <p><strong>Username:</strong> music_master <strong>Password:</strong> music456</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// User Profile Component
export const UserProfile = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    bio: user.bio,
    avatar: user.avatar
  });

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    onUpdateProfile(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          {user.verified && (
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full text-center text-xl font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <textarea
              value={editData.bio}
              onChange={(e) => setEditData({...editData, bio: e.target.value})}
              rows="2"
              className="w-full text-center text-gray-600 dark:text-gray-400 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 resize-none"
            />
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{user.bio}</p>
            <div className="flex justify-center space-x-1 mt-2">
              {user.badges.map((badge, index) => (
                <span key={index} className="text-lg">{badge}</span>
              ))}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-xl font-bold">{user.posts}</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
        <div>
          <div className="text-xl font-bold">{user.followers}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div>
          <div className="text-xl font-bold">{user.following}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500">Joined {user.joinDate}</p>
      </div>
    </div>
  );
};
const challenges = [
  {
    id: 1,
    title: "AI Art Challenge: Futuristic Cities",
    type: "Art",
    category: "image",
    description: "Create stunning AI art depicting futuristic cityscapes with neon lights and flying vehicles",
    hashtags: ["#FuturisticCity", "#AIArt", "#Cyberpunk", "#NeonLights"],
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    status: "active",
    prize: "Winner gets featured + $100 credit",
    participants: 156,
    submissions: 89,
    creator: "MirrorX Team",
    rules: "Must use AI generation, original prompts only, single image submissions",
    judgingCriteria: "Creativity, Technical Quality, Theme Adherence"
  },
  {
    id: 2,
    title: "Epic Music Challenge: Hero's Journey",
    type: "Music",
    category: "music",
    description: "Compose an epic orchestral piece that tells the story of a hero's adventure",
    hashtags: ["#EpicMusic", "#HeroJourney", "#Orchestral", "#Adventure"],
    startDate: "2024-01-10",
    endDate: "2024-01-20",
    status: "active",
    prize: "Winner gets music license deal",
    participants: 78,
    submissions: 45,
    creator: "SoundMasters Guild",
    rules: "2-3 minute compositions, orchestral style, AI-generated with personal touch",
    judgingCriteria: "Musical Composition, Emotional Impact, Technical Execution"
  },
  {
    id: 3,
    title: "Sports Photography: Motion Capture",
    type: "Sports",
    category: "image",
    description: "Capture or create dynamic sports moments showing peak athletic performance",
    hashtags: ["#SportsPhoto", "#MotionCapture", "#Athletics", "#Dynamic"],
    startDate: "2024-01-05",
    endDate: "2024-01-15",
    status: "completed",
    prize: "Sports equipment bundle",
    participants: 234,
    submissions: 167,
    creator: "SportsFan Community",
    rules: "Sports theme, action shots, can be AI-generated or real photography",
    judgingCriteria: "Action Capture, Composition, Impact"
  },
  {
    id: 4,
    title: "Daily Prompt Challenge: Iridescent Dreams",
    type: "Art",
    category: "image",
    description: "Create art using 'iridescent' theme - anything that shimmers and shifts colors",
    hashtags: ["#Iridescent", "#DailyChallenge", "#Prismatic", "#Shimmer"],
    startDate: "2024-01-16",
    endDate: "2024-01-16",
    status: "active",
    prize: "Daily winner badge + spotlight",
    participants: 89,
    submissions: 56,
    creator: "Daily Challenges Bot",
    rules: "One submission per user, must include iridescent elements",
    judgingCriteria: "Use of iridescent effects, creativity, visual appeal"
  }
];

const leaderboardData = [
  {
    challengeId: 1,
    rankings: [
      {
        rank: 1,
        userId: "aiartist_pro",
        username: "aiartist_pro",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c7c6?w=40&h=40&fit=crop&crop=face",
        score: 2847,
        submissions: 3,
        votes: 234,
        badges: ["🏆", "🎨", "⚡"],
        latestSubmission: "Neon Metropolis 2099"
      },
      {
        rank: 2,
        userId: "cyber_creator",
        username: "cyber_creator",
        name: "Jordan Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        score: 2534,
        submissions: 2,
        votes: 198,
        badges: ["🥈", "🎨", "🌟"],
        latestSubmission: "Digital Skyline Dreams"
      },
      {
        rank: 3,
        userId: "future_artist",
        username: "future_artist",
        name: "Sam Rivera",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        score: 2156,
        submissions: 4,
        votes: 167,
        badges: ["🥉", "🎨", "💫"],
        latestSubmission: "Cyber Streets 3000"
      },
      {
        rank: 4,
        userId: "neon_master",
        username: "neon_master",
        name: "Riley Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        score: 1876,
        submissions: 2,
        votes: 145,
        badges: ["🎨", "⚡"],
        latestSubmission: "Holographic City"
      },
      {
        rank: 5,
        userId: "pixel_pioneer",
        username: "pixel_pioneer",
        name: "Casey Wong",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
        score: 1654,
        submissions: 1,
        votes: 134,
        badges: ["🎨", "🌟"],
        latestSubmission: "Tomorrow's Horizon"
      }
    ]
  },
  {
    challengeId: 2,
    rankings: [
      {
        rank: 1,
        userId: "epic_composer",
        username: "epic_composer",
        name: "Morgan Lee",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
        score: 3124,
        submissions: 2,
        votes: 267,
        badges: ["🏆", "🎵", "⚡"],
        latestSubmission: "Legend of the Crystal Sword"
      },
      {
        rank: 2,
        userId: "sound_alchemist",
        username: "sound_alchemist",
        name: "Taylor Singh",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        score: 2876,
        submissions: 3,
        votes: 234,
        badges: ["🥈", "🎵", "🌟"],
        latestSubmission: "Rise of the Phoenix"
      },
      {
        rank: 3,
        userId: "orchestra_ai",
        username: "orchestra_ai",
        name: "Quinn Adams",
        avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=40&h=40&fit=crop&crop=face",
        score: 2543,
        submissions: 1,
        votes: 203,
        badges: ["🥉", "🎵", "💫"],
        latestSubmission: "Destiny's Call"
      }
    ]
  }
];

// Leaderboard Component
export const Leaderboard = ({ isOpen, onClose }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);

  const getCurrentRankings = () => {
    return leaderboardData.find(data => data.challengeId === selectedChallenge.id)?.rankings || [];
  };

  const getFilteredChallenges = () => {
    switch (activeTab) {
      case 'active':
        return challenges.filter(c => c.status === 'active');
      case 'completed':
        return challenges.filter(c => c.status === 'completed');
      case 'upcoming':
        return challenges.filter(c => c.status === 'upcoming');
      default:
        return challenges;
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleJoinChallenge = (challenge) => {
    toast.success(`Joined challenge: ${challenge.title}!`);
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
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">🏆 Challenge Leaderboards</h2>
                <p className="text-gray-600 dark:text-gray-400">Compete, create, and climb the rankings!</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Challenges List */}
              <div className="lg:col-span-1">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeTab === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeTab === 'completed'
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setShowCreateChallenge(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                  >
                    Create
                  </button>
                </div>

                <div className="space-y-3">
                  {getFilteredChallenges().map((challenge) => (
                    <div
                      key={challenge.id}
                      onClick={() => setSelectedChallenge(challenge)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm">{challenge.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(challenge.status)}`}>
                          {challenge.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{challenge.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{challenge.participants} participants</span>
                        <span>{challenge.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {challenge.hashtags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Details & Leaderboard */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedChallenge.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedChallenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedChallenge.status)}`}>
                        {selectedChallenge.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedChallenge.participants}</div>
                      <div className="text-sm text-gray-500">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedChallenge.submissions}</div>
                      <div className="text-sm text-gray-500">Submissions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedChallenge.endDate}</div>
                      <div className="text-sm text-gray-500">End Date</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">🏆</div>
                      <div className="text-sm text-gray-500">Prize</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mb-4">
                    {selectedChallenge.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">Prize: {selectedChallenge.prize}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Rules:</strong> {selectedChallenge.rules}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Judging:</strong> {selectedChallenge.judgingCriteria}
                    </p>
                  </div>

                  {selectedChallenge.status === 'active' && (
                    <button
                      onClick={() => handleJoinChallenge(selectedChallenge)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                    >
                      Join Challenge
                    </button>
                  )}
                </div>

                {/* Leaderboard */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">🏆 Leaderboard</h3>
                  <div className="space-y-3">
                    {getCurrentRankings().map((participant) => (
                      <motion.div
                        key={participant.userId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center space-x-4 p-4 rounded-lg ${
                          participant.rank <= 3
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div className="text-2xl">{getRankEmoji(participant.rank)}</div>
                          <div className="text-center text-sm font-bold">#{participant.rank}</div>
                        </div>
                        
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-12 h-12 rounded-full"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{participant.name}</h4>
                            <span className="text-gray-500 text-sm">@{participant.username}</span>
                            <div className="flex space-x-1">
                              {participant.badges.map((badge, index) => (
                                <span key={index} className="text-sm">{badge}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Latest: {participant.latestSubmission}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{participant.score.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {participant.votes} votes • {participant.submissions} submissions
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Challenge Creation Component
export const ChallengeCreator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Art',
    category: 'image',
    description: '',
    hashtags: '',
    startDate: '',
    endDate: '',
    prize: '',
    rules: '',
    judgingCriteria: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newChallenge = {
      id: Date.now(),
      ...formData,
      hashtags: formData.hashtags.split(',').map(tag => 
        tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`
      ),
      status: 'upcoming',
      participants: 0,
      submissions: 0,
      creator: 'You'
    };

    // Add to challenges array (in real app, this would go to backend)
    challenges.unshift(newChallenge);
    
    toast.success('Challenge created successfully!');
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      type: 'Art',
      category: 'image',
      description: '',
      hashtags: '',
      startDate: '',
      endDate: '',
      prize: '',
      rules: '',
      judgingCriteria: ''
    });
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
              <h2 className="text-2xl font-bold">Create New Challenge</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Challenge Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., AI Art Challenge: Futuristic Cities"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Art">Art</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Photography">Photography</option>
                    <option value="Writing">Writing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="image">Image</option>
                    <option value="music">Music</option>
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your challenge..."
                  rows="3"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hashtags</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({...formData, hashtags: e.target.value})}
                  placeholder="e.g., futuristic, cyberpunk, neon (comma-separated)"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Prize</label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => setFormData({...formData, prize: e.target.value})}
                  placeholder="e.g., Winner gets featured + $100 credit"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rules</label>
                <textarea
                  value={formData.rules}
                  onChange={(e) => setFormData({...formData, rules: e.target.value})}
                  placeholder="Challenge rules and requirements..."
                  rows="2"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Judging Criteria</label>
                <textarea
                  value={formData.judgingCriteria}
                  onChange={(e) => setFormData({...formData, judgingCriteria: e.target.value})}
                  placeholder="How will submissions be judged?"
                  rows="2"
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Challenge
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
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
    const existingLogos = JSON.parse(localStorage.getItem('domin8x-logos') || '[]');
    localStorage.setItem('domin8x-logos', JSON.stringify([savedLogo, ...existingLogos]));
    
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
export const Navigation = ({ darkMode, setDarkMode, currentUser, onSignOut, onShowLeaderboard }) => {
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: MagnifyingGlassIcon, label: 'Explore' },
    { icon: BellIcon, label: 'Notifications' },
    { icon: InboxIcon, label: 'Messages' },
    { icon: BookmarkIcon, label: 'Bookmarks' },
    { icon: UserIcon, label: 'Profile', onClick: () => setShowProfile(true) },
    { icon: Cog6ToothIcon, label: 'Settings' }
  ];

  const handleSignOut = () => {
    localStorage.removeItem('mirrorx-user');
    onSignOut();
    toast.success('Signed out successfully!');
  };

  return (
    <>
      <div className="h-screen sticky top-0 w-64 p-4 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              DOMin8X
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
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
            
            {/* Leaderboard Button */}
            <button
              onClick={onShowLeaderboard}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
            >
              <div className="w-6 h-6 flex items-center justify-center">🏆</div>
              <span className="font-medium">Leaderboard</span>
            </button>
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
          <div className="flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer">
            <div 
              className="flex items-center space-x-3 flex-1"
              onClick={() => setShowProfile(true)}
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full"
                />
                {currentUser.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-gray-500 text-xs">@{currentUser.username}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-red-500 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
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
              className="relative"
            >
              <button
                onClick={() => setShowProfile(false)}
                className="absolute -top-4 -right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <UserProfile 
                user={currentUser} 
                onUpdateProfile={(updatedUser) => {
                  localStorage.setItem('mirrorx-user', JSON.stringify(updatedUser));
                  // Update current user state in parent component
                  window.location.reload(); // Simple refresh for demo
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  const [showPromptIndex, setShowPromptIndex] = useState(false);
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

  const handleSelectPrompt = (prompt) => {
    setAiPrompt(prompt);
    setShowPromptIndex(false);
    toast.success('Prompt selected from community index!');
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
                  <div className="relative">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={`Describe the ${creationType} you want to create...`}
                      className="w-full p-3 pr-12 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mb-3"
                    />
                    <button
                      onClick={() => setShowPromptIndex(true)}
                      className="absolute right-3 top-3 text-purple-500 hover:text-purple-600 transition-colors"
                      title="Browse Community Prompts"
                    >
                      <MagnifyingGlassIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !aiPrompt.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isGenerating ? 'Generating...' : `Generate ${creationType === 'image' ? 'Art' : 'Music'}`}
                    </button>
                    <button
                      onClick={() => setShowPromptIndex(true)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    >
                      Browse Prompts
                    </button>
                  </div>
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

      {/* Prompt Index Modal */}
      <PromptIndex
        isOpen={showPromptIndex}
        onClose={() => setShowPromptIndex(false)}
        onSelectPrompt={handleSelectPrompt}
        contentType={creationType}
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