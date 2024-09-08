"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to DevShift App</h1>
      <Image
        src="/images/devshift-signature.svg"
        alt="Logo"
        width={1080}
        height={840}
        priority
      />
    </div>
  );
}
