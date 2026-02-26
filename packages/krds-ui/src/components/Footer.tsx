import * as React from "react";
import { cn } from "../lib/utils";

interface FooterProps {
  ministry: string;
  address?: string;
  phone?: string;
  email?: string;
  copyright?: string;
  links?: { label: string; href: string }[];
  className?: string;
}

function Footer({ ministry, address, phone, email, copyright, links, className }: FooterProps) {
  return (
    <footer className={cn("w-full border-t border-gray-200 bg-gray-50", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">{ministry}</p>
            {address && <p className="text-xs text-gray-500">{address}</p>}
            <div className="flex gap-4 text-xs text-gray-500">
              {phone && <span>Tel: {phone}</span>}
              {email && <span>Email: {email}</span>}
            </div>
          </div>
          {links && links.length > 0 && (
            <nav className="flex flex-wrap gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-primary-500 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
        {copyright && (
          <p className="mt-6 text-xs text-gray-400">
            {copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

export { Footer };
export type { FooterProps };
