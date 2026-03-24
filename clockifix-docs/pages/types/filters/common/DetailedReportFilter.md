# Interface: DetailedReportFilter

## Properties

### amounts?

> `optional` **amounts?**: (`"EARNED"` \| `"COST"` \| `"PROFIT"` \| `"HIDE_AMOUNT"` \| `"EXPORT"`)[]

***

### amountShown?

> `optional` **amountShown?**: `"EARNED"` \| `"COST"` \| `"PROFIT"` \| `"HIDE_AMOUNT"` \| `"EXPORT"`

***

### approvalState?

> `optional` **approvalState?**: `"ALL"` \| `"APPROVED"` \| `"UNAPPROVED"`

***

### archived?

> `optional` **archived?**: `boolean`

***

### attendanceFilter?

> `optional` **attendanceFilter?**: [`AttendanceFilter`](../../attendance/interfaces/AttendanceFilter.md)

***

### billable?

> `optional` **billable?**: `boolean`

***

### clients?

> `optional` **clients?**: [`ContainsArchivedFilter`](ContainsArchivedFilter.md)

***

### currency?

> `optional` **currency?**: [`ContainsArchivedFilter`](ContainsArchivedFilter.md)

***

### customFields?

> `optional` **customFields?**: [`CustomFieldFilter`](../../custom-field/interfaces/CustomFieldFilter.md)[]

***

### dateFormat?

> `optional` **dateFormat?**: `string`

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

### description?

> `optional` **description?**: `string`

***

### detailedFilter

> **detailedFilter**: [`DetailedFilter`](DetailedFilter.md)

***

### exportType?

> `optional` **exportType?**: `"JSON"` \| `"JSON_V1"` \| `"PDF"` \| `"CSV"` \| `"XLSX"` \| `"ZIP"`

***

### invoicingState?

> `optional` **invoicingState?**: `"ALL"` \| `"INVOICED"` \| `"UNINVOICED"`

***

### projects?

> `optional` **projects?**: [`ContainsArchivedFilter`](ContainsArchivedFilter.md)

***

### rounding?

> `optional` **rounding?**: `boolean`

***

### sortOrder?

> `optional` **sortOrder?**: `"ASCENDING"` \| `"DESCENDING"`

***

### summaryFilter?

> `optional` **summaryFilter?**: [`SummaryFilter`](SummaryFilter.md)

***

### tags?

> `optional` **tags?**: [`ContainsTagFilter`](ContainsTagFilter.md)

***

### tasks?

> `optional` **tasks?**: [`ContainsTaskFilter`](ContainsTaskFilter.md)

***

### timeFormat?

> `optional` **timeFormat?**: `string`

***

### timeZone?

> `optional` **timeZone?**: `string`

***

### userCustomFields?

> `optional` **userCustomFields?**: [`CustomFieldFilter`](../../custom-field/interfaces/CustomFieldFilter.md)[]

***

### userGroups?

> `optional` **userGroups?**: [`ContainsUsersFilter`](ContainsUsersFilter.md)

***

### userLocale?

> `optional` **userLocale?**: `string`

***

### users?

> `optional` **users?**: [`ContainsUsersFilter`](ContainsUsersFilter.md)

***

### weeklyFilter?

> `optional` **weeklyFilter?**: [`WeeklyFilter`](WeeklyFilter.md)

***

### weekStart?

> `optional` **weekStart?**: `"MONDAY"` \| `"TUESDAY"` \| `"WEDNESDAY"` \| `"THURSDAY"` \| `"FRIDAY"` \| `"SATURDAY"` \| `"SUNDAY"`

***

### withoutDescription?

> `optional` **withoutDescription?**: `boolean`

***

### zoomLevel?

> `optional` **zoomLevel?**: `"MONTH"` \| `"YEAR"` \| `"WEEK"`
