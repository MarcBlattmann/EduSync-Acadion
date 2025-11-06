'use client';

import { GradeSystem } from 'edusync-acadion';
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
    <div className="rounded-md border w-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Grade</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {system.mappings.map((mapping, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{mapping.grade}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
