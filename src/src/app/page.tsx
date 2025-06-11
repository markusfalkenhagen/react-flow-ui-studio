
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent } from '@/components/ui/popover';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  Download,
  Paperclip,
  ArrowUp,
  Sparkles,
  BarChart3,
  FlaskConical,
  Code2,
  Loader2,
  FileText,
  Languages,
  Lightbulb,
  Mail,
  FileSpreadsheet,
  CalendarDays,
  PenLine,
  GitCompareArrows,
  HelpCircle,
  Presentation,
  Search,
  MessageSquare,
  Image as ImageIcon,
  Zap,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { intelligentWebhook, type IntelligentWebhookInput } from '@/ai/flows/intelligent-webhooks';
import { TaskProgressDisplay } from '@/components/tasks/TaskProgressDisplay';
import type { TaskStatusUIData } from '@/types';
import { Sheet as SheetIconLucide } from 'lucide-react'; // Renamed to avoid conflict

// Hardcoded data from the former task-progress-example page
const taskData: TaskStatusUIData = {
  pageTitle: "Sales Analysis and Strategies for Amazon Store",
  userInput: {
    text: "Here's last month's sales data from my Amazon store. Could you analyze it thoroughly with visualizations and recommend specific, data-driven strategies to boost next month's sales by 10%?",
    attachment: {
      name: "Amazon_Fashion_Sales_Ja...",
      type: "Spreadsheet",
      size: "259.51 KB",
      icon: SheetIconLucide,
    },
  },
  agent: {
    name: "FlowHero Agent",
    icon: Zap, // Using Zap as a generic agent icon
    response: "I'll help you analyze your Amazon Fashion Sales data from January 2025 and provide specific, data-driven strategies to boost next month's sales by 10%. I'll examine the data thoroughly, create visualizations, and develop actionable recommendations based on the patterns and insights found. This may take a few minutes to complete.",
  },
  knowledgeRecalled: {
    title: "Knowledge recalled (1)",
    items: [
      { id: "k1", title: "Sales Analysis Techniques", content: "Recalled information about various sales analysis methodologies." },
    ],
  },
  detailedTaskSteps: [
    { id: "ts1", title: "Load and explore Amazon Fashion Sales data", status: "completed", subTitle: "Starting to load and explore the Amazon Fashion Sales data from January 2025.", logs: [ { id: "log1a", type: "command", icon: Code2, text: "Executing command mkdir -p analysis && python3 -c \"import pandas as pd; print('Python pac...\"" }, { id: "log1b", type: "info", text: "Loading and exploring the Amazon Fashion Sales data from January 2025." } ]},
    { id: "ts2", title: "Clean and preprocess sales dataset", status: "completed", subTitle: "Moving to clean and preprocess the Amazon Fashion sales data for January 2025.", logs: [ { id: "log2a", type: "file_creation", icon: FileText, text: "Creating file analysis/data_exploration.txt" }]},
    { id: "ts3", title: "Perform comprehensive sales analysis", status: "in-progress", subTitle: "Analyzing sales patterns and customer behavior..." },
    { id: "ts4", title: "Create data visualizations for insights", status: "pending" },
    { id: "ts5", title: "Identify key sales trends and patterns", status: "pending" },
    { id: "ts6", title: "Develop data-driven sales growth strategies", status: "pending" },
    { id: "ts7", title: "Prepare comprehensive sales strategy report", status: "pending" },
    { id: "ts8", title: "Deliver final recommendations to boost sales", status: "pending" },
  ],
  computerCard: {
    title: "FlowHero's Computer",
    subtitle: "FlowHero is using Editor",
    editorIcon: PenLine,
    thumbnailUrl: "https://placehold.co/100x60.png",
    thumbnailAlt: "Code editor interface",
    progressTitle: "Task progress",
    tasks: [
      { id: "cct1", text: "Load and explore Amazon Fashion Sales data", completed: true },
      { id: "cct2", text: "Clean and preprocess sales dataset", completed: true },
      { id: "cct3", text: "Perform comprehensive sales analysis", completed: true },
      { id: "cct4", text: "Create data visualizations for insights", completed: true },
      { id: "cct5", text: "Identify key sales trends and patterns", completed: true },
      { id: "cct6", text: "Develop data-driven sales growth strategies", completed: true },
      { id: "cct7", text: "Prepare comprehensive sales strategy report", completed: true },
      { id: "cct8", text: "Deliver final recommendations to boost sales", completed: true },
    ],
  },
};


const COMMANDS = [
  { command: "/summarize ", description: "Summarize text or a URL", icon: FileText },
  { command: "/translate ", description: "Translate text to another language", icon: Languages },
  { command: "/generate_image ", description: "Generate an image from a prompt", icon: ImageIcon },
  { command: "/analyze_data ", description: "Analyze provided data", icon: BarChart3 },
  { command: "/write_email ", description: "Draft an email", icon: Mail },
  { command: "/research ", description: "Research a topic", icon: Search },
  { command: "/plan ", description: "Create a plan or schedule", icon: CalendarDays },
];

export default function FlowHeroPage() {
  const [taskInput, setTaskInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('standard');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const [showOutputPanel, setShowOutputPanel] = useState(false);

  const [commandPopoverOpen, setCommandPopoverOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [filteredCommands, setFilteredCommands] = useState(COMMANDS);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskInput(value);

    if (value.startsWith("/") && !value.includes(" ")) {
      const query = value.substring(1).toLowerCase();
      setCommandQuery(query);
      const newFilteredCommands = COMMANDS.filter(cmd => cmd.command.substring(1).toLowerCase().startsWith(query));
      setFilteredCommands(newFilteredCommands);
      setSelectedCommandIndex(0);
      setCommandPopoverOpen(newFilteredCommands.length > 0);
    } else {
      setCommandPopoverOpen(false);
    }
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (commandPopoverOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedCommandIndex]) {
          handleCommandSelect(filteredCommands[selectedCommandIndex].command);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setCommandPopoverOpen(false);
      }
    }
  };

  const handleCommandSelect = (command: string) => {
    setTaskInput(command);
    setCommandPopoverOpen(false);
    textareaRef.current?.focus();
  };

  const handleSendTask = async () => {
    if (!taskInput.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter a task description.',
        variant: 'destructive',
      });
      return;
    }
    setIsSending(true);
    setShowOutputPanel(false); // Hide output panel while processing new task
    
    try {
      toast({
        title: 'FlowHero is thinking...',
        description: `Processing your task: ${taskInput.substring(0,50)}...`,
      });

      const aiResponse = await intelligentWebhook({ message: taskInput });
      
      toast({
        title: 'AI Tool Selection Complete!',
        description: (
          <div>
            <p><strong>Tool Selected:</strong> {aiResponse.toolSelected}</p>
            <p><strong>Reasoning:</strong> {aiResponse.reasoning}</p>
          </div>
        ),
        duration: 8000,
      });
      
      // Show the output panel with example data
      setShowOutputPanel(true);

    } catch (error) {
      console.error("Error calling AI tool selection:", error);
      toast({
        title: 'Error Processing Task',
        description: 'There was an issue with the AI tool selection. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handlePresetTask = (preset: string) => {
    setTaskInput(preset);
    setCommandPopoverOpen(false);
    toast({
      title: 'Suggestion Loaded',
      description: `'${preset}' loaded into task input. Modify as needed or send.`,
    });
  };
  
  const handleDownloadsClick = () => {
    toast({
      title: "Downloads",
      description: "Downloads functionality not yet implemented.",
    });
  };

  const quickSuggestions = [
    "Draft a cover letter for a software engineer role.",
    "Explain the concept of photosynthesis in simple terms.",
    "Generate a list of healthy breakfast ideas.",
    "Write a short story about a time-traveling cat.",
  ];

  return (
    <div className={`flex flex-col min-h-screen w-full bg-background selection:bg-primary/20 selection:text-primary md:flex-row`}>
      {/* Input Panel */}
      <div className={`p-4 flex flex-col items-center ${showOutputPanel ? 'md:w-1/3 md:border-r' : 'w-full justify-center'}`}>
        <div className={`w-full ${showOutputPanel ? 'max-w-md' : 'max-w-2xl'}`}>
          {!showOutputPanel && (
            <div className="absolute top-6 left-6">
              <Button variant="outline" onClick={handleDownloadsClick} className="rounded-full shadow-sm">
                <Download className="mr-2 h-4 w-4" />
                Downloads
              </Button>
            </div>
          )}

          <h1 className={`text-center font-semibold text-foreground ${showOutputPanel ? 'text-2xl mb-4' : 'text-4xl mb-8'}`}>
            What can FlowHero do for you?
          </h1>

          <Card className="w-full shadow-xl rounded-xl">
            <CardContent className="p-4 md:p-6">
              <Popover open={commandPopoverOpen} onOpenChange={setCommandPopoverOpen}>
                <PopoverPrimitive.Anchor asChild>
                  <Textarea
                    ref={textareaRef}
                    placeholder="Type a task or / for commands..."
                    value={taskInput}
                    onChange={handleTaskInputChange}
                    onKeyDown={handleCommandKeyDown}
                    className="min-h-[100px] w-full resize-none border-0 bg-transparent p-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    disabled={isSending}
                  />
                </PopoverPrimitive.Anchor>
                {commandPopoverOpen && filteredCommands.length > 0 && (
                  <PopoverContent 
                    className="w-[--radix-popover-trigger-width] p-1 max-h-60 overflow-y-auto"
                    align="start"
                    side="bottom"
                    sideOffset={5}
                  >
                    <CommandList
                      commands={filteredCommands}
                      selectedIndex={selectedCommandIndex}
                      onSelect={handleCommandSelect}
                    />
                  </PopoverContent>
                )}
              </Popover>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" aria-label="Attach file" disabled={isSending}>
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isSending}>
                    <SelectTrigger className="w-[120px] h-9 text-sm focus:ring-primary focus:ring-offset-0">
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  size="icon" 
                  onClick={handleSendTask} 
                  disabled={!taskInput.trim() || isSending}
                  className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90"
                  aria-label="Send task"
                >
                  {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 w-full">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Or try one of these suggestions:</h3>
            <ScrollArea className="h-36 w-full rounded-md border bg-card p-2 shadow-sm">
              <div className="space-y-1.5">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-1.5 px-2 text-sm text-card-foreground hover:bg-muted/50"
                    onClick={() => handlePresetTask(suggestion)}
                    disabled={isSending}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className={`mt-8 grid ${showOutputPanel ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-3 w-full`}>
            <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Create a marketing campaign for a new coffee shop')}>
              <Sparkles className="mr-2 h-5 w-5 text-primary" /> Create
            </Button>
            <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Analyze this dataset of customer reviews for sentiment trends')}>
              <BarChart3 className="mr-2 h-5 w-5 text-primary" /> Analyze
            </Button>
            <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Research the latest advancements in renewable energy storage')}>
              <FlaskConical className="mr-2 h-5 w-5 text-primary" /> Research
            </Button>
            <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Write a Python script to automate daily report generation')}>
              <Code2 className="mr-2 h-5 w-5 text-primary" /> Code
            </Button>
            {/* Additional buttons shown when not in split view */}
            {!showOutputPanel && (
              <>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Summarize this document for key points')}>
                    <FileText className="mr-2 h-5 w-5 text-primary" /> Summarize
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Translate this paragraph into Spanish')}>
                    <Languages className="mr-2 h-5 w-5 text-primary" /> Translate
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Brainstorm ideas for a new app feature')}>
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Brainstorm
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Draft a follow-up email to a client')}>
                    <Mail className="mr-2 h-5 w-5 text-primary" /> Draft Email
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Generate a sales report for Q3')}>
                    <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" /> Report
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Plan a project schedule for the next month')}>
                    <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Plan
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Write a blog post about AI in education')}>
                    <PenLine className="mr-2 h-5 w-5 text-primary" /> Blog Post
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Compare cloud storage options for a small business')}>
                    <GitCompareArrows className="mr-2 h-5 w-5 text-primary" /> Compare
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Explain the concept of blockchain simply')}>
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" /> Explain
                </Button>
                <Button variant="outline" className="h-12 justify-start text-left shadow-sm" onClick={() => handlePresetTask('Create a presentation outline on climate change')}>
                    <Presentation className="mr-2 h-5 w-5 text-primary" /> Present
                </Button>
              </>
            )}
          </div>
        </div>
        {!showOutputPanel && (
          <footer className="absolute bottom-6 text-center text-sm text-muted-foreground">
            Powered by FlowHero & Genkit
          </footer>
        )}
      </div>

      {/* Output Panel */}
      {showOutputPanel && (
        <ScrollArea className="md:w-2/3 bg-muted/30 dark:bg-background">
           <TaskProgressDisplay taskData={taskData} />
        </ScrollArea>
      )}
    </div>
  );
}


interface CommandListProps {
  commands: typeof COMMANDS;
  selectedIndex: number;
  onSelect: (command: string) => void;
}

const CommandList: React.FC<CommandListProps> = ({ commands, selectedIndex, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={scrollRef} className="flex flex-col">
      {commands.map((cmd, index) => (
        <Button
          key={cmd.command}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(cmd.command)}
          className={`justify-start h-auto py-1.5 px-2 ${selectedIndex === index ? 'bg-accent text-accent-foreground' : ''}`}
        >
          {cmd.icon && <cmd.icon className="mr-2 h-4 w-4" />}
          <span className="font-semibold">{cmd.command}</span>
          <span className="ml-2 text-xs text-muted-foreground">{cmd.description}</span>
        </Button>
      ))}
    </div>
  );
};
