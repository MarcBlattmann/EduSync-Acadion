---
icon: Baseline
---

# GetGradeDescription()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem), number (grade) | string (description) |

Retrieves the grade descriptions displayed in the [Systems explorer](/systems) on the left , showing all possible grades and their descriptions. If your grade is not listed, the closest available grade description will be returned.

## Example
```typescript
import { getGradeDescription, getSystemById } from 'edusync-acadion';

const system = getSystemById(1);
const grade = 4.5;

const description = getGradeDescription(system, grade)
```