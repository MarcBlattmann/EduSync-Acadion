---
icon: Palette
---

# GetColor()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
| [`GradeSystem`](/docs/Schemas/GradeSystem), number (grade) | string (color) |

Provides a color that you can use in your UI to highlight a grade. The color is determined based on the **passing grade** and **satisfactory grade** values.

## Returns
It returns a string representing the color:

`"red"` - When the grade is **below** the passing grade.

`"orange"` - When the grade is **above** the passing grade but **below** the satisfactory grade.

`"green"` - When the grade is **equal to or above** the satisfactory grade.

## Example
```typescript
import { getColor, getSystemById } from 'edusync-acadion';

const system = getSystemById(1);
const grade = 4.5;

const color = getColor(system, grade);
```