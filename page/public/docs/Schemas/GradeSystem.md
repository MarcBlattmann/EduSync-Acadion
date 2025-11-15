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
| `passing_percent` | `number` | - | Minimum percentage to pass |
| `satisfactory_percent` | `number` | - | Minimum percentage for satisfactory grade |
| `info` | `string` | - | Additional information about the system |
| `mappings` | [`Mapping[]`](/docs/Schemas/GradeSystem) | ✓ | Grade to percentage mappings |

## Example

```typescript
{
  id: 1,
  name: "US Letter Grade",
  used_in: ["US"],
  passing_percent: 60,
  satisfactory_percent: 70,
  info: "Standard US grading system (A-F)",
  mappings: [
    { grade: "A", percent: 90 },
    { grade: "B", percent: 80 },
    // ...more mappings
  ]
}
```
