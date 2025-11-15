---
icon: BookCopy
order: 1
---

# GetSystems()

| Parameters |                   Returns               |
|------------|-----------------------------------------|
|     -      | [`GradeSystem[]`](/Schemas/GradeSystem) |

Retrieves all grading systems, allowing you to display them to users for selection or other purposes.

## Usage
```typescript
import { getAllSystems } from 'edusync-acadion';

const systems = getAllSystems();
```