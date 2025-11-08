'use client';

import Navbar from "@/components/navbar";
import GradeMappingsTable from "@/components/grade-mappings-table";
import Image from 'next/image';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllSystems, getSystemByName } from 'edusync-acadion';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';


export default function ConvertPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const Systems = getAllSystems();
    const [selectedSystemName, setSelectedSystemName] = useState<string | null>(resolvedParams.id || null);
    
    const selectedSystem = selectedSystemName ? getSystemByName(selectedSystemName) : null;

    return (
        <>
            <Navbar />
            <div className="pt-10 px-5">
                <div className="flex justify-between gap-3 mb-8">
                    <h1 className="text-3xl font-bold">Systems</h1>
                    <Select value={selectedSystemName || ""} onValueChange={(value) => {
                        setSelectedSystemName(value);
                        router.push(`/systems/${value}`);
                    }}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select a System" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Systems.flatMap((system) =>
                                    system.used_in?.map((country) => (
                                        <SelectItem key={`${system.id}-${country}`} value={system.name}>
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    alt={system.name}
                                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                                                    height={20}
                                                    width={20}
                                                    className="rounded-[2px]"
                                                />
                                                {system.name}
                                            </div>
                                        </SelectItem>
                                    )) || []
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {selectedSystem && (
                    <div className="space-y-4">
                        <GradeMappingsTable system={selectedSystem} />
                    </div>
                )}
            </div>
        </>
    );
}
