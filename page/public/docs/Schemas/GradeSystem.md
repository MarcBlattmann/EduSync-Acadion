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
  name: "Hexa (1-6)",
  last_modified: "2025-11-29",
  used_in: ["CH", "LI"],
  info: "### Passing Threshold\nA grade of **4.0** is the minimum required to pass.",
  mappings: [
    { grade: 6,   percent: 100, description: "Very good" },
    { grade: 5.5, percent: 90,  description: "Good to Very good" },
    { grade: 5,   percent: 80,  description: "Good" },
    { grade: 4.5, percent: 70,  description: "Satisfactory" },
    { grade: 4,   percent: 60,  description: "Sufficient" },
    // ...more mappings
  ]
}
```
