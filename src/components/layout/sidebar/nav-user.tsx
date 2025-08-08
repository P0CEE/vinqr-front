"use client";

import {
  IconDots,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { theme, setTheme } = useTheme();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => setIsRendered(true), []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    console.log("Déconnexion...");
  };

  if (!isRendered) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              className="rounded-lg"
              src={user.avatar}
              alt={user.name}
            />
            <AvatarFallback className="rounded-lg text-xs">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background ml-12 min-w-56"
            align="end"
            side="bottom"
            sideOffset={8}
          >
            <div className="flex flex-col items-center p-3 text-center">
              <Avatar className="border-border/50 mb-2 size-14 rounded-xl border">
                <AvatarImage
                  className="rounded-xl"
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-muted-foreground text-xs">
                  {user.email}
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <IconUser />
              <span>Compte</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleThemeToggle}
              className="cursor-pointer"
            >
              {theme === "dark" ? <IconMoon /> : <IconSun />}
              <span>Changer de thème</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <IconLogout />
              <span>Se déconnecter</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <div className="text-muted-foreground/60 flex items-center justify-center gap-1 px-2 pt-1 pb-2 text-[10px]">
              <a href="/privacy" className="hover:underline">
                Privacy
              </a>
              <span>·</span>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-1">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-muted-foreground text-xs">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
