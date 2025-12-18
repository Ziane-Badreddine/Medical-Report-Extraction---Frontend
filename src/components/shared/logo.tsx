"use client";

import Image from "next/image";
import Link from "next/link";
interface LogoProps {
  size?: number;
}

export default function Logo({ size = 35 }: LogoProps) {
  return (
    <Link href={"/"} className="flex items-center fill-primary gap-2">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={size}
        height={size}
        className="fill-primary"
      />
    </Link>
  );
}
