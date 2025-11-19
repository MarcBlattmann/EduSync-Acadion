---
icon: BookKey
---

# GetSystemById()

| Parameters | Returns |
|------------|---------|
| number (ID) | [`GradeSystem`](/docs/Schemas/GradeSystem) |

Retrieves a specific grading system by its ID. You can find the ID in our [Systems explorer](/systems) simply search for your grading system and copy its ID.

## Usage
```typescript
import { getSystemById } from 'edusync-acadion';
const system = getSystemById(1);
```