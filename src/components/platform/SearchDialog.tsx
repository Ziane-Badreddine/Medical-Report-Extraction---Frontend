"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { FileIcon, SearchX } from "lucide-react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearchDialog } from "@/store/search-dialog-store";
import { privateApi } from "@/lib/axios";
import { useRouter } from "next/navigation";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { ReportsListResponse } from "@/types/data";



// fetch all reports
async function getReports() {
  const res = await privateApi.get("/reports");
  return res.data 
}

// Motion variants
const listVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export function SearchDialog() {
  const { open, setOpen } = useSearchDialog();
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const { data, isLoading } = useQuery<ReportsListResponse>({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const filteredReports = (data ) ? 
     data.reports.filter(
      (r) =>
        r.filename.toLowerCase().includes(query.toLowerCase()) ||
        r._id.toLowerCase().includes(query.toLowerCase())
    ) : [];

  return (
    <CommandDialog className="min-h-96" open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search reports by title or ID..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <AnimatePresence mode="popLayout">
          {isLoading && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center py-6"
            >
              <Spinner />
            </motion.div>
          )}

          {!isLoading && filteredReports.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Empty className="p-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchX className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>No data</EmptyTitle>
                  <EmptyDescription>
                    No reports found matching your search.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={() => router.push("/parser/new")}>
                    Add Report
                  </Button>
                </EmptyContent>
              </Empty>
            </motion.div>
          )}

          {!isLoading && filteredReports.length > 0 && (
            <CommandGroup heading="Reports">
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredReports.map((report) => (
                  <motion.div key={report._id} variants={itemVariants}>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        router.push(`/parser/${report._id}`);
                      }}
                    >
                      <FileIcon className="h-4 w-4 " />
                      <span>{report.filename || report._id}</span>
                    </CommandItem>
                  </motion.div>
                ))}
              </motion.div>
            </CommandGroup>
          )}
        </AnimatePresence>
      </CommandList>
    </CommandDialog>
  );
}
