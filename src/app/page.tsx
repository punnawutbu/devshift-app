
"use client";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css';
import { Label } from "reactstrap";

export default function Home() {
  return (
    <div className="container text-center py-5">
      <Label style={{ fontWeight: 'bold', fontSize: '3rem' }}>Welcome to </Label>  <Label style={{ fontWeight: 'bold', fontSize: '3rem', color: '#f5994b' }}>DevShift.Dev</Label>
      {/* <Image
        src="/images/devshift-signature.svg"
        alt="DevShift Logo"
        width={1080}
        height={840}
        priority
        className="img-fluid"
      /> */}
    </div>
  );
}
