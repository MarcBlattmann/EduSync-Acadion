---
icon: TableProperties
---

# GradeSystem

Represents a grading system with its configuration and grade mappings.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✓ | Unique identifier for the system |
| `name` | `string` | ✓ | Name of the grading system |
| `last_modified` | `string` | - | Last modification date |
| `used_in` | `string[]` | - | List of countries/regions using this system |
| `info` | `string` | - | Additional information about the system |
| `mappings` | [`Mapping[]`](/docs/Schemas/Mappings) | ✓ | Grade to percentage mappings |

> **Note:** The passing threshold is **60%** and the satisfactory threshold is **80%** for all grading systems.

## Example

```typescript
{
  id: 1,
  name: "US Letter Grade",
  used_in: ["US"],
  info: "Standard US grading system (A-F)",
  mappings: [
    { grade: "A", percent: 90 },
    { grade: "B", percent: 80 },
    // ...more mappings
  ]
}
```
