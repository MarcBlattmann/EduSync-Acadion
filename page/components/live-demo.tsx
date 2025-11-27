'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getAllSystems, convertGradeToGrade, getColor, getGradeDescription, GradeSystem } from 'edusync-acadion';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronDown } from 'lucide-react';

interface SystemSelectorProps {
  systems: GradeSystem[];
  selectedSystem: GradeSystem | null;
  onSelect: (system: GradeSystem) => void;
  placeholder: string;
}

function SystemSelector({ systems, selectedSystem, onSelect, placeholder }: SystemSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const getCountryName = (countryCode: string) => {
    try {
      const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return displayNames.of(countryCode) || countryCode;
    } catch {
      return countryCode;
    }
  };

  const filteredSystems = useMemo(() => {
    if (!searchQuery) return systems;

    return systems.filter((system) =>
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (system.used_in?.some((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCountryName(country).toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? false)
    );
  }, [searchQuery, systems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open]);

  const handleSelectSystem = (system: GradeSystem) => {
    setOpen(false);
    setSearchQuery("");
    onSelect(system);
  };

  return (
    <div className="w-full relative" ref={searchRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none dark:bg-input/30"
      >
        {selectedSystem ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 flex flex-wrap gap-0.5 overflow-hidden rounded-[2px]">
              {selectedSystem.used_in?.map((country, index) => {
                const count = selectedSystem.used_in?.length || 1;
                const cols = Math.ceil(Math.sqrt(count));
                const rows = Math.ceil(count / cols);
                const gapSize = 2;
                const flagWidth = (24 - (cols - 1) * gapSize) / cols;
                const flagHeight = (16 - (rows - 1) * gapSize) / rows;
                const isLastRow = index >= count - (count % cols || cols);
                const remainingInLastRow = count % cols || cols;
                const shouldStretch = isLastRow && remainingInLastRow === 1 && count > 1;
                return (
                  <div
                    key={country}
                    className="relative overflow-hidden"
                    style={{ width: shouldStretch ? '24px' : `${flagWidth}px`, height: `${flagHeight}px` }}
                    title={getCountryName(country)}
                  >
                    <Image
                      alt={country}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <span className="truncate">{selectedSystem.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md">
          <Command shouldFilter={false} className="rounded-md">
            <CommandInput
              placeholder="Search by name or country..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              autoFocus
            />
            <CommandList className="max-h-[250px]">
              {filteredSystems.length === 0 ? (
                <CommandEmpty>No systems found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredSystems.map((system) => (
                    <CommandItem
                      key={system.id}
                      value={system.id.toString()}
                      onSelect={() => handleSelectSystem(system)}
                      className="cursor-pointer"
                    >
                      <div className="flex gap-3 items-center flex-1 w-full">
                        <div className="w-8 h-6 flex flex-wrap gap-1 overflow-hidden rounded-[3px]">
                          {system.used_in?.map((country, index) => {
                            const count = system.used_in?.length || 1;
                            const cols = Math.ceil(Math.sqrt(count));
                            const rows = Math.ceil(count / cols);
                            const gapSize = 4;
                            const flagWidth = (32 - (cols - 1) * gapSize) / cols;
                            const flagHeight = (24 - (rows - 1) * gapSize) / rows;
                            const isLastRow = index >= count - (count % cols || cols);
                            const remainingInLastRow = count % cols || cols;
                            const shouldStretch = isLastRow && remainingInLastRow === 1 && count > 1;
                            return (
                              <div
                                key={country}
                                className="relative overflow-hidden"
                                style={{ width: shouldStretch ? '32px' : `${flagWidth}px`, height: `${flagHeight}px` }}
                                title={country}
                              >
                                <Image
                                  alt={country}
                                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="font-medium truncate">{system.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {system.used_in?.map((country) => getCountryName(country)).join(", ")}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}

export function LiveDemo() {
  const [systems, setSystems] = useState<GradeSystem[]>([]);
  const [fromSystem, setFromSystem] = useState<GradeSystem | null>(null);
  const [toSystem, setToSystem] = useState<GradeSystem | null>(null);
  const [inputGrade, setInputGrade] = useState<string>('');
  const [result, setResult] = useState<{
    grade: number | string;
    color: string;
    description: string | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const allSystems = getAllSystems();
    setSystems(allSystems);
    if (allSystems.length >= 2) {
      setFromSystem(allSystems[0]);
      setToSystem(allSystems[1]);
    }
  }, []);

  useEffect(() => {
    if (!fromSystem || !toSystem || !inputGrade) {
      setResult(null);
      setError(null);
      return;
    }

    const gradeNum = parseFloat(inputGrade);
    if (isNaN(gradeNum)) {
      setError('Enter a valid number');
      setResult(null);
      return;
    }

    try {
      const converted = convertGradeToGrade(fromSystem, toSystem, gradeNum);
      const color = getColor(toSystem, converted.grade);
      const description = getGradeDescription(toSystem, converted.grade);
      
      setResult({
        grade: typeof converted.grade === 'number' ? Math.round(converted.grade * 100) / 100 : converted.grade,
        color,
        description,
      });
      setError(null);
    } catch (e) {
      setError('Could not convert');
      setResult(null);
    }
  }, [fromSystem, toSystem, inputGrade]);

  const colorMap: { [key: string]: string } = {
    red: '#ef4444',
    orange: '#f97316',
    green: '#22c55e',
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* From System */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">From</span>
          <SystemSelector
            systems={systems}
            selectedSystem={fromSystem}
            onSelect={setFromSystem}
            placeholder="Search source system..."
          />
          <Input
            type="number"
            step="0.1"
            placeholder="Enter grade"
            value={inputGrade}
            onChange={(e) => setInputGrade(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center pt-9">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* To System */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">To</span>
          <SystemSelector
            systems={systems}
            selectedSystem={toSystem}
            onSelect={setToSystem}
            placeholder="Search target system..."
          />
          
          {/* Result Display */}
          <div className="h-10 rounded-md border bg-muted/30 px-3 flex items-center justify-between">
            {result ? (
              <>
                <span 
                  className="text-xl font-bold"
                  style={{ color: colorMap[result.color] }}
                >
                  {result.grade}
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.description}
                </span>
              </>
            ) : error ? (
              <span className="text-sm text-destructive">{error}</span>
            ) : (
              <span className="text-sm text-muted-foreground">Result</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
