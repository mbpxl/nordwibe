import PhoneInput from "@/page/Sign/Up/Phone";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Nordwibe",
  description: "The register page"
}

export default function SignUpPage() {
  return <PhoneInput />;
}
