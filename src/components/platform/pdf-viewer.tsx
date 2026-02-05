"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Skeleton } from "../ui/skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  file: File;
};

export default function PdfViewer({ file }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);
  console.log(width)

  return (
    <div ref={containerRef} className="h-full w-full overflow-auto">
      <Document file={file}>
        {width > 0 && (
          <Page
          className={"w-full! h[80%] xl:h-[75vh]"}
            pageNumber={1}
            width={width - 16} // petit padding
            renderTextLayer={false}
            loading={<Skeleton className="w-full! h[80%] xl:h-[75vh]" />}
          />
        )}
      </Document>
    </div>
  );
}
