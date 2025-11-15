---
icon: BookCopy
order: 1
---

# GetSystems()

Retrieves all grading systems, allowing you to display them to users for selection or other purposes.

## Usage
```typescript
import { getAllSystems } from 'edusync-acadion';

const systems = getAllSystems();
```

## Parameters
This function does not accept any parameters or options.

## Return Type
Returns an array of `GradeSystem` objects with the following structure:

```typescript
interface GradeSystem {
  id: number;                    // Unique identifier for the system
  name: string;                  // Name of the grading system
  last_modified?: string;        // Last modification date
  used_in?: string[];            // List of countries/regions using this system
  passing_percent?: number;      // Minimum percentage to pass
  satisfactory_percent?: number; // Minimum percentage for satisfactory grade
  info?: string;                 // Additional information about the system
  mappings: Mapping[];           // Grade to percentage mappings
}

interface Mapping {
  grade: number | string;        // The grade value
  percent?: number;              // Percentage equivalent
  min_percent?: number;          // Minimum percentage for this grade
  max_percent?: number;          // Maximum percentage for this grade
  description?: string;          // Grade description
}
```