
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Palette,
  Sparkles,
  Zap,
  MousePointer
} from 'lucide-react';

interface CanvasElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'image';
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
    { id: 'select', name: 'Select', icon: MousePointer },
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
      width: 120,
      height: type === 'text' ? 40 : 120,
      content: type === 'text' ? 'Sample Text' : undefined,
      color: '#6366f1',
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <div className="h-full flex bg-background">
      {/* Professional Toolbar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-16 bg-card border-r border-border flex flex-col items-center py-6 space-y-2"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="icon"
              onClick={() => setSelectedTool(tool.id)}
              className={`w-10 h-10 ${
                selectedTool === tool.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
        
        <Separator className="w-8 my-4" />
        
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <Palette className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Professional Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-14 bg-card border-b border-border flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Canvas Studio</h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              Professional
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Undo className="h-3 w-3 mr-1" />
              Undo
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Redo className="h-3 w-3 mr-1" />
              Redo
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button size="sm" className="h-8">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Enhance
            </Button>
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 bg-muted/30 relative overflow-hidden p-8"
        >
          <div className="max-w-5xl mx-auto h-full flex items-center justify-center">
            <div 
              className="bg-background border border-border rounded-lg relative shadow-lg"
              style={{ width: '800px', height: '600px' }}
              onClick={(e) => {
                if (selectedTool !== 'select') {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  if (selectedTool === 'text') addElement('text');
                  else if (selectedTool === 'rectangle') addElement('rectangle');
                  else if (selectedTool === 'circle') addElement('circle');
                  else if (selectedTool === 'image') addElement('image');
                }
              }}
            >
              {/* Professional Grid */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Canvas Elements */}
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`absolute border-2 cursor-pointer transition-all ${
                    selectedElement === element.id 
                      ? 'border-primary shadow-md' 
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    backgroundColor: element.type !== 'text' ? element.color : 'transparent',
                    borderRadius: element.type === 'circle' ? '50%' : '6px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                >
                  {element.type === 'text' && (
                    <div className="p-3 text-foreground font-medium text-sm">
                      {element.content}
                    </div>
                  )}
                  
                  {selectedElement === element.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-8 -right-8 flex gap-1"
                    >
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
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Professional Empty State */}
              {elements.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-3 w-12 h-12 rounded-lg bg-muted">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Start Creating
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select a tool from the toolbar to begin
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Professional Properties Panel */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-80 bg-card border-l border-border"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Properties</h3>
          </div>
          
          <ScrollArea className="h-96 mb-6">
            <div className="space-y-2">
              {elements.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedElement === element.id 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-background hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {element.type === 'text' && <Type className="h-4 w-4" />}
                      {element.type === 'rectangle' && <Square className="h-4 w-4" />}
                      {element.type === 'circle' && <Circle className="h-4 w-4" />}
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
          
          {selectedElementData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted/30 rounded-lg border space-y-4"
            >
              <h4 className="font-medium text-sm">Element Properties</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">X</Label>
                  <Input 
                    type="number" 
                    value={selectedElementData.x}
                    onChange={(e) => updateElement(selectedElementData.id, { x: Number(e.target.value) })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Y</Label>
                  <Input 
                    type="number" 
                    value={selectedElementData.y}
                    onChange={(e) => updateElement(selectedElementData.id, { y: Number(e.target.value) })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input 
                    type="number" 
                    value={selectedElementData.width}
                    onChange={(e) => updateElement(selectedElementData.id, { width: Number(e.target.value) })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Input 
                    type="number" 
                    value={selectedElementData.height}
                    onChange={(e) => updateElement(selectedElementData.id, { height: Number(e.target.value) })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
              
              {selectedElementData.type === 'text' && (
                <div>
                  <Label className="text-xs text-muted-foreground">Content</Label>
                  <Input 
                    value={selectedElementData.content || ''}
                    onChange={(e) => updateElement(selectedElementData.id, { content: e.target.value })}
                    className="h-8 text-xs"
                  />
                </div>
              )}
              
              {selectedElementData.type !== 'text' && (
                <div>
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <Input 
                    type="color" 
                    value={selectedElementData.color || '#6366f1'}
                    onChange={(e) => updateElement(selectedElementData.id, { color: e.target.value })}
                    className="h-8 cursor-pointer"
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
