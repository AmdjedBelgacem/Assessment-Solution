"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound({ notFound, redirect }: { notFound: string, redirect: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4">
      <Image
        src="/cat-cats.gif"
        alt="Skating Friend"
        width={500}
        height={500}
      />
      <h1 className="text-3xl font-bold text-center">{notFound}</h1>
      <button
        className="bg-orange-500/80 hover:bg-orange-600 p-2 w-full rounded-xl font-bold text-white"
        onClick={() => router.push(`/`)}
      >
        {redirect}
      </button>
    </div>
  );
}
