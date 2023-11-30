import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col gap-2 items-center p-24`}>
      <div>asdf lol</div>
      <div>again and again</div>
      <Button>Lorem ipsum</Button>
      <ModeToggle/>
    </main>
  )
}
