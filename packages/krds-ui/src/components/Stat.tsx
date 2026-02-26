import * as React from "react";
import { cn } from "../lib/utils";

interface StatProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

function Stat({ label, value, change, changeType = "neutral", icon, className }: StatProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-6", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {change && (
        <p className={cn(
          "mt-1 text-sm",
          changeType === "increase" && "text-success",
          changeType === "decrease" && "text-error",
          changeType === "neutral" && "text-gray-500"
        )}>
          {changeType === "increase" && "↑ "}
          {changeType === "decrease" && "↓ "}
          {change}
        </p>
      )}
    </div>
  );
}

export { Stat };
export type { StatProps };
