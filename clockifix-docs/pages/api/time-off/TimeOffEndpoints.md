# Class: TimeOffEndpoints

## Constructors

### Constructor

> **new TimeOffEndpoints**(`http`, `workspaceId`): `TimeOffEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`TimeOffEndpoints`

## Methods

### changeStatus()

> **changeStatus**(`policyId`, `requestId`, `body`): `Promise`\<`TimeOffRequest`\>

Approve, reject, or withdraw a time-off request.

#### Parameters

##### policyId

`string`

The time-off policy ID

##### requestId

`string`

The time-off request ID

##### body

`StatusTimeOffRequestV1Request`

The new status and optional note

#### Returns

`Promise`\<`TimeOffRequest`\>

The updated request

***

### create()

> **create**(`policyId`, `body`): `Promise`\<`TimeOffRequestFull`\>

Create a time-off request under a policy for the authenticated user.

#### Parameters

##### policyId

`string`

The time-off policy ID

##### body

`CreateTimeOffRequestV1Request`

The request details (date period, optional note)

#### Returns

`Promise`\<`TimeOffRequestFull`\>

The created time-off request

***

### createForUser()

> **createForUser**(`policyId`, `userId`, `body`): `Promise`\<`TimeOffRequestFull`\>

Create a time-off request on behalf of a specific user under a policy.

#### Parameters

##### policyId

`string`

The time-off policy ID

##### userId

`string`

The user ID

##### body

`CreateTimeOffRequestV1Request`

The request details (date period, optional note)

#### Returns

`Promise`\<`TimeOffRequestFull`\>

The created time-off request

***

### delete()

> **delete**(`policyId`, `requestId`): `Promise`\<`TimeOffRequest`\>

Delete a time-off request.

#### Parameters

##### policyId

`string`

The time-off policy ID

##### requestId

`string`

The time-off request ID

#### Returns

`Promise`\<`TimeOffRequest`\>

The deleted request

***

### getAll()

> **getAll**(`body`): `Promise`\<`TimeOffRequestsWithCount`\>

Get time-off requests using a POST body as a filter. Supports filtering
by date range, status, and pagination.

#### Parameters

##### body

`GetTimeOffRequestsV1Request`

The filter criteria (start, end, statuses, page, pageSize)

#### Returns

`Promise`\<`TimeOffRequestsWithCount`\>

Time-off requests with total count
