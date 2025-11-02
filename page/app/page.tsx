import { Banner1 } from "@/components/banner1";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex h-15 px-5 text-1xl justify-between font-medium w-full items-center">
        <div className="flex gap-3 text-2xl font-bold w-full">
          <Image
            src="/black-logo.svg"
            alt="EduSync Logo"
            width={30}
            height={20}
          />
          <h1>EduSync Acadion</h1>
        </div>
        <Button variant="ghost" className="cursor-pointer h-10 w-10" size="icon">
          <Github />
        </Button>
      </div>
      <div className="h-full w-full">
        <Image
          src="/black-logo.svg"
          alt="EduSync Logo"
          width={150}
          height={100}
        />
      </div>
    </div>
  );
}
