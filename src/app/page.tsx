"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return null; // Will be redirect so do not need to return anything
}