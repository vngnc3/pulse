// DynamicTitle.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const shades = ["⃝", "⏺"];
const appTitle = "Pulse";
const intervalMs = 476;

const DynamicTitle = () => {
  const [shadeIndex, setShadeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShadeIndex((prevIndex) => (prevIndex + 1) % shades.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <Head>
      <title>{`${appTitle} ${shades[shadeIndex]}`}</title>
    </Head>
  );
};

export default DynamicTitle;
