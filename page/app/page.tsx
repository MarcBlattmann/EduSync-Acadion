import { Banner1 } from "@/components/banner1";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="w-full h-full">
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
          <NavigationMenu className="ml-3">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="cursor-pointer">
                  <Link href="/convert">
                    Convert
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="cursor-pointer">
                  <Link href="/convert">
                    Docs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
      <div className="flex flex-col gap-1 justify-center h-2/8 px-5 w-full">
        <h1 className="text-4xl font-bold">Make working with grades easy</h1>
        <h2 className="text-lg">Universal grade conversion and analysis toolkit for international education systems.</h2>
        <Button size="lg" className="w-40 mt-5 cursor-pointer" asChild>
          <a>Get Started</a>
        </Button>
      </div>
    </div>
  );
}
