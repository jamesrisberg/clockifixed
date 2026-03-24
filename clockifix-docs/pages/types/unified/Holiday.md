# Interface: Holiday

Unified holiday — superset of HolidayDtoV1 (GET/create/update) and HolidayDto (delete).

`automaticTimeEntryCreation` is `boolean` on V1 responses and `object` on Dto (delete) responses.
Fields only on V1: `projectId`, `taskId`. Fields only on Dto: `color`.

## Properties

### automaticTimeEntryCreation?

> `optional` **automaticTimeEntryCreation?**: `boolean` \| `AutomaticTimeEntryCreation`

***

### color?

> `optional` **color?**: `string`

***

### datePeriod?

> `optional` **datePeriod?**: `DatePeriod`

***

### everyoneIncludingNew?

> `optional` **everyoneIncludingNew?**: `boolean`

***

### id?

> `optional` **id?**: `string`

***

### name?

> `optional` **name?**: `string`

***

### occursAnnually?

> `optional` **occursAnnually?**: `boolean`

***

### projectId?

> `optional` **projectId?**: `string`

***

### taskId?

> `optional` **taskId?**: `string`

***

### userGroupIds?

> `optional` **userGroupIds?**: `string`[]

***

### userIds?

> `optional` **userIds?**: `string`[]

***

### workspaceId?

> `optional` **workspaceId?**: `string`
