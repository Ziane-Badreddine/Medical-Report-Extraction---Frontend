import DropzonePdf from "@/components/parser/new/dropzone-pdf";
import * as motion from "motion/react-client";

export default function NewPage() {
  return (
    <div className="bg-background   px-4 md:px-10 my-4 ">
      {/* Page title */}
      <h2 className="mb-4 text-left text-2xl font-semibold tracking-tight">
        Upload your PDF
      </h2>

      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full   xl:h-[calc(100svh-100px)]"
      >
        <DropzonePdf />
      </motion.div>
    </div>
  )
}
