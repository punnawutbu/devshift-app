"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="home-page">
      <h1 className="text-4xl font-bold mb-4  color-text">Welcome to DevShift.Dev</h1>
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
