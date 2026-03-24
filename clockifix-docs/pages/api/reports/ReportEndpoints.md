# Class: ReportEndpoints

## Constructors

### Constructor

> **new ReportEndpoints**(`http`, `workspaceId`): `ReportEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`ReportEndpoints`

## Methods

### attendance()

> **attendance**(`body`): `Promise`\<`unknown`\>

Generate an attendance report showing user work patterns.
Requires `dateRangeStart`, `dateRangeEnd`, and `attendanceFilter`.

#### Parameters

##### body

`AttendanceReportFilter`

The report filter criteria

#### Returns

`Promise`\<`unknown`\>

The attendance report data

***

### auditLog()

> **auditLog**(`body`): `Promise`\<`PageableV1ListAuditLog`\>

Get audit log entries for the workspace. Tracks user actions
like entity creation, updates, and deletions.

#### Parameters

##### body

`AuditLogGetRequest`

The audit log query (date range, filters, pagination)

#### Returns

`Promise`\<`PageableV1ListAuditLog`\>

Paginated audit log entries

***

### detailed()

> **detailed**(`body`): `Promise`\<`unknown`\>

Generate a detailed time entry report. Requires `dateRangeStart`,
`dateRangeEnd`, and `detailedFilter` in the body.

#### Parameters

##### body

`DetailedReportFilter`

The report filter criteria

#### Returns

`Promise`\<`unknown`\>

The detailed report data

***

### expenseDetailed()

> **expenseDetailed**(`body`): `Promise`\<`ExpenseDetailedReport`\>

Generate a detailed expense report.

#### Parameters

##### body

`ExpenseReportFilter`

The expense report filter criteria

#### Returns

`Promise`\<`ExpenseDetailedReport`\>

The detailed expense report

***

### summary()

> **summary**(`body`): `Promise`\<`unknown`\>

Generate a summary report grouped by project, user, or other dimensions.
Requires `dateRangeStart`, `dateRangeEnd`, and `summaryFilter`.

#### Parameters

##### body

`SummaryReportFilter`

The report filter criteria

#### Returns

`Promise`\<`unknown`\>

The summary report data

***

### weekly()

> **weekly**(`body`): `Promise`\<`unknown`\>

Generate a weekly report showing hours per day.
Requires `dateRangeStart`, `dateRangeEnd`, and `weeklyFilter`.

#### Parameters

##### body

`WeeklyReportFilter`

The report filter criteria

#### Returns

`Promise`\<`unknown`\>

The weekly report data
