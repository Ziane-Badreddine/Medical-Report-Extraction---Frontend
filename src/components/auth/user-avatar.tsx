"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookLock,
  LogOut,
  User,
  Coins,
  Target,
  Sun,
  Moon,
  Laptop,
  Palette,
} from "lucide-react";
import { useAuth } from "@/store/auth";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Spinner } from "../ui/spinner";

export default function UserAvatar() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  if (isLoading) return <Spinner />;

  const avatarFallback = user?.name?.[0]?.toUpperCase() ?? "?";
  const tooltipText = "Open user menu";

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated && (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <motion.button
                  key="user-avatar"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="focus:outline-none cursor-pointer ring-2 ring-ring rounded-full transition-transform  flex items-center gap-2 md:h-9"
                  aria-label={tooltipText}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                         process.env.NEXT_PUBLIC_AVATAR
                      }
                      alt={`${user?.name}'s avatar`}
                      className="size-8"
                    />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              {tooltipText}
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={"/profile"}>
                <User className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>



            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <Palette className="size-4" />
                Theme
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "bg-muted" : ""}
                  >
                    <Sun className="mr-2 size-4" />
                    Light
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "bg-muted" : ""}
                  >
                    <Moon className="mr-2 size-4" />
                    Dark
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "bg-muted" : ""}
                  >
                    <Laptop className="mr-2 size-4" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem asChild>
              <Link href="/privacy-policy">
                <BookLock className="size-4" />
                Privacy Policy
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </AnimatePresence>
  );
}