"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function DashboardHeader({
  title,
  subtitle,
  action,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-fh-cream-dark bg-white px-4 py-4 sm:px-6">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-bold tracking-tight text-fh-green-deep">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 truncate text-sm text-fh-green-muted">
            {subtitle}
          </p>
        )}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fh-green-light" />
          <Input
            className="h-9 w-52 border-fh-cream-dark bg-fh-cream pl-9 text-sm"
            placeholder="Search"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-fh-green-muted" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-fh-coral" />
        </Button>
        {action}
      </div>
    </header>
  );
}
