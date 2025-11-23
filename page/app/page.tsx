import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-10">
        <div className="flex flex-col gap-1 justify-center px-5 w-full">
          <h1 className="text-6xl font-bold">Make working with grades easy</h1>
          <h2 className="text-2xl">Universal grade conversion and analysis toolkit for international education systems.</h2>
          <Button size="lg" className="w-40 mt-5 cursor-pointer" asChild>
            <a href="/docs/Welcome">Get Started</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
