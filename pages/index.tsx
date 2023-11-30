import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { InputHero } from "@/components/ui/input-hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-2 items-center p-24 font-black`}
    >
      <div>asdf lol</div>
      <div>again and again</div>
      <Button>Lorem ipsum</Button>
      <ModeToggle />

      <div className="border-2 border-red-400 border-solid p-4 flex gap-1 w-screen max-w-2xl justify-center">
        <div className="flex flex-col">
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Frame rate :
          </div>
          <div className="h-1/2 p-1 flex flex-col justify-end">
            Tempo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </div>
        </div>

        <div className="flex flex-col w-40">
          <InputHero
            inputMode="numeric"
            type="number"
            placeholder="24"
            name="inputFps"
            defaultValue={24}
          />
          <InputHero
            inputMode="numeric"
            type="number"
            placeholder="128"
            name="inputBpm"
            defaultValue={128}
          />
        </div>

        <div className="flex flex-col">
          <div className="h-1/2 p-1 flex flex-col justify-end">
            fps
          </div>
          <div className="h-1/2 p-1 flex flex-col justify-end">
            bpm
          </div>
        </div>
      </div>
    </main>
  );
}
