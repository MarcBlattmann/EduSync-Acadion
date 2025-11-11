declare module 'edusync-acadion' {
  export interface Mapping {
    grade: number | string;
    percent?: number;
    min_percent?: number;
    max_percent?: number;
    description?: string;
  }
  export interface GradeSystem {
    id: number;
    name: string;
    last_modified?: string;
    used_in?: string[];
    passing_percent?: number;
    satisfactory_percent?: number;
    info?: string;
    mappings: Mapping[];
    [key: string]: any;
  }
  export const systems: GradeSystem[];
  export function getAllSystems(): GradeSystem[];
  export function getSystemById(id: number): GradeSystem | undefined;
  export function getSystemByName(name: string): GradeSystem | undefined;
  export function convertToPercent(system: GradeSystem, grade: number | string): number;
  export function percentToGrade(system: GradeSystem, percent: number): number | string;
  export function convertGradeToGrade(fromSystem: GradeSystem, toSystem: GradeSystem, grade: number | string): { grade: number | string };
  export function getColor(system: GradeSystem, grade: number | string): 'red' | 'orange' | 'green';
  export function getGradeDescription(system: GradeSystem, grade: number | string): string | null;
  export function getSystemInfo(system: GradeSystem): string | null;
}