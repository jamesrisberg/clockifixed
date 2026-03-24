# Interface: AttendanceReportFilter

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

### attendanceFilter

> **attendanceFilter**: [`AttendanceFilter`](AttendanceFilter.md)

***

### billable?

> `optional` **billable?**: `boolean`

***

### clients?

> `optional` **clients?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### currency?

> `optional` **currency?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

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

### detailedFilter?

> `optional` **detailedFilter?**: [`DetailedFilter`](../../common/interfaces/DetailedFilter.md)

***

### exportType?

> `optional` **exportType?**: `"JSON"` \| `"JSON_V1"` \| `"PDF"` \| `"CSV"` \| `"XLSX"` \| `"ZIP"`

***

### invoicingState?

> `optional` **invoicingState?**: `"ALL"` \| `"INVOICED"` \| `"UNINVOICED"`

***

### projects?

> `optional` **projects?**: [`ContainsArchivedFilter`](../../common/interfaces/ContainsArchivedFilter.md)

***

### rounding?

> `optional` **rounding?**: `boolean`

***

### sortOrder?

> `optional` **sortOrder?**: `"ASCENDING"` \| `"DESCENDING"`

***

### summaryFilter?

> `optional` **summaryFilter?**: [`SummaryFilter`](../../common/interfaces/SummaryFilter.md)

***

### tags?

> `optional` **tags?**: [`ContainsTagFilter`](../../common/interfaces/ContainsTagFilter.md)

***

### tasks?

> `optional` **tasks?**: [`ContainsTaskFilter`](../../common/interfaces/ContainsTaskFilter.md)

***

### timeFormat?

> `optional` **timeFormat?**: `string`

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

### weeklyFilter?

> `optional` **weeklyFilter?**: [`WeeklyFilter`](../../common/interfaces/WeeklyFilter.md)

***

### weekStart?

> `optional` **weekStart?**: `"MONDAY"` \| `"TUESDAY"` \| `"WEDNESDAY"` \| `"THURSDAY"` \| `"FRIDAY"` \| `"SATURDAY"` \| `"SUNDAY"`

***

### withoutDescription?

> `optional` **withoutDescription?**: `boolean`

***

### zoomLevel?

> `optional` **zoomLevel?**: `"MONTH"` \| `"YEAR"` \| `"WEEK"`
