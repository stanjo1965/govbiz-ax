import * as React from "react";
import { cn } from "../lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

function Header({ title, subtitle, logo, nav, actions, className }: HeaderProps) {
  return (
    <header className={cn("w-full border-b border-gray-200 bg-white", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {logo}
            <div>
              <h1 className="text-lg font-bold text-primary-700">{title}</h1>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          {nav && <nav className="hidden md:flex items-center gap-6">{nav}</nav>}
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </div>
    </header>
  );
}

export { Header };
export type { HeaderProps };
