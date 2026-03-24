# Class: ApprovalEndpoints

## Constructors

### Constructor

> **new ApprovalEndpoints**(`http`, `workspaceId`): `ApprovalEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`ApprovalEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`ApprovalRequest`\>

Create an approval request for the authenticated user.

#### Parameters

##### body

`CreateApprovalRequest`

The approval period start and optional period type (WEEKLY, SEMI_MONTHLY, MONTHLY)

#### Returns

`Promise`\<`ApprovalRequest`\>

The created approval request

***

### createForUser()

> **createForUser**(`userId`, `body`): `Promise`\<`ApprovalRequest`\>

Create an approval request on behalf of a specific user.

#### Parameters

##### userId

`string`

The user ID

##### body

`CreateApprovalRequest`

The approval period start and optional period type

#### Returns

`Promise`\<`ApprovalRequest`\>

The created approval request

***

### getAll()

> **getAll**(`params?`): `Promise`\<`ApprovalDetails`[]\>

Get all approval requests in the workspace.

#### Parameters

##### params?

`Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

Optional query parameters for filtering

#### Returns

`Promise`\<`ApprovalDetails`[]\>

Array of approval request details including tracked/billable time

***

### resubmit()

> **resubmit**(`body`): `Promise`\<`void`\>

Resubmit time entries for approval after a previous rejection or withdrawal.

#### Parameters

##### body

`Record`\<`string`, `unknown`\>

The resubmission criteria

#### Returns

`Promise`\<`void`\>

***

### resubmitForUser()

> **resubmitForUser**(`userId`, `body`): `Promise`\<`void`\>

Resubmit time entries for approval on behalf of a specific user.

#### Parameters

##### userId

`string`

The user ID

##### body

`Record`\<`string`, `unknown`\>

The resubmission criteria

#### Returns

`Promise`\<`void`\>

***

### updateStatus()

> **updateStatus**(`approvalRequestId`, `body`): `Promise`\<`ApprovalRequest`\>

Update the status of an approval request (approve, reject, or withdraw).

#### Parameters

##### approvalRequestId

`string`

The approval request ID

##### body

`UpdateApprovalRequest`

The new state and optional note

#### Returns

`Promise`\<`ApprovalRequest`\>

The updated approval request
