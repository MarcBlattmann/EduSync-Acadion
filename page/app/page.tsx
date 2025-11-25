import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Code } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-full flex justify-center flex-col">
        <div className="flex w-full justify-center items-center mt-10">
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
        <div className="prose w-full dark:prose-invert max-w-none px-5 mt-15">
          <CodeBlock className="language-javascript">
            {`import { convertGradeToGrade, getSystemById } from 'edusync-acadion';

const swissSystem = getSystemById(1);
const germanSystem = getSystemById(2);

const SwissGrade = 5.5;
const GermanGrade = convertGradeToGrade(swissSystem, germanSystem, SwissGrade);`}
          </CodeBlock>
        </div>
      </div>
      <div className="ml-5 mt-30">
        <h1 className="text-2xl font-medium">All you need</h1>
        <div className="flex flex-wrap gap-5 mt-3">
            <div className="p-4 w-1/2 flex justify-end flex-col md:h-50 h-70 bg-accent rounded-md relative overflow-hidden">
              <div 
                className="absolute h-full inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/ConvertBG.png')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-accent via-accent to-transparent opacity-90" />
              <div className="flex flex-col relative z-10">
                <span className="text-2xl font-semibold text-white">Grade Conversion</span>
                <span className="text-white/90 max-w-130">Just pass the grade, the source system, and the target system arguments, and it returns the converted value instantly.</span>
              </div>
            </div>
            <div className="h-15">
              Test
            </div>
            <div className="h-15">
              Test
            </div>
            <div className="h-15">
              Test
            </div>
        </div>
      </div>
    </>
  );
}
