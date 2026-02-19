"use client";

import dynamic from "next/dynamic";
import axios from "axios";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { parseErrorContext } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { privateApi } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {  useQueryClient } from "@tanstack/react-query";

export const uploadPdfSchema = z.object({
  file: z
    .instanceof(File, { message: "Fichier requis" })
    .refine((f) => f.type === "application/pdf", {
      message: "Le fichier doit être un PDF",
    })
    .refine((f) => f.size <= 5 * 1024 * 1024, {
      message: "PDF max 5MB",
    }),
  title: z.string().min(2, "Titre trop court"),
});


const PdfViewer = dynamic(() => import("@/components/platform/pdf-viewer"), {
  ssr: false,
});

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function DropzonePdf() {
  const [files, setFiles] = useState<File[]>();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const qeuryClient = useQueryClient();

  const disabled = !!pdfFile;

  const handleDrop = (files: File[]) => {
    setFiles(files);
    if (files[0]?.type === "application/pdf") {
      setPdfFile(files[0]);
      setTitle(files[0].name.replace(".pdf", ""));
    }
  };

  const handleCancel = () => {
    setFiles(undefined);
    setPdfFile(null);
    setTitle("");
    setError(null);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    setError(null);

    const parsed = uploadPdfSchema.safeParse({
      file: pdfFile,
      title,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      setLoading(true);

      const {data} = await privateApi.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const reportId = data.document_id;
      await  qeuryClient.invalidateQueries({queryKey: ["reports"]})
      router.push(`/parser/${reportId}`)

      // success → reset or redirect
      handleCancel();
    } catch (err) {
      const uploadError = parseErrorContext(err)
      setError(
        uploadError.error.message || "Erreur lors de l’upload du PDF"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropzone
      accept={{ "application/pdf": [".pdf"] }}
      onDrop={handleDrop}
      src={files}
      disabled={disabled}
      className="h-full border-dashed"
    >
      <DropzoneEmptyState className="min-h-[70vh]" />

      <DropzoneContent>
        <div className="grid h-full grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT – PDF */}
          <AnimatePresence>
            {pdfFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative hidden xl:block rounded border p-2"
              >
                <Button
                  onClick={handleCancel}
                  size="icon"
                  variant="secondary"
                  className="absolute -right-3 -top-3 z-10 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>

                <PdfViewer file={pdfFile} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* RIGHT – INFOS */}
          <AnimatePresence>
            {pdfFile && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="col-span-2 flex flex-col gap-4 my-auto"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{formatSize(pdfFile.size)}</span>
                </div>

                <Input
                  placeholder="PDF title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <motion.div whileTap={{ scale: 0.96 }} className="pt-4">
                  <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ?  <Spinner /> : "Add PDF"}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DropzoneContent>
    </Dropzone>
  );
}
