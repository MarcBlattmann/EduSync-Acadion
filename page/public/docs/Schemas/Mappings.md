---
icon: TableColumnsSplit
---

# Mappings

Defines how a grade maps to percentage ranges and descriptions.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `grade` | `number \| string` | ✓ | The grade value (e.g., "A", 1, 5.0) |
| `percent` | `number` | - | Percentage equivalent |
| `description` | `string` | - | Grade description or meaning |

## Example

```typescript
// Numeric grade mapping (Swiss system)
{
  grade: 5.5,
  percent: 90,
  description: "Good to Very good"
}

// String grade mapping (German +/- system)
{
  grade: "2+",
  percent: 90,
  description: "Good to Very good"
}
```
