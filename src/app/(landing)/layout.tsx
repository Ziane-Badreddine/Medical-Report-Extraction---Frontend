import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex-1">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
