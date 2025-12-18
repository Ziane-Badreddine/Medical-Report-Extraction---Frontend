import Link from "next/link";
import * as motion from "motion/react-client";

import { Button } from "../ui/button";
import Logo from "./logo";

export default function Header() {
  return (
    <header className=" sticky inset-0 w-full h-16 z-50 px-4 md:px-10 bg-background border-b border-border/40  ">
      <div className=" w-full h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
        >
          <Logo />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.2, duration: 0.2 },
            }}
          >
            <Link href={"/login"}>
              <Button
                variant={"outline"}
                className=" cursor-pointer hover:rounded-none transition-all duration-300"
              >
                login
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.5, duration: 0.2 },
            }}
          >
            <Link href={"/register"}>
              <Button className=" cursor-pointer hover:rounded-none transition-all duration-300">
                {" "}
                register
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
