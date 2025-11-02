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
    education_level?: string;
    passing_percent?: number;
    satisfactory_percent?: number;
    max_grade?: number;
    mappings: Mapping[];
    [key: string]: any;
  }
  export const systems: GradeSystem[];
  export function getAllSystems(): GradeSystem[];
  export function getSystemById(id: number): GradeSystem | undefined;
  export function convertToPercent(systemId: number, grade: number | string): number;
  export function percentToGrade(systemId: number, percent: number): number | string;
  export function convertGradeToGrade(fromSystemId: number, toSystemId: number, grade: number | string): { grade: number | string };
  export function getColor(systemId: number, grade: number | string): 'red' | 'orange' | 'green';
  export function getGradeDescription(systemId: number, grade: number | string): string | null;
}
