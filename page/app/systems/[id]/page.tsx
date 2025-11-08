'use client';

import Navbar from "@/components/navbar";
import GradeMappingsTable from "@/components/grade-mappings-table";
import { getAllSystems, getSystemByName, percentToGrade } from 'edusync-acadion';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";

export default function ConvertPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const Systems = getAllSystems();
    const [selectedSystemName, setSelectedSystemName] = useState<string | null>(resolvedParams.id || null);
    
    const selectedSystem = selectedSystemName ? getSystemByName(selectedSystemName) : null;

    return (
        <div className="h-full flex flex-col">
            <Navbar />
            {selectedSystem ? (
                <div className="pt-10 px-5">
                    <div className="flex justify-between gap-3 mb-8">
                        <h1 className="text-3xl font-bold">{selectedSystem?.name}</h1>
                        <a href={`https://github.com/MarcBlattmann/EduSync-Acadion/issues/new?title=Feedback%20for%20${encodeURIComponent(selectedSystem?.name || '')}&body=**Grade%20System:**%20${encodeURIComponent(selectedSystem?.name || '')}%0A**ID:**%20${selectedSystem?.id}%0A%0A**Type%20of%20feedback:**%0A-%20%5B%20%5D%20Error%20in%20grade%20mappings%0A-%20%5B%20%5D%20Incorrect%20title%20or%20description%0A-%20%5B%20%5D%20Missing%20information%0A-%20%5Bx%5D%20Other%0A%0A**Details:**%0A%0A**Suggested%20change:**%0A`} target="_blank">
                            <Button className="cursor-pointer">Suggest a change</Button>
                        </a>
                    </div>

                    {selectedSystem && (
                        <div className="space-y-4 flex gap-5">
                            <GradeMappingsTable system={selectedSystem} />
                            <div className="flex-1 prose">
                                <ReactMarkdown>{selectedSystem.info}</ReactMarkdown>
                            </div>
                            <div className="w-1/6 flex flex-col gap-3">
                                <div className="dark:bg-[#171717] bg-[#fafafa] h-fit py-2 px-3 rounded-lg">
                                    <div className="font-medium">ID : {selectedSystem.id}</div>
                                </div>
                                {selectedSystem.used_in && (
                                    <div className="dark:bg-[#171717] bg-[#fafafa] h-fit py-2 px-3 rounded-lg flex flex-col gap-1">
                                        <div className="font-medium">Used in :</div>
                                        <div className="flex gap-2 flex-wrap">
                                            {selectedSystem.used_in.map((countryCode, index) => (
                                                <Image
                                                    key={index}
                                                    alt={countryCode}
                                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                                                    width={50}
                                                    height={20}
                                                    className="rounded-sm"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex justify-center items-center px-5">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Minus />
                            </EmptyMedia>
                            <EmptyTitle>No data</EmptyTitle>
                            <EmptyDescription>Grade System not found in our records</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button className="cursor-pointer">Request</Button>
                        </EmptyContent>
                    </Empty>
                </div>
            )}
        </div>
    );
}
