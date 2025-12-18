import * as motion from "motion/react-client";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
        filter: "blur(16px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { delay: 0.2, duration: 0.5 },
      }}
      className="border-t border-border/40 px-4 md:px-10 py-4.5 text-center text-sm text-muted-foreground  fixed hidden sm:block w-full bottom-0"
    >
      © 2025 — Plateforme de structuration des rapports médicaux · Tous droits
      réservés
    </motion.footer>
  );
}
