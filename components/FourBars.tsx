import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

interface FourBarsProps {
  bpm: number;
}

const FourBars = forwardRef((props: FourBarsProps, ref) => {
  const { bpm } = props;
  const [currentBeat, setCurrentBeat] = useState(0);
  const on = "🟧";
  const off = "⬛";

  useEffect(() => {
    if (bpm <= 0) {
      return;
    }

    const intervalMs = 60000 / bpm;
    const interval = setInterval(() => {
      setCurrentBeat((prevBeat) => (prevBeat + 1) % 4);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [bpm]);

  useImperativeHandle(ref, () => ({
    resetBeat: () => setCurrentBeat(0),
  }));

  const beats = Array.from({ length: 4 }, (_, i) =>
    i === currentBeat ? on : off
  );

  return <span>{beats}</span>;
});

export default FourBars;
