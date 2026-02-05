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
import { cn } from "@/lib/utils";
import { SearchButton } from "./SearchButton";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger className="h-11" />
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
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={"Bibliothèque"} asChild>
              <Link
                className="flex items-center justify-start"
                href={"/parser/library"}
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
          <SidebarGroupContent className="group-data-[collapsible=icon]:opacity-0  transition-[margin,opacity] duration-200 ease-linear">
            <SidebarMenu>
              {Array(42)
                .fill(null)
                .map((_, id) => (
                  <SidebarMenuItem key={id} className="group/menu-item">
                    <SidebarMenuButton asChild>
                      <Link className="flex items-center" href={`/parser/${id}`}>
                        <span>{id}</span>
                      </Link>
                    </SidebarMenuButton>

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
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
        />
      </SidebarFooter>
    </Sidebar>
  );
}
