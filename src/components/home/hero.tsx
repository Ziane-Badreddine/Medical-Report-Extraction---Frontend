import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import * as motion from "motion/react-client";
import Example from "./example";

export default function Hero() {
  return (
    <section className="relative isolate mx-auto w-full py-20 md:pt-20 xl:pt-32 md:pb-0  ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, transition: { delay: 0.5, duration: 0.5 } }}
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: `
        linear-gradient(to right, var(--foreground) 1px, transparent 1px),
        linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, var(--background) 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, var(--background)  30%, transparent 70%)",
        }}
      />
      <div className="relative z-10 px-4 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left lg:mx-0"
          >
            <div>
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-none"
                variant="secondary"
              >
                <span className="text-primary mr-1">✦</span>
                Données médicales structurées
              </Badge>
            </div>
            <h1 className="from-foreground via-foreground/90 to-foreground/70 mb-6 bg-linear-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              Du texte médical brut
              <br className=" hidden xl:block" /> au JSON structuré
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-8 text-lg leading-relaxed md:text-xl">
              Analyse et extraction automatique des informations clés des
              rapports médicaux non structurés : patient, diagnostic, dates,
              prescriptions et observations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/parser">
                <Button
                  size="lg"
                  className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  Conversion de rapports médicaux
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { duration: 0.5 },
            }}
            className="relative hidden lg:block"
          >
            <Example />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,var(--primary),transparent_35%)] blur-3xl opacity-60"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.8, duration: 1 } }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_70%,var(--foreground),transparent_10%)] blur-3xl"
      ></motion.div>
    </section>
  );
}
