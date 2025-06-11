"use client";

import type { FileObject } from "@/types";
import Image from "next/image";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: FileObject;
}

export function FilePreview({ file }: FilePreviewProps) {
  return (
    <div className="mt-2 max-w-xs rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-3">
        {file.isImage ? (
          <Image
            src={file.url}
            alt={file.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div className="overflow-hidden">
          <p className="truncate text-sm font-medium text-card-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {file.type} - {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => window.open(file.url, '_blank')}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
}
