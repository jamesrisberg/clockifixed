# Interface: ImportTimeEntriesAndExpensesRequest

## Properties

### expenseFieldsForDetailedGroup?

> `optional` **expenseFieldsForDetailedGroup?**: (`"USER"` \| `"DATE"` \| `"PROJECT"` \| `"CATEGORY"` \| `"TASK"` \| `"NOTE"`)[]

***

### expensesGroupBy?

> `optional` **expensesGroupBy?**: `"USER"` \| `"PROJECT"` \| `"CATEGORY"`

***

### expensesGroupType?

> `optional` **expensesGroupType?**: `"DETAILED"` \| `"GROUPED"`

***

### from

> **from**: `string`

***

### importExpenses

> **importExpenses**: `boolean`

***

### projectFilter

> **projectFilter**: [`ContainsArchivedFilterRequest`](ContainsArchivedFilterRequest.md)

***

### roundTimeEntryDuration?

> `optional` **roundTimeEntryDuration?**: `boolean`

***

### timeEntryFieldsForDetailedGroup?

> `optional` **timeEntryFieldsForDetailedGroup?**: (`"DESCRIPTION"` \| `"USER"` \| `"DATE"` \| `"PROJECT"` \| `"TASK"` \| `"TAGS"`)[]

***

### timeEntryGroupType

> **timeEntryGroupType**: `"DETAILED"` \| `"GROUPED"` \| `"SINGLE_ITEM"`

***

### timeEntryPrimaryGroupBy?

> `optional` **timeEntryPrimaryGroupBy?**: `"USER"` \| `"DATE"` \| `"PROJECT"`

***

### timeEntrySecondaryGroupBy?

> `optional` **timeEntrySecondaryGroupBy?**: `"NONE"` \| `"DESCRIPTION"` \| `"USER"` \| `"DATE"` \| `"PROJECT"` \| `"TASK"`

***

### to

> **to**: `string`
