# Interface: ExpenseReportFilter

## Properties

### approvalState?

> `optional` **approvalState?**: `"ALL"` \| `"APPROVED"` \| `"UNAPPROVED"`

***

### billable?

> `optional` **billable?**: `boolean`

***

### categories?

> `optional` **categories?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### clients?

> `optional` **clients?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### currency?

> `optional` **currency?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### dateRangeEnd

> **dateRangeEnd**: `string`

***

### dateRangeStart

> **dateRangeStart**: `string`

***

### dateRangeType?

> `optional` **dateRangeType?**: `"ABSOLUTE"` \| `"TODAY"` \| `"YESTERDAY"` \| `"THIS_WEEK"` \| `"LAST_WEEK"` \| `"PAST_TWO_WEEKS"` \| `"THIS_MONTH"` \| `"LAST_MONTH"` \| `"THIS_YEAR"` \| `"LAST_YEAR"`

***

### exportType?

> `optional` **exportType?**: `"JSON"` \| `"JSON_V1"` \| `"PDF"` \| `"CSV"` \| `"XLSX"` \| `"ZIP"`

***

### invoicingState?

> `optional` **invoicingState?**: `"ALL"` \| `"INVOICED"` \| `"UNINVOICED"`

***

### note?

> `optional` **note?**: `string`

***

### page?

> `optional` **page?**: `number`

***

### pageSize?

> `optional` **pageSize?**: `number`

***

### projects?

> `optional` **projects?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### sortColumn?

> `optional` **sortColumn?**: `"ID"` \| `"USER"` \| `"DATE"` \| `"AMOUNT"` \| `"PROJECT"` \| `"CATEGORY"`

***

### sortOrder?

> `optional` **sortOrder?**: `"ASCENDING"` \| `"DESCENDING"`

***

### tasks?

> `optional` **tasks?**: [`ContainsTaskFilter`](../../common/interfaces/ContainsTaskFilter.md)

***

### timeZone?

> `optional` **timeZone?**: `string`

***

### userGroups?

> `optional` **userGroups?**: [`ContainsUsersFilter`](../../common/interfaces/ContainsUsersFilter.md)

***

### userLocale?

> `optional` **userLocale?**: `string`

***

### users?

> `optional` **users?**: [`ContainsUsersFilter`](../../common/interfaces/ContainsUsersFilter.md)

***

### weekStart?

> `optional` **weekStart?**: `"MONDAY"` \| `"TUESDAY"` \| `"WEDNESDAY"` \| `"THURSDAY"` \| `"FRIDAY"` \| `"SATURDAY"` \| `"SUNDAY"`

***

### withoutNote?

> `optional` **withoutNote?**: `boolean`

***

### zoomLevel?

> `optional` **zoomLevel?**: `"MONTH"` \| `"YEAR"` \| `"WEEK"`
