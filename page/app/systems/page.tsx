'use client';

import SystemsSearch from "@/components/systems-search";
import Image from "next/image";


export default function SystemsPage() {

    return (
        <div className="relative overflow-hidden h-[calc(100vh-60px)]">
            <div className="pt-10 px-5 flex flex-col h-full">
                <div className="flex flex-col gap-3 mb-8">
                    <h1 className="text-3xl font-bold">Search the Grading systems available</h1>
                    <p className="w-3/4 text-lg">Explore grading systems from countries worldwide, discover their structures, scales, and how they compare to one another.</p>
                    <div className="mt-6">
                        <SystemsSearch />
                    </div>
                </div>
            </div>
            <Image src="/Drawing.png" alt="Background Drawing" className="absolute md:block hidden right-0 bottom-0 w-auto min-w-max" style={{height: '700px'}} width={500} height={500} />
        </div>
    );
}