
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hi there! I\'m your workflow assistant. How can I help you build your automation today?',
    sender: 'bot',
    timestamp: new Date(),
  }
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample responses for demo purposes
  const sampleResponses = [
    "To create a trigger node, drag one from the left panel to your workflow canvas.",
    "You can connect nodes by clicking and dragging from one handle to another.",
    "To configure a node, double-click on it to open its settings.",
    "Workflows are executed from left to right, starting with trigger nodes.",
    "Don't forget to save your workflow using the Save button in the toolbar.",
    "You can use helper nodes to transform data between actions.",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot thinking
    setTimeout(() => {
      // Generate a sample response
      const responseIndex = Math.floor(Math.random() * sampleResponses.length);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: sampleResponses[responseIndex],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "Chat Assistant Opened",
        description: "Ask for help with building your workflow",
      });
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className="fixed right-5 bottom-5 rounded-full h-14 w-14 shadow-lg z-50 p-0 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed right-5 bottom-20 w-80 md:w-96 h-96 flex flex-col shadow-xl z-40 border-2 overflow-hidden">
          <div className="bg-primary text-primary-foreground p-3 font-semibold flex items-center gap-2">
            <Bot size={18} />
            <span>Workflow Assistant</span>
          </div>
          
          <div className="flex-1 overflow-auto p-3 bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot size={14} />
                    ) : (
                      <User size={14} />
                    )}
                    <span className="text-xs opacity-80">
                      {message.sender === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className="text-sm break-words">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t bg-card">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for help with your workflow..."
                className="flex-1 p-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary min-h-[40px] max-h-20"
                rows={1}
              />
              <Button onClick={handleSendMessage} size="sm" className="h-auto">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
