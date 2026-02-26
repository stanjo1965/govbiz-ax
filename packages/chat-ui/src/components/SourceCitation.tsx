import * as React from "react";
import { FileText } from "lucide-react";

interface SourceCitationProps {
  title: string;
  url?: string;
}

function SourceCitation({ title, url }: SourceCitationProps) {
  const content = (
    <span className="inline-flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity">
      <FileText className="h-3 w-3" />
      {title}
    </span>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

export { SourceCitation };
