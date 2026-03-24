# Class: TimeEntryEndpoints

## Constructors

### Constructor

> **new TimeEntryEndpoints**(`http`, `workspaceId`): `TimeEntryEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`TimeEntryEndpoints`

## Methods

### bulkEdit()

> **bulkEdit**(`userId`, `body`): `Promise`\<`TimeEntry`[]\>

Bulk edit time entries for a user. Accepts a single update request
or an array — single values are automatically wrapped in an array.

#### Parameters

##### userId

`string`

The user ID who owns the entries

##### body

`UpdateTimeEntryBulkRequest` \| `UpdateTimeEntryBulkRequest`[]

One or more bulk update requests

#### Returns

`Promise`\<`TimeEntry`[]\>

The updated time entries

#### Example

```ts
const updated = await clockify.timeEntries.bulkEdit(userId, {
  timeEntryIds: ["id1", "id2"],
  changeFields: [{ field: "BILLABLE", value: "true" }],
});
```

***

### create()

> **create**(`body`): `Promise`\<`TimeEntry`\>

Create a new time entry in the workspace.

#### Parameters

##### body

`CreateTimeEntryRequest`

The time entry to create

#### Returns

`Promise`\<`TimeEntry`\>

The created time entry

#### Example

```ts
const entry = await clockify.timeEntries.create({
  start: "2026-03-23T09:00:00Z",
  projectId: "64a1234567890abcdef12345",
  description: "Working on documentation",
  billable: true,
});
```

***

### createForUser()

> **createForUser**(`userId`, `body`): `Promise`\<`TimeEntry`\>

Create a time entry on behalf of a specific user. Requires workspace admin permissions.

#### Parameters

##### userId

`string`

The user ID to create the entry for

##### body

`CreateTimeEntryRequest`

The time entry to create

#### Returns

`Promise`\<`TimeEntry`\>

The created time entry

***

### delete()

> **delete**(`id`): `Promise`\<`void`\>

Delete a time entry.

#### Parameters

##### id

`string`

The time entry ID

#### Returns

`Promise`\<`void`\>

***

### deleteForUser()

> **deleteForUser**(`userId`, `timeEntryIds`): `Promise`\<`TimeEntry`[]\>

Delete specific time entries for a user by their IDs.

#### Parameters

##### userId

`string`

The user ID who owns the entries

##### timeEntryIds

`string`[]

Array of time entry IDs to delete

#### Returns

`Promise`\<`TimeEntry`[]\>

The deleted time entries

***

### duplicate()

> **duplicate**(`userId`, `id`): `Promise`\<`TimeEntry`\>

Duplicate an existing time entry, creating an identical copy.

#### Parameters

##### userId

`string`

The user ID who owns the entry

##### id

`string`

The time entry ID to duplicate

#### Returns

`Promise`\<`TimeEntry`\>

The newly created duplicate time entry

***

### get()

> **get**(`id`): `Promise`\<`TimeEntry`\>

Get a time entry by ID. Includes `costRate` and `hourlyRate` fields
that are not present on other response shapes.

#### Parameters

##### id

`string`

The time entry ID

#### Returns

`Promise`\<`TimeEntry`\>

The time entry with rate details

***

### getForUser()

> **getForUser**(`userId`, `params?`): `Promise`\<`TimeEntry`[]\>

Get time entries for a specific user. Supports pagination and filtering
by date range, project, task, tags, and description.

#### Parameters

##### userId

`string`

The user ID to fetch entries for

##### params?

[`GetTimeEntriesParams`](../interfaces/GetTimeEntriesParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`TimeEntry`[]\>

Array of time entries for the user

#### Example

```ts
const entries = await clockify.timeEntries.getForUser(userId, {
  start: "2026-03-01T00:00:00Z",
  end: "2026-03-31T23:59:59Z",
  page: 1,
  pageSize: 50,
});
```

***

### getInProgress()

> **getInProgress**(): `Promise`\<`TimeEntry`\>

Get the currently running time entry for the authenticated user.

#### Returns

`Promise`\<`TimeEntry`\>

The in-progress time entry, or throws if none is running

#### Example

```ts
const running = await clockify.timeEntries.getInProgress();
console.log(running.description, running.timeInterval.start);
```

***

### stopTimer()

> **stopTimer**(`userId`, `body`): `Promise`\<`TimeEntry`\>

Stop a running timer for a user by setting an end time.

#### Parameters

##### userId

`string`

The user ID whose timer to stop

##### body

`StopTimeEntryRequest`

The stop request with the end timestamp

#### Returns

`Promise`\<`TimeEntry`\>

The stopped time entry with the final time interval

#### Example

```ts
const stopped = await clockify.timeEntries.stopTimer(userId, {
  end: "2026-03-23T17:00:00Z",
});
```

***

### update()

> **update**(`id`, `body`): `Promise`\<`TimeEntry`\>

Update an existing time entry.

#### Parameters

##### id

`string`

The time entry ID

##### body

`UpdateTimeEntryRequest`

The fields to update

#### Returns

`Promise`\<`TimeEntry`\>

The updated time entry

***

### updateInvoicedStatus()

> **updateInvoicedStatus**(`body`): `Promise`\<`void`\>

Mark time entries as invoiced or not invoiced.

#### Parameters

##### body

`UpdateInvoicedStatusRequest`

The time entry IDs and invoiced status to set

#### Returns

`Promise`\<`void`\>
