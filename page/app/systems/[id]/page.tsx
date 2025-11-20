'use client';

import GradeMappingsTable from "@/components/grade-mappings-table";
import { getAllSystems, getSystemByName, percentToGrade } from 'edusync-acadion';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ConvertPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const decodedSystemName = decodeURIComponent(resolvedParams.id);
    const [selectedSystemName] = useState<string | null>(decodedSystemName || null);
    
    const selectedSystem = selectedSystemName ? getSystemByName(selectedSystemName) : null;

    const getCountryName = (countryCode: string) => {
        try {
            const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
            return displayNames.of(countryCode);
        } catch {
            return countryCode;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {selectedSystem ? (
                <div className="pt-10 px-5">
                    <div className="flex justify-between gap-3 mb-8">
                        <h1 className="text-3xl font-bold">{selectedSystem?.name}</h1>
                        <a href={`https://github.com/MarcBlattmann/EduSync-Acadion/issues/new?title=Feedback%20for%20${encodeURIComponent(selectedSystem?.name || '')}&body=**Grade%20System:**%20${encodeURIComponent(selectedSystem?.name || '')}%0A**ID:**%20${selectedSystem?.id}%0A%0A**Type%20of%20feedback:**%0A-%20%5B%20%5D%20Error%20in%20grade%20mappings%0A-%20%5B%20%5D%20Incorrect%20title%20or%20description%0A-%20%5B%20%5D%20Missing%20information%0A-%20%5Bx%5D%20Other%0A%0A**Details:**%0A%0A**Suggested%20change:**%0A`} target="_blank">
                            <Button className="cursor-pointer">Suggest a change</Button>
                        </a>
                    </div>

                    {selectedSystem && (
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-col gap-5 w-full md:w-auto order-2 md:order-1">
                                <GradeMappingsTable system={selectedSystem} />
                            </div>
                            <div className="hidden md:flex flex-col prose flex-1 order-2">
                                <ReactMarkdown>{selectedSystem.info}</ReactMarkdown>
                            </div>
                            <div className="w-full md:w-1/6 flex flex-col gap-3 order-1 md:order-3">
                                <div className="dark:bg-[#171717] bg-[#fafafa] h-fit py-2 px-3 rounded-lg dark:border-0 border">
                                    <div className="font-medium">ID : {selectedSystem.id}</div>
                                </div>
                                {selectedSystem.used_in && (
                                    <div className="dark:bg-[#171717] bg-[#fafafa] dark:border-0 border h-fit pt-2 pb-3 px-3 rounded-lg flex flex-col gap-1">
                                        <div className="font-medium">Used in :</div>
                                        <div className="flex gap-2 flex-wrap">
                                            {selectedSystem.used_in.map((countryCode, index) => (
                                                <Tooltip key={index}>
                                                    <TooltipTrigger>
                                                        <Image
                                                            alt={countryCode}
                                                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                                                            width={50}
                                                            height={20}
                                                            className="rounded-sm"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{getCountryName(countryCode)}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="md:hidden prose w-full order-4">
                                <ReactMarkdown>{selectedSystem.info}</ReactMarkdown>
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
