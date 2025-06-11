
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Square, 
  Circle, 
  Type, 
  Image, 
  Upload, 
  Download, 
  Undo, 
  Redo, 
  Trash2, 
  Copy, 
  Move, 
  RotateCw, 
  Palette,
  Sparkles,
  Zap
} from 'lucide-react';

interface CanvasElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color?: string;
  selected?: boolean;
}

export function CanvasView() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const tools = [
    { id: 'select', name: 'Select', icon: Move },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'image', name: 'Image', icon: Image },
  ];

  const addElement = (type: CanvasElement['type']) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      width: 100,
      height: 100,
      content: type === 'text' ? 'Sample Text' : undefined,
      color: '#3b82f6',
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  return (
    <div className="h-full flex">
      {/* Toolbar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 bg-gradient-to-b from-card to-card/80 border-r flex flex-col items-center py-4 space-y-4"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="icon"
              onClick={() => setSelectedTool(tool.id)}
              className={`w-12 h-12 ${
                selectedTool === tool.id 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100'
              }`}
            >
              <tool.icon className="h-5 w-5" />
            </Button>
          </motion.div>
        ))}
        
        <Separator />
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Upload className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Palette className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Controls */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-16 bg-gradient-to-r from-card to-card/80 border-b flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
              >
                <Layers className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Canvas Studio
                </h2>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Zap className="h-4 w-4 mr-2" />
              AI Enhance
            </Button>
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg relative shadow-xl"
              style={{ width: '800px', height: '600px' }}
              onClick={(e) => {
                if (selectedTool !== 'select') {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  if (selectedTool === 'text') addElement('text');
                  else if (selectedTool === 'rectangle') addElement('shape');
                  else if (selectedTool === 'circle') addElement('shape');
                }
              }}
            >
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(#e5e7eb 1px, transparent 1px),
                    linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Canvas Elements */}
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute border-2 cursor-pointer ${
                    selectedElement === element.id 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    backgroundColor: element.type === 'shape' ? element.color : 'transparent',
                    borderRadius: element.type === 'circle' ? '50%' : '4px',
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === 'text' && (
                    <div className="p-2 text-gray-800 dark:text-gray-200 font-medium">
                      {element.content}
                    </div>
                  )}
                  
                  {selectedElement === element.id && (
                    <div className="absolute -top-8 -right-8 flex gap-1">
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Empty State */}
              {elements.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mx-auto mb-4 p-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500"
                    >
                      <Sparkles className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Create Something Amazing
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a tool from the left to start creating
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Properties Panel */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-80 bg-gradient-to-b from-card to-card/80 border-l"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Layers & Properties
          </h3>
          
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {elements.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    selectedElement === element.id 
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300' 
                      : 'bg-background hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                  }`}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {element.type === 'text' && <Type className="h-4 w-4" />}
                      {element.type === 'shape' && <Square className="h-4 w-4" />}
                      {element.type === 'image' && <Image className="h-4 w-4" />}
                      <span className="text-sm font-medium">
                        {element.type === 'text' ? element.content : `${element.type} ${index + 1}`}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          
          {selectedElement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border"
            >
              <h4 className="font-medium mb-3">Element Properties</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Position</label>
                  <div className="flex gap-2 mt-1">
                    <input 
                      type="number" 
                      placeholder="X" 
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                    <input 
                      type="number" 
                      placeholder="Y" 
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Size</label>
                  <div className="flex gap-2 mt-1">
                    <input 
                      type="number" 
                      placeholder="Width" 
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                    <input 
                      type="number" 
                      placeholder="Height" 
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Color</label>
                  <input 
                    type="color" 
                    className="w-full h-8 mt-1 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
