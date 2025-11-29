---
icon: Palette
---

# GetColor()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem), number \| string (grade) | string (color) |

Provides a color that you can use in your UI to highlight a grade. The color is determined based on fixed percentage thresholds.

## Thresholds
- **Passing:** 60%
- **Satisfactory:** 80%

## Returns
It returns a string representing the color:

`"red"` - When the grade is **below 60%** (failing).

`"orange"` - When the grade is **between 60% and 80%** (passing but not satisfactory).

`"green"` - When the grade is **80% or above** (satisfactory).

## Example
```typescript
import { getColor, getSystemById } from 'edusync-acadion';

const system = getSystemById(1); // Swiss Hexa (1-6)

getColor(system, 5);   // returns "green" (80% - Good)
getColor(system, 4.5); // returns "orange" (70% - Satisfactory)
getColor(system, 3);   // returns "red" (40% - Insufficient)
```