"use client"

import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Github, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex bg-background h-15 px-5 text-1xl justify-between font-medium items-center fixed top-0 w-full max-w-360 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-3 text-2xl font-bold items-center">
          <a href="/" className="flex gap-3">
            <Image
              src="/black-logo.svg"
              alt="EduSync Logo"
              width={30}
              height={20}
              className="block dark:hidden will-change-auto"
              priority
            />
            <Image
              src="/white-logo.svg"
              alt="EduSync Logo"
              width={30}
              height={20}
              className="hidden dark:block will-change-auto"
              priority
            />
            <h1>EduSync Acadion</h1>
          </a>
          <NavigationMenu className="ml-3 hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="cursor-pointer">
                  <Link href="/systems" className="px-3 py-2">
                    Systems
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="cursor-pointer">
                  <Link href="/docs" className="px-3 py-2">
                    Docs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="items-center gap-2 hidden md:flex">
          <ThemeToggle />
          <a href="https://github.com/MarcBlattmann/EduSync-Acadion" target="_blank">
            <Button variant="ghost" className="cursor-pointer h-10 w-10" size="icon">
              <Github />
            </Button>
          </a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" className="cursor-pointer h-10 w-10" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full data-[state=open]:animate-none data-[state=closed]:animate-none p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-15 px-5 justify-between items-center">
                <a href="/" className="flex gap-3" onClick={() => setOpen(false)}>
                  <Image
                    src="/black-logo.svg"
                    alt="EduSync Logo"
                    width={30}
                    height={20}
                    className="block dark:hidden will-change-auto"
                    priority
                  />
                  <Image
                    src="/white-logo.svg"
                    alt="EduSync Logo"
                    width={30}
                    height={20}
                    className="hidden dark:block will-change-auto"
                    priority
                  />
                </a>
              </div>
              <div className="flex flex-col gap-4 mt-10 px-2">
                <Link 
                  href="/systems"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold px-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
                >
                  Systems
                </Link>
                <Link 
                  href="/docs"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold px-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
                >
                  Docs
                </Link>
                <a
                  href="https://github.com/MarcBlattmann/EduSync-Acadion"
                  target="_blank"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold px-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded flex items-center gap-2"
                >
                  GitHub
                </a>
              </div>
            </SheetContent>
          </Sheet>
      </div>
    )
}