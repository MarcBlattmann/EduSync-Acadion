---
icon: Shrink
---

# ConvertToPercent()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem) (From System), number (grade) | number (percent) |

Converts a grade from a specific grading system to a percentage value. This is useful for normalizing grades across different systems.

## Example
```typescript
import { convertToPercent, getSystemById } from 'edusync-acadion';

const system = getSystemById(1);
const grade = 4.5;

const percent = convertToPercent(system, grade);
```