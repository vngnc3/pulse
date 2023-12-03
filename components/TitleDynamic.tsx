import Head from 'next/head';

const appTitle = "Pulse";

interface DynamicTitleProps {
  bpm: number;
}

const DynamicTitle = ({ bpm }: DynamicTitleProps) => {

  return (
    <Head>
      <title>{`${appTitle} | ${bpm} bpm`}</title>
    </Head>
  );
};

export default DynamicTitle;
