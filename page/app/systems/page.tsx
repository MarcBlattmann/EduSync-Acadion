import Navbar from "@/components/navbar";
import Image from 'next/image';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllSystems } from 'edusync-acadion';


export default function ConvertPage() {
    const Systems = getAllSystems();

    return (
        <>
            <Navbar />
            <div className="pt-10 px-5 flex justify-between gap-3">
                <h1 className="text-3xl font-bold">Systems</h1>
                <Select>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select a System" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Systems.flatMap((system) =>
                                system.used_in?.map((country) => (
                                    <SelectItem key={`${system.id}-${country}`} value={system.id.toString()}>
                                        <Image
                                            alt={system.name}
                                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                                            height={20}
                                            width={20}
                                            className="rounded-[2px]"
                                        />
                                        {system.name}
                                    </SelectItem>
                                )) || []
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}