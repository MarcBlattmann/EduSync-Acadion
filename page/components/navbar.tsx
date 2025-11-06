import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export default function Navbar() {
    return (
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
                  <Link href="/systems">
                    Systems
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
    )
}