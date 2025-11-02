import { Banner1 } from "@/components/banner1";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex h-15 px-5 text-1xl justify-between font-medium w-full items-center">
        <div className="flex gap-3 text-2xl font-bold w-full items-center">
          <Image
            src="/black-logo.svg"
            alt="EduSync Logo dark"
            width={30}
            height={20}
            className="block dark:hidden"
          />
          <Image
            src="/white-logo.svg"
            alt="EduSync Logo light"
            width={30}
            height={20}
            className="hidden dark:block"
          />
          <h1>EduSync Acadion</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="https://github.com/MarcBlattmann/EduSync-Acadion" target="_blank">
            <Button variant="ghost" className="cursor-pointer h-10 w-10" size="icon">
              <Github />
            </Button>
          </a>
        </div>
      </div>
      <div className="h-full px-5 w-full">
        <h1 className="text-4xl font-bold">Make working with grades easy</h1>
      </div>
    </div>
  );
}
