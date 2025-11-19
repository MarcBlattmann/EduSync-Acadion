---
icon: Expand
---

# PercentToGrade()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem) (To System), number (percent) | number (grade) |

Converts a percentage value to a grade in a specific grading system. This is useful when you have a percentage score and need it as a grade in your application.

## Example
```typescript
import { percentToGrade, getSystemById } from 'edusync-acadion';

const system = getSystemById(1);
const percent = 75;

const grade = percentToGrade(system, percent);
```