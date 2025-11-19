---
icon: Shuffle
---

# ConvertGradeToGrade()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem) (From System), [`GradeSystem`](/docs/Schemas/GradeSystem) (To System), number (grade) | number (grade) |

Converts a grade from one grading system to another.

## Example
```typescript
import { convertGradeToGrade, getSystemById } from 'edusync-acadion';

const fromSystem = getSystemById(1);
const toSystem = getSystemById(2);
const grade = 4.5;

const convertedGrade = convertGradeToGrade(fromSystem, toSystem, grade);
```