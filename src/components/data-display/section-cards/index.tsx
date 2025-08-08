"use client";

import { type LucideIcon } from "lucide-react";
import { type Icon as TablerIcon } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SectionCardItem {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon | TablerIcon;
  suffix?: string;
}

interface SectionCardsProps {
  items: SectionCardItem[];
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function SectionCards({
  items,
  className = "",
  gradientFrom = "from-primary/5",
  gradientTo = "to-card",
}: SectionCardsProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ${className}`}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          className={`@container/card max-w-xs bg-gradient-to-bl ${gradientFrom} ${gradientTo} shadow-xs dark:bg-card`}
        >
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground text-sm">
              {item.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <CardTitle className="text-2xl font-bold">
                  {item.value}
                </CardTitle>
                {item.suffix && (
                  <span className="text-muted-foreground text-sm">
                    {item.suffix}
                  </span>
                )}
              </div>
              <div className="bg-card flex h-10 w-10 items-center justify-center border py-4">
                <item.icon className="text-muted-foreground h-6 w-6" />
              </div>
            </div>
            {item.description && (
              <p className="text-muted-foreground mt-2 text-xs">
                {item.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}