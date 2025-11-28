import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { LiveDemo } from "@/components/live-demo";
import { Code } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-[calc(100vh-60px)]">
      <div className="flex flex-col mt-10 gap-1 justify-center px-5 w-full">
        <h1 className="md:text-6xl text-4xl font-bold">Make working with grades easy</h1>
        <h2 className="md:text-2xl text-xl md:w-2/3">A comprehensive set of tools for managing grades, convert values, verify passing status, and perform many other grade-related tasks.</h2>
        <div className="flex gap-2">
          <Button size="lg" className="w-40 mt-5 cursor-pointer" asChild>
            <a href="/docs/Welcome">Get Started</a>
          </Button>
          <Button variant="ghost" size="lg" className="w-35 mt-5 cursor-pointer" asChild>
            <a href="/systems">Search Systems</a>
          </Button>
        </div>
      </div>
      <Image src="/Drawing.png" alt="Background Drawing" className="absolute right-0 bottom-0 w-auto min-w-max pointer-events-none h-[300px] sm:h-[450px] md:h-[550px] lg:h-[700px]" style={{zIndex: 0}} width={4000} height={4000} />
    </div>
  );
}
