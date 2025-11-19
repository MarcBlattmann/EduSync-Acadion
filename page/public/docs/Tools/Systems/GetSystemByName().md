---
icon: BookA
---

# GetSystemByName()

| Parameters | Returns |
|------------|---------|
| string (name) | [`GradeSystem`](/docs/Schemas/GradeSystem) |

Retrieves a specific grading system by its unique name. This is useful when you know the exact name of the grading system you want to work with.

## Usage
```typescript
import { getSystemByName } from 'edusync-acadion';
const system = getSystemByName("Hexa (1-6)");
```