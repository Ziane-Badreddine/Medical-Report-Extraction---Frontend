"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { privateApi } from "@/lib/axios";
import { SingleReportResponse } from "@/types/data";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Code } from "lucide-react";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockItem,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/kibo-ui/code-block";
import type { BundledLanguage } from "@/components/kibo-ui/code-block";
import { Button as MovingBorder } from "@/components/ui/moving-border";

interface Props {
  id: string;
}

export const fetchReport = async (
  id: string,
): Promise<SingleReportResponse> => {
  const res = await privateApi.get(`/reports/${id}`);
  return res.data;
};

// Animation variants
const fadeBlur = {
  initial: { opacity: 0, filter: "blur(8px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(8px)" },
};

export default function ViewExtracted({ id }: Props) {
  const [tab, setTab] = useState<string>("full-text");

  const { data, isLoading, error } = useQuery<SingleReportResponse>({
    queryKey: ["report", id],
    queryFn: () => fetchReport(id),
  });

  if (isLoading) {
    return (
      <div className="w-full px-2 md:px-6 py-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-64 w-full rounded" />
      </div>
    );
  }

  if (error || !data?.report) {
    return <p className="p-4 text-red-500">Erreur lors du chargement</p>;
  }

  const { report } = data;

  const extractedDataWithComments = JSON.stringify(
    report.extracted_data,
    null,
    2,
  )
    // Ajouter // [!code highlight] sur certaines clés
    .replace(/"patient": {/g, `"patient": { // [!code highlight]`)
    .replace(/"date":/g, `"date": // [!code highlight]`)
    .replace(/"diagnosis":/g, `"diagnosis": // [!code highlight]`)
    .replace(/"prescription": \[/g, `"prescription": [ // [!code highlight]`)
    .replace(/"observation":/g, `"observation": // [!code highlight]`)
    .replace(/"establishment": {/g, `"establishment": { // [!code highlight]`)
    .replace(/"conclusion": {/g, `"conclusion": { // [!code highlight]`);

  const code = [
    {
      language: "json",
      filename: "extracted_data.json",
      code: extractedDataWithComments,
    },
  ];

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="w-full px-2 md:px-6 py-4"
    >
      <TabsList className="flex w-full gap-2 mb-2 sticky top-14 z-50 border">
        <TabsTrigger
          value="full-text"
          className="flex items-center gap-2 justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground borde cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          Full Text
        </TabsTrigger>
        <TabsTrigger
          value="json"
          className="flex items-center gap-2 justify-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground borde cursor-pointer"
        >
          <Code className="h-4 w-4" />
          Extracted JSON
        </TabsTrigger>
      </TabsList>

      {/* Tabs Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {tab === "full-text" && (
          <motion.div
            key="full-text"
            variants={fadeBlur}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full   "
          >
            <MovingBorder
              borderRadius="0.25rem"
              borderClassName="bg-primary"
              className="bg-background  w-full  h-full text-start text-foreground "
              duration={4000}
            >
              <pre className="whitespace-pre-wrap relative dark:border text-sm p-4 rounded z-100000000000    w-full h-full ">
                {report.content}
              </pre>
            </MovingBorder>
          </motion.div>
        )}

        {tab === "json" && (
          <motion.div
            key="json"
            variants={fadeBlur}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full "
          >
            <MovingBorder
              borderRadius="0.25rem"
              borderClassName="bg-primary"
              className="bg-background  w-full  h-full text-start "
              duration={4000}
              as={"div"}
            >
              <CodeBlock
                data={code}
                defaultValue={code[0].language}
                className="rounded dark:border  relative group "
              >
                <CodeBlockCopyButton className="absolute hidden group-hover:flex top-2 right-2 z-50" />
                <CodeBlockBody>
                  {(item) => (
                    <CodeBlockItem
                      lineNumbers={false}
                      key={item.language}
                      value={item.language}
                    >
                      <CodeBlockContent
                        themes={{
                          light: "vitesse-light",
                          dark: "vitesse-dark",
                        }}
                        language={item.language as BundledLanguage}
                      >
                        {item.code}
                      </CodeBlockContent>
                    </CodeBlockItem>
                  )}
                </CodeBlockBody>
              </CodeBlock>
            </MovingBorder>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}
