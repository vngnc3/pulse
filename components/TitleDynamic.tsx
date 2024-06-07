import Head from "next/head";

const appTitle = "Pulse";
const ogImagePath = "/pulse-og.png";

interface DynamicTitleProps {
  bpm: number;
}

const DynamicTitle = ({ bpm }: DynamicTitleProps) => {
  return (
    <Head>
      <title>{`${appTitle} | ${bpm} bpm`}</title>
      <meta property="og:title" content="Pulse" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pulse.vngnc.xyz/" />
      <meta
        property="og:image"
        content="https://pulse.vngnc.xyz/pulse-og.png"
      />
    </Head>
  );
};

export default DynamicTitle;
