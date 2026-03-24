# Interface: TimeEntry

Unified time entry — superset of TimeEntryDtoImplV1 (write), TimeEntryDtoV1 (bulk), and TimeEntryWithRates (GET).

Fields only present on GET responses: `costRate`, `hourlyRate`.

## Properties

### billable?

> `optional` **billable?**: `boolean`

***

### costRate?

> `optional` **costRate?**: `RateDtoV1` \| `null`

***

### customFieldValues?

> `optional` **customFieldValues?**: `CustomFieldValueDtoV1`[]

***

### description?

> `optional` **description?**: `string`

***

### hourlyRate?

> `optional` **hourlyRate?**: `RateDtoV1` \| `null`

***

### id?

> `optional` **id?**: `string`

***

### isLocked?

> `optional` **isLocked?**: `boolean`

***

### kioskId?

> `optional` **kioskId?**: `string` \| `null`

***

### projectId?

> `optional` **projectId?**: `string` \| `null`

***

### tagIds?

> `optional` **tagIds?**: `string`[] \| `null`

***

### taskId?

> `optional` **taskId?**: `string` \| `null`

***

### timeInterval?

> `optional` **timeInterval?**: `TimeIntervalDtoV1`

***

### type?

> `optional` **type?**: `"TIME_OFF"` \| `"BREAK"` \| `"REGULAR"` \| `"HOLIDAY"`

***

### userId?

> `optional` **userId?**: `string`

***

### workspaceId?

> `optional` **workspaceId?**: `string`
