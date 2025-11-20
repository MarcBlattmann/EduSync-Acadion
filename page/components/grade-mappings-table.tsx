'use client';

import { GradeSystem, getColor, getSystemById } from 'edusync-acadion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeMappingsTableProps {
  system: GradeSystem;
}

export default function GradeMappingsTable({ system }: GradeMappingsTableProps) {
  if (!system.mappings || system.mappings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No grade mappings available for this system.
      </div>
    );
  }

  return (
    <div className="w-full md:w-fit rounded-md overflow-hidden dark:border-0 border [&_table]:rounded-md [&_tr:last-child_td:first-child]:rounded-bl-md [&_tr:last-child_td:last-child]:rounded-br-md [&_tr:first-child_th:first-child]:rounded-tl-md [&_tr:first-child_th:last-child]:rounded-tr-md">
      <Table className='dark:bg-[#171717] bg-[#fafafa]'>
        <TableHeader>
          <TableRow>
            <TableHead>Grade</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {system.mappings.map((mapping, index) => {
            const colorMap: { [key: string]: string } = {
              red: '#ef4444',
              orange: '#f97316',
              green: '#22c55e',
            };
            const color = getColor(system, mapping.grade);
            return (
            <TableRow key={index}>
              <TableCell className="font-medium hover:rounded-lg" style={{ color: colorMap[color] }}>{mapping.grade}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold min-w-fit">
                    {mapping.percent || 0}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {mapping.description || '-'}
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
