import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { FileText, Download, Save, ClipboardList } from "lucide-react"; // ou autre librairie d'icônes

export const features = [
  {
    title: "Import PDF",
    description:
      "Importez facilement vos rapports médicaux non structurés pour les transformer automatiquement en JSON exploitable.",
    icon: <FileText className="size-5" />,
  },
  {
    title: "JSON Download",
    description:
      "Téléchargez le rapport médical converti en JSON pour l’intégrer directement à vos systèmes ou bases de données.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Save Reports",
    description:
      "Enregistrez vos rapports structurés directement sur votre compte pour un accès rapide et un suivi continu.",
    icon: <Save className="size-5" />,
  },
  {
    title: "Patient Overview",
    description:
      "Consultez un résumé clair des informations clés : patient, diagnostics, dates, prescriptions et observations.",
    icon: <ClipboardList className="size-5" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="relative isolate w-full py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b/0.03),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="text-primary mr-1">✦</span> Fonctionnalités
          </Badge>

          <h2 className="from-foreground to-foreground/80 bg-linear-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            Rapports médicaux au JSON structuré
          </h2>
          <p className="text-muted-foreground max-w-200 md:text-lg">
            Importez vos PDF et visualisez rapidement patient, diagnostics,
            dates et prescriptions.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 "
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="md:first:col-span-2 md:last:col-span-2"
            >
              <Card className="border-border/40 from-card via-card/50 to-accent hover:border-primary/50 group h-full overflow-hidden bg-linear-to-br backdrop-blur transition-all hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-4 flex size-12 items-center justify-center rounded-full transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
