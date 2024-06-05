import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { InputBpmFps } from "@/components/ui/input-bpm-fps";
import DynamicTitle from "@/components/TitleDynamic";
import FourBars from "@/components/FourBars";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  return framesPerBeat;

  // TODO: Calculate real frames per beat, then build a logic to recommend frames pulldown
}

function calculateOverflowFrames(rawfpb: number) {
  // rawfpb is actual frames per beat
  // grab the overflow or underflow frames
  // inform the user when to add (or remove) an extra frame after every X frames
  // this technique is known as pulldown in video format

  let roundedFpb = Math.round(rawfpb);
  let overflow = rawfpb - roundedFpb;
  if (overflow === 0) {
    return 0;
  }
  let pulldown = Math.floor(1 / overflow);
  if (pulldown === Infinity) {
    return 0;
  } else {
    return pulldown;
  }
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
          <div className="align-bottom text-4xl font-extrabold pt-0">
            <ModeToggle />
          </div>
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

        <Separator className="mb-1" />

        {/* Output */}

        <div className="p-4 pb-6 flex gap-1 w-96 justify-center font-light text-sm">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Frames/beat</TableCell>
                <TableCell className="text-right">
                  {Math.round(framesPerBeat)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Frames/bar</TableCell>
                <TableCell className="text-right">
                  {Math.round(framesPerBar)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Actual frames/beat
                </TableCell>
                <TableCell className="text-right">{framesPerBeat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Overflow frames❔</TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {calculateOverflowFrames(framesPerBeat) > 0
                            ? "Add "
                            : "Remove "}
                          1 frame after every{" "}
                          {Math.abs(calculateOverflowFrames(framesPerBeat))}{" "}
                          beats to nudge the animation back in sync with the
                          tempo.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  {calculateOverflowFrames(framesPerBeat) === 0
                    ? "No overflow ✨"
                    : calculateOverflowFrames(framesPerBeat)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Separator className="mb-6" />
        {/* // WIP, generate and download markers for different DCC apps */}
        {/* <div className="flex flex-col pb-6">
          Download Markers
          <Button variant="outline">Blender</Button>
        </div>
        <Separator className="mb-6" /> */}
        <div className="flex flex-col text-xs text-center font-light opacity-50 p-6">
          <span>
            <a
              className="hover:text-orange-500 transition duration-200"
              href="https://github.com/vngnc3/pulse"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            /{" "}
            <a
              className="hover:text-orange-500 transition duration-200"
              href="https://x.com/vngnc"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </span>
          <span>
            <a
              className="hover:text-orange-500 transition duration-200"
              href="https://xxxxizzy.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              xxxxizzy.xyz
            </a>
          </span>
        </div>
      </main>
    </>
  );
}
