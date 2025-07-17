import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  SparklesIcon,
  LinkIcon,
  CodeBracketIcon,
  EyeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TabletIcon,
  PaintBrushIcon,
  SwatchIcon,
  PhotoIcon,
  TypeIcon,
  RectangleStackIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  PauseIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  CogIcon,
  CloudArrowDownIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  Bars3Icon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// Main Cur10saX Website Builder Component
const Cur10saXBuilder = () => {
  const [currentStep, setCurrentStep] = useState('import');
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importedWebsite, setImportedWebsite] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [editHistory, setEditHistory] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(0);

  // Website import simulation
  const handleImportWebsite = async () => {
    if (!importUrl.trim()) {
      toast.error('Please enter a website URL');
      return;
    }

    setIsImporting(true);
    
    // Simulate website import process
    setTimeout(() => {
      const mockWebsite = {
        url: importUrl,
        title: 'Imported Website',
        elements: [
          {
            id: 'header',
            type: 'header',
            content: 'Welcome to Our Website',
            styles: {
              backgroundColor: '#1F2937',
              color: '#FFFFFF',
              fontSize: '2rem',
              padding: '20px',
              textAlign: 'center'
            },
            position: { x: 0, y: 0, width: '100%', height: '80px' }
          },
          {
            id: 'hero',
            type: 'section',
            content: 'This is the hero section with amazing content that will capture your attention.',
            styles: {
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              fontSize: '1.5rem',
              padding: '60px 20px',
              textAlign: 'center'
            },
            position: { x: 0, y: 80, width: '100%', height: '300px' }
          },
          {
            id: 'content',
            type: 'section',
            content: 'Main content area with lots of interesting information about our services.',
            styles: {
              backgroundColor: '#FFFFFF',
              color: '#374151',
              fontSize: '1rem',
              padding: '40px 20px',
              lineHeight: '1.6'
            },
            position: { x: 0, y: 380, width: '100%', height: '200px' }
          },
          {
            id: 'footer',
            type: 'footer',
            content: '© 2024 Website. All rights reserved.',
            styles: {
              backgroundColor: '#111827',
              color: '#9CA3AF',
              fontSize: '0.9rem',
              padding: '20px',
              textAlign: 'center'
            },
            position: { x: 0, y: 580, width: '100%', height: '60px' }
          }
        ]
      };

      setImportedWebsite(mockWebsite);
      setCurrentStep('edit');
      setIsImporting(false);
      toast.success('Website imported successfully!');
    }, 3000);
  };

  // AI Code Generation
  const generateCode = async () => {
    setIsGeneratingCode(true);
    
    // Simulate AI code generation
    setTimeout(() => {
      const mockCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${importedWebsite?.title || 'Generated Website'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        ${importedWebsite?.elements.map(element => `
        #${element.id} {
            background-color: ${element.styles.backgroundColor};
            color: ${element.styles.color};
            font-size: ${element.styles.fontSize};
            padding: ${element.styles.padding};
            text-align: ${element.styles.textAlign};
            ${element.styles.lineHeight ? `line-height: ${element.styles.lineHeight};` : ''}
        }
        `).join('')}
    </style>
</head>
<body>
    ${importedWebsite?.elements.map(element => `
    <${element.type === 'header' ? 'header' : element.type === 'footer' ? 'footer' : 'div'} id="${element.id}">
        ${element.content}
    </${element.type === 'header' ? 'header' : element.type === 'footer' ? 'footer' : 'div'}>
    `).join('')}
</body>
</html>`;
      
      setGeneratedCode(mockCode);
      setIsGeneratingCode(false);
      setShowCodePanel(true);
      toast.success('Code generated by AI!');
    }, 2000);
  };

  // Import Step Component
  const ImportStep = () => (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
        <SparklesIcon className="w-10 h-10 text-white" />
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
        Cur10saX.ai
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        AI-Powered Website Builder & Editor
      </p>
      <p className="text-gray-500 mb-8">
        Import any website, edit it visually, and get perfect code generated by AI
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Import Website</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-left text-sm font-medium mb-2">Website URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <button
            onClick={handleImportWebsite}
            disabled={isImporting || !importUrl.trim()}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            {isImporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Importing Website...</span>
              </>
            ) : (
              <>
                <CloudArrowDownIcon className="w-5 h-5" />
                <span>Import & Start Editing</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-4">Or try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'https://example.com',
              'https://startup-template.com',
              'https://portfolio-site.com'
            ].map((url) => (
              <button
                key={url}
                onClick={() => setImportUrl(url)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {url.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Visual Editor Component
  const VisualEditor = () => (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Cur10saX.ai
            </h1>
            <div className="text-sm text-gray-500">
              Editing: {importedWebsite?.url}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Device Preview */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { id: 'desktop', icon: ComputerDesktopIcon },
                { id: 'tablet', icon: DeviceTabletIcon },
                { id: 'mobile', icon: DevicePhoneMobileIcon }
              ].map((device) => (
                <button
                  key={device.id}
                  onClick={() => setPreviewMode(device.id)}
                  className={`p-2 rounded-md transition-colors ${
                    previewMode === device.id 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  <device.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowCodePanel(!showCodePanel)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <CodeBracketIcon className="w-4 h-4" />
              <span>Code</span>
            </button>
            
            <button
              onClick={generateCode}
              disabled={isGeneratingCode}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-200"
            >
              {isGeneratingCode ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  <span>Generate Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold mb-4">Design Tools</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: TypeIcon, label: 'Text' },
                { icon: PhotoIcon, label: 'Image' },
                { icon: RectangleStackIcon, label: 'Section' },
                { icon: SwatchIcon, label: 'Color' }
              ].map((tool) => (
                <button
                  key={tool.label}
                  className="flex flex-col items-center space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <tool.icon className="w-6 h-6" />
                  <span className="text-xs">{tool.label}</span>
                </button>
              ))}
            </div>
            
            {selectedElement && (
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold mb-3">Element Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <input
                      type="color"
                      value={selectedElement.styles.backgroundColor}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Text Color</label>
                    <input
                      type="color"
                      value={selectedElement.styles.color}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Size</label>
                    <input
                      type="text"
                      value={selectedElement.styles.fontSize}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
          <div 
            className={`bg-white rounded-lg shadow-xl transition-all duration-300 ${
              previewMode === 'desktop' ? 'w-full max-w-6xl' :
              previewMode === 'tablet' ? 'w-768px' :
              'w-375px'
            }`}
            style={{ height: '800px' }}
          >
            <div className="h-full overflow-y-auto">
              {importedWebsite?.elements.map((element) => (
                <div
                  key={element.id}
                  onClick={() => setSelectedElement(element)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedElement?.id === element.id 
                      ? 'ring-2 ring-purple-500 ring-offset-2' 
                      : 'hover:ring-1 hover:ring-gray-300'
                  }`}
                  style={{
                    ...element.styles,
                    minHeight: element.position.height
                  }}
                >
                  {element.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Panel */}
        {showCodePanel && (
          <div className="w-96 bg-gray-900 text-white p-4 border-l border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Generated Code</h3>
              <button
                onClick={() => setShowCodePanel(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 h-full overflow-y-auto">
              <pre className="text-sm">
                <code>{generatedCode || 'Generate code to see it here...'}</code>
              </pre>
            </div>
            
            {generatedCode && (
              <button
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
                <span>Copy Code</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {currentStep === 'import' && <ImportStep />}
      {currentStep === 'edit' && <VisualEditor />}
    </div>
  );
};

export default Cur10saXBuilder;