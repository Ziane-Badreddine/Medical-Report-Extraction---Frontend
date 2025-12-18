"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import CodeBlockJson from "./code-block-json";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const fadeBlur = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
  },
};

export default function Example() {
  const [tab, setTab] = useState<string>("pdf");
  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value)}>
      <Card className="border-border/40 from-background to-background/95 relative overflow-hidden rounded-sm bg-linear-to-b shadow-xl backdrop-blur py-0 px-0">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-2">
            <TabsList className="flex items-center gap-3 bg-background!">
              <TabsTrigger
                className="cursor-pointer  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="pdf"
              >
                pdf
              </TabsTrigger>
              <TabsTrigger
                value="json"
                className="cursor-pointer  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                json
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-500"></div>
              <div className="size-3 rounded-full bg-yellow-500"></div>
              <div className="size-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {tab === "pdf" && (
              <motion.div
                key="pdf"
                variants={fadeBlur}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full p-5"
              >
                <div className="border-b py-3">
                  <p className="text-sm font-semibold">Rapport Médical</p>
                  <p className="text-xs text-neutral-500">
                    Document clinique — confidentiel
                  </p>
                </div>

                {/* PDF Body */}
                <div className="space-y-4 py-4 text-sm leading-relaxed">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500">Patient</p>
                      <p className="font-medium">Ahmed El Amrani</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Dates</p>
                      <p className="font-medium">Consultation : 12/09/2025</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500">Diagnostic</p>
                    <p className="font-medium">Hypertension artérielle</p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500">Prescription</p>
                    <p className="font-medium">
                      Amlodipine 5mg — 1 fois par jour
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500">Observations</p>
                    <p className="font-medium">
                      Tension stable, suivi recommandé.
                    </p>
                  </div>
                </div>
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
                className="w-full py-2"
              >
                <CodeBlockJson />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </Tabs>
  );
}
