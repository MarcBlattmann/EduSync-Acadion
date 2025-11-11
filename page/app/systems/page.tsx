'use client';

import Navbar from "@/components/navbar";
import SystemsSearch from "@/components/systems-search";


export default function SystemsPage() {

    return (
        <>
            <Navbar />
            <div className="pt-10 px-5 flex">
                <div className="flex flex-col gap-3 mb-8">
                    <h1 className="text-3xl font-bold">Search the Grading systems available</h1>
                    <p className="w-3/4 text-lg">Explore grading systems from countries worldwide, discover their structures, scales, and how they compare to one another.</p>
                    <div className="mt-6">
                        <SystemsSearch />
                    </div>
                </div>
            </div>
        </>
    );
}