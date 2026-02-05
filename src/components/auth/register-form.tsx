"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/register-schema";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { CircleCheck, CircleX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const passwordRequirements = [
  { regex: /.{8,}/, label: "Au moins 8 caractères" },
  { regex: /[A-Z]/, label: "Une lettre majuscule" },
  { regex: /[a-z]/, label: "Une lettre minuscule" },
  { regex: /\d/, label: "Un chiffre" },
  { regex: /[!@#$%^&*(),.?\":{}|<>]/, label: "Un caractère spécial" },
];

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { register } = useAuth();
  const router = useRouter();
  const isSubmitting = form.formState.isSubmitting;
  const passwordValue = form.watch("password");

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await register(
      { ...values },
      {
        onSuccess: (ctx) => {
          toast.success(ctx.data.message);
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Logo size={45} />
            <h1 className="text-xl font-bold">Bienvenue chez Acme Inc.</h1>
            <FieldDescription>
              Vous avez déjà un compte ? <Link href="/login">Se connecter</Link>
            </FieldDescription>
          </div>

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Jean Dupont"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="exemple@email.com"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                  disabled={isSubmitting}
                />

                <AnimatePresence>
                  {(passwordValue || form.formState.isSubmitted) && (
                    <motion.div
                      key="password-requirements"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-2 space-y-1 overflow-hidden"
                    >
                      {passwordRequirements.map((req) => {
                        const isValid = req.regex.test(passwordValue);

                        return (
                          <motion.div
                            key={req.label}
                            initial={false}
                            animate={{ opacity: isValid ? 1 : 0.5 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "flex items-center gap-2 text-sm text-muted-foreground"
                            )}
                          >
                            <AnimatePresence mode="wait">
                              {isValid ? (
                                <motion.span
                                  key="check"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <CircleCheck className="size-4 text-green-700" />
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="x"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <CircleX className="size-4 text-destructive" />
                                </motion.span>
                              )}
                            </AnimatePresence>

                            <span>{req.label}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Field>
            )}
          />

          <Field>
            <Button
              disabled={isSubmitting}
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting && <Spinner />} Créer un compte
            </Button>
          </Field>
        </FieldGroup>
      </div>

      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez nos{" "}
        <a href="#">Conditions d’utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </FieldDescription>
    </div>
  );
}
