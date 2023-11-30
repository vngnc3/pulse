import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { InputBpmFps } from "@/components/ui/input-bpm-fps";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DynamicTitle from "@/components/TitleDynamic";
import FourBars from "@/components/FourBars";

function calculateFramesPerBeat(bpm: number, fps: number): number {
  // Check for invalid input and log an error
  if (bpm <= 0 || fps <= 0) {
    console.error("BPM and FPS must be greater than 0");
    return 0;
  }

  // Calculate the length of a beat in seconds
  const secondsPerBeat = 60 / bpm;

  // Convert to frames
  const framesPerBeat = fps * secondsPerBeat;

  // Return the rounded number of frames per beat
  return Math.round(framesPerBeat);

  // TODO: Calculate real frames per beat, then build a logic to recommend frames pulldown
}

export default function Home() {
  const [fps, setFps] = useState(24);
  const [bpm, setBpm] = useState(128); // BPM set by manual input
  const [tappedBpm, setTappedBpm] = useState(128); // BPM set by tapping
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [framesPerBeat, setFramesPerBeat] = useState(
    calculateFramesPerBeat(bpm, fps)
  );
  const [framesPerBar, setFramesPerBar] = useState(framesPerBeat * 4);

  const handleTap = () => {
    const now = Date.now();
    setTapTimes((prevTimes) => {
      if (
        prevTimes.length > 0 &&
        now - prevTimes[prevTimes.length - 1] > 4000
      ) {
        // If more than 4 seconds have passed since the last tap, reset the streak
        return [now];
      } else {
        // Otherwise, continue the current streak
        return [...prevTimes, now];
      }
    });
  };

  useEffect(() => {
    if (tapTimes.length > 1) {
      const intervals = tapTimes
        .slice(1)
        .map((time, index) => time - tapTimes[index]);
      const averageInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = 60000 / averageInterval;
      setTappedBpm(Math.round(calculatedBpm));
    }
  }, [tapTimes]);

  useEffect(() => {
    setBpm(tappedBpm);
  }, [tappedBpm]);

  useEffect(() => {
    try {
      const fpb = calculateFramesPerBeat(bpm, fps);
      setFramesPerBeat(fpb);
      setFramesPerBar(fpb * 4); // Assuming a bar has 4 beats
    } catch (error) {
      console.error(error);
    }
  }, [bpm, fps]);

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(event.target.value));
  };

  const handleFpsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFps(Number(event.target.value));
  };

  const fourBarsRef = useRef<{ resetBeat: () => void }>(null);

  const handleReset = () => {
    if (fourBarsRef.current) {
      fourBarsRef.current.resetBeat();
    }
  };

  return (
    <>
      <DynamicTitle bpm={bpm} />
      <main
        className={`flex min-h-screen flex-col gap-2 items-center p-0 font-semibold`}
      >

        {/* Banner */}
        <div className="p-4 flex gap-1 justify-between content-center w-screen">
          <div className="align-bottom text-4xl font-extrabold pt-1">Pulse</div>
          <div className="align-bottom text-4xl font-extrabold pt-0"><ModeToggle /></div>
        </div>
        <Separator className="mb-6" />
        
        {/* Tap and sync */}
        <div className="text-2xl mt-4 mb-6">
          <FourBars ref={fourBarsRef} bpm={bpm} />
        </div>
        <div className="p-0 flex gap-20 w-screen max-w-2xl justify-center mb-6">
          <div className="p-1 flex gap-0 max-w-2xl justify-center">
            <Button className="text-md p-6" onClick={handleTap}>
              &nbsp;Tap&nbsp;
            </Button>
          </div>
          <div className="p-1 flex gap-1 max-w-2xl justify-center">
            <Button className="text-md p-6" onClick={handleReset}>
              Resync
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 flex gap-1 w-screen max-w-2xl justify-center mb-6">
          <div className="flex flex-col gap-1">
            <div className="h-1/2 p-1 flex flex-col justify-end">Tempo</div>
            <div className="h-1/2 p-1 flex flex-col justify-end">
              Frame rate &nbsp;&nbsp;
            </div>
          </div>

          <div className="flex flex-col w-40 gap-1">
            <InputBpmFps
              inputMode="numeric"
              type="number"
              placeholder="128"
              name="inputBpm"
              value={bpm}
              onChange={handleBpmChange}
            />
            <InputBpmFps
              inputMode="numeric"
              type="number"
              placeholder="24"
              name="inputFps"
              defaultValue={fps}
              onChange={handleFpsChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="h-1/2 p-1 flex flex-col justify-end">bpm</div>
            <div className="h-1/2 p-1 flex flex-col justify-end">fps</div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Output */}
        <div className="p-4 flex gap-1 w-screen max-w-2xl justify-center font-light italic text-sm">
          <div className="flex flex-col w-1/2">
            <div className="h-1/2 p-1 flex flex-col justify-end">
              Frames per beat
            </div>
            <div className="h-1/2 p-1 flex flex-col justify-end">
              Frames per bar &#40;4/4&#41;
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-1/2 p-1 flex flex-col justify-end">
              {/* // The result for frames per beat should be rendered here, everytime the input is changed */}
              {framesPerBeat}
            </div>
            <div className="h-1/2 p-1 flex flex-col justify-end">
              {/* // The result for frames per bar (four beats) should be rendered here, everytime the input is changed */}
              {framesPerBar}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
