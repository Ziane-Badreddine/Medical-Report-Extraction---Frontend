import { RegisterForm } from "@/components/auth/register-form";
import * as motion from "motion/react-client";

export default function RegisterPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
}
