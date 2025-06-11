
"use client";

import type { FileObject } from "@/src/types";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSendMessage: (text: string, file?: FileObject) => void;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setFilePreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setFilePreviewUrl(null); // No preview for non-images, icon will be used
      }
    }
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!text.trim() && !file) return;

    let fileObject: FileObject | undefined;
    if (file) {
      fileObject = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        url: filePreviewUrl || URL.createObjectURL(file), // Use preview if image, otherwise blob URL
        size: file.size,
        isImage: file.type.startsWith("image/"),
      };
    }

    onSendMessage(text, fileObject);
    setText("");
    setFile(null);
    setFilePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t bg-background p-4"
    >
      {file && (
        <div className="mb-2 flex items-center justify-between rounded-md border p-2">
          <div className="flex items-center gap-2 overflow-hidden">
            {filePreviewUrl && file.type.startsWith("image/") ? (
              <img src={filePreviewUrl} alt="Preview" className="h-10 w-10 rounded object-cover" />
            ) : (
              <Paperclip className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <span className="truncate text-sm">{file.name}</span>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={removeFile} className="h-7 w-7">
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="relative flex items-end gap-2">
        <Textarea
          placeholder="Type a message or drop a file..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="min-h-[40px] max-h-32 flex-1 resize-none pr-20"
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx,.txt,.csv" 
          />
          <Button type="submit" size="icon" disabled={isLoading || (!text.trim() && !file)} aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
