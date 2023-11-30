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
      <div className="border-2 border-red-400 border-solid p-4 flex-initial">
        <div className="border-2 border-blue-800 border-solid">
          Lorem ipsum
        </div>
        <div>
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
      </div>
    </main>
  );
}
