import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllSystems } from 'edusync-acadion';


export default function ConvertPage() {
    const Systems = getAllSystems();

    return (
        <div className="pt-10">
            <Select>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Systems.flatMap((system) =>
                            system.used_in?.map((country) => (
                                <SelectItem key={`${system.id}-${country}`} value={system.id.toString()}>
                                    <img
                                        alt={system.name}
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                                        height="20px"
                                        width="20px"
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
    );
}