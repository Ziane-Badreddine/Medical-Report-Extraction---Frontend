"use client";

import { useQuery } from "@tanstack/react-query";
import { FolderPlus, Library, MoreHorizontal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavUser } from "./nav-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton"; // ← ShadCN Skeleton
import { cn } from "@/lib/utils";
import { SearchButton } from "./SearchButton";
import { privateApi } from "@/lib/axios";
import { ReportsListResponse } from "@/types/data";
import { usePathname } from "next/navigation";



async function getReports() {
  const res = await privateApi.get("/reports");
  return res.data;
}

export function AppSidebar() {
  const { data, isLoading } = useQuery<ReportsListResponse>({
    queryKey: ["reports"],
    queryFn: getReports,
  });
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger className=" hidden md:flex"  />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={"Nouveau rapport"} asChild>
              <Link
                className="flex items-center justify-start"
                href={"/parser/new"}
              >
                <FolderPlus className="size-5" />
                <span className="align-text-bottom">Nouveau rapport</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SearchButton />
          <SidebarMenuItem >
            <SidebarMenuButton disabled={true} tooltip={"Bibliothèque"} asChild>
              <Link
                className="flex items-center justify-start"
                href={"#"}
              >
                <Library className="size-5" />
                <span className="align-text-bottom">Bibliothèque</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mes rapports</SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:opacity-0 transition-[margin,opacity] duration-200 ease-linear">
            <SidebarMenu>
              {isLoading
                ? // Skeleton placeholders
                  Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <SidebarMenuItem
                        key={i}
                        className="group/menu-item flex items-center gap-2 px-2 py-1"
                      >
                        <Skeleton className="h-5 w-full rounded-md" />
                      </SidebarMenuItem>
                    ))
                : data?.reports?.map((report) => (
                    <SidebarMenuItem
                      key={report._id}
                      className="group/menu-item"
                    >
                      <SidebarMenuButton isActive={"/parser/" + report._id  === pathname} asChild>
                        <Link
                          className="flex items-center"
                          href={`/parser/${report._id}`}
                        >
                          <span>{report.filename || report._id}</span>
                        </Link>
                      </SidebarMenuButton>
{/* 
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction className="group/menu-action cursor-pointer focus-visible:outline-none focus-visible:ring-0">
                            <MoreHorizontal
                              className={cn(
                                "hidden",
                                "group-hover/menu-item:block",
                                "group-data-[state=open]/menu-action:block"
                              )}
                            />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem>Edit Report</DropdownMenuItem>
                          <DropdownMenuItem>Delete Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
