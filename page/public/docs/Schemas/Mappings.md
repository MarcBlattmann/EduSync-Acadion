---
icon: TableColumnsSplit
---

# Mapping

Defines how a grade maps to percentage ranges and descriptions.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `grade` | `number \| string` | ✓ | The grade value (e.g., "A", 1, 5.0) |
| `percent` | `number` | - | Percentage equivalent |
| `description` | `string` | - | Grade description or meaning |

## Example

```typescript
// Letter grade mapping
{
  grade: "A",
  percent: 90,
  description: "Excellent"
}

// Numeric grade mapping
{
  grade: 5.5,
  percent: 85,
  description: "Very Good"
}
```
