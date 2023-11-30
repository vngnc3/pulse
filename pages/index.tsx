import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { InputBpmFps } from "@/components/ui/input-bpm-fps";

function calculateFramesPerBeat(bpm: number, fps: number): number {
  if (bpm <= 0 || fps <= 0) {
    throw new Error("BPM and FPS must be greater than 0");
  }

  // Calculate the length of a beat in seconds
  const secondsPerBeat = 60 / bpm;

  // Convert to frames
  const framesPerBeat = fps * secondsPerBeat;

  // Return the rounded number of frames per beat
  return Math.round(framesPerBeat);
}

export default function Home() {
  const [bpm, setBpm] = useState(128);
  const [fps, setFps] = useState(24);
  const [framesPerBeat, setFramesPerBeat] = useState(
    calculateFramesPerBeat(bpm, fps)
  );
  const [framesPerBar, setFramesPerBar] = useState(framesPerBeat * 4);

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

  return (
    <main
      className={`flex min-h-screen flex-col gap-2 items-center p-24 font-black`}
    >
      <div>asdf lol</div>
      <div>again and again</div>
      <Button>Lorem ipsum</Button>
      <ModeToggle />

      {/* Input */}
      <div className="border-2 border-red-400 border-solid p-4 flex gap-1 w-screen max-w-2xl justify-center">
        <div className="flex flex-col">
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Tempo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </div>
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Frame rate :
          </div>
        </div>

        <div className="flex flex-col w-40">
          <InputBpmFps
            inputMode="numeric"
            type="number"
            placeholder="128"
            name="inputBpm"
            defaultValue={bpm}
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

        <div className="flex flex-col">
          <div className="h-1/2 p-1 flex flex-col justify-end">bpm</div>
          <div className="h-1/2 p-1 flex flex-col justify-end">fps</div>
        </div>
      </div>

      {/* Output */}
      <div className="border-2 border-red-400 border-solid p-4 flex gap-1 w-screen max-w-2xl justify-center">
        <div className="flex flex-col border-solid border-2 border-green-600">
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Frames per beat
          </div>
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Frames per bar &#40;4 beats&#41;
          </div>
        </div>
        <div className="flex flex-col border-solid border-2 border-green-600">
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
  );
}
