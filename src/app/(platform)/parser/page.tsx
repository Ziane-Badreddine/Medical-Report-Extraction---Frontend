import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FilePlusCorner } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function ParserPage() {
  return (
    <div className="bg-background flex min-h-[calc(100svh-56px)] md:min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full "
      >
        <Empty>
          <EmptyHeader>
            <EmptyMedia className="size-18 rounded-full" variant="icon">
              <FilePlusCorner className="size-12" />
            </EmptyMedia>

            <EmptyTitle>Importer votre première rapport médical</EmptyTitle>

            <EmptyDescription>
              Importez un rapport médical et laissez l’IA le structurer en
              données JSON exploitables.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Link href={"/parser/new"}>
              <Button className=" cursor-pointer">Importer un rapport</Button>
            </Link>
          </EmptyContent>
        </Empty>
      </motion.div>
    </div>
  );
}
