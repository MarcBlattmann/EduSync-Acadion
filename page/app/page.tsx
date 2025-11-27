import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { LiveDemo } from "@/components/live-demo";
import { Code } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-full flex justify-center flex-col">
        <div className="flex w-full justify-center items-center mt-25">
          <div className="flex flex-col gap-1 justify-center px-5 w-full">
            <h1 className="text-6xl font-bold">Make working with grades easy</h1>
            <h2 className="text-2xl w-2/3">A comprehensive set of tools for managing grades, convert values, verify passing status, and perform many other grade-related tasks.</h2>
            <div className="flex gap-2">
              <Button size="lg" className="w-40 mt-5 cursor-pointer" asChild>
                <a href="/docs/Welcome">Get Started</a>
              </Button>
              <Button variant="ghost" size="lg" className="w-35 mt-5 cursor-pointer" asChild>
                <a href="/systems">Search Systems</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-30 px-5">
        <div>
          <h1 className="text-3xl font-bold">Grade Convertion</h1>
          <a className="text-md text-muted-foreground font-semibold">Convert grades between any two grading systems instantly</a>
          <div className="mt-5">
            <LiveDemo />
          </div>
        </div>
      </div>
    </>
  );
}
