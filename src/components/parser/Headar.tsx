"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { SingleReportResponse } from "@/types/data";
import { privateApi } from "@/lib/axios";
import { SidebarTrigger } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const fetchReport = async (
  id: string,
): Promise<SingleReportResponse> => {
  const res = await privateApi.get(`/reports/${id}`);
  const data = res.data;
  return {
    ...data,
  };
};

interface Props {
  id: string;
}

export default function Header({ id }: Props) {
  const { data, isLoading, error } = useQuery<SingleReportResponse>({
    queryKey: ["report", id],
    queryFn: () => fetchReport(id),
  });
  const isMobile = useIsMobile()

  if (isLoading)
    return (
      <header className="flex flex-col gap-4 px-0 md:px-6 py-2 md:flex-row md:items-center h-14 md:justify-between">
        {/* Left */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SidebarTrigger size={"icon-lg"} className=" flex md:hidden " />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:text-right">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </header>
    );
  if (error || !data)
    return <p className="p-4 text-red-500">Erreur lors du chargement</p>;

  const handleDownloadJson = () => {
    if (!report.extracted_data) return;
    const blob = new Blob([JSON.stringify(report.extracted_data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = report.filename.replace(/\.[^/.]+$/, "") + ".json"; // nom du fichier JSON
    a.click();

    // Libère l'URL
    URL.revokeObjectURL(url);
  };

  const { report } = data;

  return (
    <header className="flex  sticky bg-background z-50 top-0 gap-4 px-2 md:px-6 py-2 flex-row items-center border-b h-14 justify-between">
      {/* Left */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <SidebarTrigger size={"icon-lg"} className=" flex md:hidden " />
          <h1 className="text-lg font-semibold break-all">{report.filename}</h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex  gap-1 text-sm md:text-right">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={isMobile ? "icon-sm" : "icon"}
              variant={isMobile ? "ghost" : "outline"}
              className="cursor-pointer"
              onClick={handleDownloadJson}
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>download</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
