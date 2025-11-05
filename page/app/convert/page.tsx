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
                        {Systems.map((system) => (
                            <SelectItem key={system.id} value={system.id.toString()}>
                                {system.name} ({system.used_in?.join(', ')})
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
        </div>
    );
}