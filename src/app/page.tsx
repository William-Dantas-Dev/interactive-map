"use client";
import React from "react";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});


export default function Home() {
  return (
    <main className={"absolute top-0 left-0 right-0 bottom-0 flex flex-col"}>
      <h1  className={"z-50, text-white text-center my-4"}>Mapa 2D - Ashes Of Creation - Shiroe</h1>
      <Map />
    </main>
  );
}
