// DynamicTitle.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const shades = ["⏺", "⃝", "⃝", "⃝"];
const appTitle = "Pulse";

interface DynamicTitleProps {
  bpm: number;
}

const DynamicTitle = ({ bpm }: DynamicTitleProps) => {
  const [shadeIndex, setShadeIndex] = useState(0);

  // Convert BPM to interval in milliseconds for a quarter beat
  const intervalMs = bpm > 0 ? (60 / bpm) * 250 : 1000; // Fallback to 1 second if BPM is 0 or negative

  useEffect(() => {
    const interval = setInterval(() => {
      setShadeIndex((prevIndex) => (prevIndex + 1) % shades.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <Head>
      <title>{`${appTitle} | ${bpm} bpm ${shades[shadeIndex]}`}</title>
    </Head>
  );
};

export default DynamicTitle;
