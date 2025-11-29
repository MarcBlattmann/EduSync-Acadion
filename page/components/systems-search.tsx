"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getAllSystems } from "edusync-acadion"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Spinner } from "@/components/ui/spinner"

function FlagImage({ country, width, height, shouldStretch }: { country: string; width: number; height: number; shouldStretch: boolean }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: shouldStretch ? '32px' : `${width}px`, height: `${height}px` }}
      title={country}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Spinner className="size-3" />
        </div>
      )}
      <Image
        alt={country}
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
        fill
        className="object-cover"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

export default function SystemsSearch() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const systems = getAllSystems()
  const searchRef = useRef<HTMLDivElement>(null)

  const getCountryName = (countryCode: string) => {
    try {
      const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
      return displayNames.of(countryCode) || countryCode
    } catch {
      return countryCode
    }
  }

  const filteredSystems = useMemo(() => {
    if (!searchQuery) return systems

    return systems.filter((system) =>
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (system.used_in?.some((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCountryName(country).toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? false)
    )
  }, [searchQuery, systems])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [open])

  const handleSelectSystem = (systemName: string) => {
    setOpen(false)
    setSearchQuery("")
    router.push(`/systems/${encodeURIComponent(systemName)}`)
  }

  return (
    <div className="w-full max-w-2xl" ref={searchRef}>
      <Command shouldFilter={false} className="border">
        <CommandInput
          placeholder="Search grading systems by name or country..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <CommandList>
            {filteredSystems.length === 0 ? (
              <CommandEmpty>No systems found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Available Systems">
                {filteredSystems.map((system) => (
                  <CommandItem
                    key={system.id}
                    value={system.id.toString()}
                    onSelect={() => handleSelectSystem(system.name)}
                    className="cursor-pointer"
                  >
                    <div className="flex gap-4 items-center flex-1 w-full">
                      <div className="w-8 h-6 flex flex-wrap gap-1 overflow-hidden rounded-[3px]">
                        {system.used_in?.map((country, index) => {
                          const count = system.used_in?.length || 1
                          const cols = Math.ceil(Math.sqrt(count))
                          const rows = Math.ceil(count / cols)
                          const gapSize = 4
                          const flagWidth = (32 - (cols - 1) * gapSize) / cols
                          const flagHeight = (24 - (rows - 1) * gapSize) / rows
                          const isLastRow = index >= count - (count % cols || cols)
                          const remainingInLastRow = count % cols || cols
                          const shouldStretch = isLastRow && remainingInLastRow === 1 && count > 1
                          return (
                            <FlagImage
                              key={country}
                              country={country}
                              width={flagWidth}
                              height={flagHeight}
                              shouldStretch={shouldStretch}
                            />
                          )
                        })}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="font-medium truncate">{system.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Used in: {system.used_in?.map((country) => getCountryName(country)).join(", ")}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  )
}