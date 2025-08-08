"use client";

import {
  IconBell,
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
import { useSidebar } from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => setIsRendered(true), []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    // Ajouter votre logique de déconnexion ici
    console.log("Déconnexion...");
  };

  if (!isRendered) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {state === "collapsed" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center">
                <Avatar className="size-7 rounded-lg">
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="ml-3 min-w-56 bg-white dark:bg-[#131313]"
              align="end"
              side="bottom"
              sideOffset={8}
            >
              {/* Header avec avatar et infos utilisateur */}
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

              {/* Options du menu */}
              <div className="space-y-1 p-1">
                <DropdownMenuItem className="cursor-pointer">
                  <IconUser className="mr-2 h-4 w-4 opacity-60" />
                  <span className="text-[13px]">Compte</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  <IconBell className="mr-2 h-4 w-4 opacity-60" />
                  <span className="text-[13px]">Notifications</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleThemeToggle}
                  className="cursor-pointer"
                >
                  {theme === "dark" ? (
                    <IconMoon className="mr-2 h-4 w-4 opacity-60" />
                  ) : (
                    <IconSun className="mr-2 h-4 w-4 opacity-60" />
                  )}
                  <span className="text-[13px]">Changer de thème</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <IconLogout className="mr-2 h-4 w-4 opacity-60" />
                  <span className="text-[13px]">Se déconnecter</span>
                </DropdownMenuItem>
              </div>

              {/* Footer avec Privacy et Terms */}
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
        ) : (
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

                {/* Options du menu */}
                <div className="space-y-1 p-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <IconUser className="mr-2 h-4 w-4 opacity-60" />
                    <span className="text-[13px]">Compte</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleThemeToggle}
                    className="cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <IconMoon className="mr-2 h-4 w-4 opacity-60" />
                    ) : (
                      <IconSun className="mr-2 h-4 w-4 opacity-60" />
                    )}
                    <span className="text-[13px]">Thème de l&apos;application</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <IconLogout className="mr-2 h-4 w-4 opacity-60" />
                    <span className="text-[13px]">Se déconnecter</span>
                  </DropdownMenuItem>
                </div>

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
        )}
      </div>

      {state !== "collapsed" && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-1">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-muted-foreground text-xs">{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}
