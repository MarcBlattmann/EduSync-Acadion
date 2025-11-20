import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-1 justify-center mt-10 px-5 w-full">
        <h1 className="text-4xl font-bold">Make working with grades easy</h1>
        <h2 className="text-lg">Universal grade conversion and analysis toolkit for international education systems.</h2>
        <Button size="lg" className="w-40 mt-5 cursor-pointer" asChild>
          <a>Get Started</a>
        </Button>
      </div>
    </div>
  );
}
