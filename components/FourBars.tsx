import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

interface FourBarsProps {
  bpm: number;
}

const FourBars = forwardRef((props: FourBarsProps, ref) => {
  const { bpm } = props;
  const [currentBeat, setCurrentBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const on = "🟧";
  const off = "⬛";

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const intervalMs = bpm > 0 ? 60000 / bpm : 1000;
    intervalRef.current = setInterval(() => {
      setCurrentBeat((prevBeat) => (prevBeat + 1) % 4);
    }, intervalMs);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bpm]);

  useImperativeHandle(ref, () => ({
    resetBeat: () => {
      setCurrentBeat(0);
      startInterval(); // Restart the interval
    },
  }));

  const beats = Array.from({ length: 4 }, (_, i) =>
    i === currentBeat ? on : off
  );

  return <span>{beats}</span>;
});

FourBars.displayName = "FourBars";

export default FourBars;
