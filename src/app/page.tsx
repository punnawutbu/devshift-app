
"use client";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  return (
    <div className="container text-center py-5">
      <h2 className="display-4 font-weight-bold text-dark mb-4">Welcome to DevShift.Dev</h2>
      <Image
        src="/images/devshift-signature.svg"
        alt="DevShift Logo"
        width={1080}
        height={840}
        priority
        className="img-fluid"
      />
    </div>
  );
}
