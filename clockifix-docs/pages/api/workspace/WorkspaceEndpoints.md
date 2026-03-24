# Class: WorkspaceEndpoints

## Constructors

### Constructor

> **new WorkspaceEndpoints**(`http`, `workspaceId`): `WorkspaceEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`WorkspaceEndpoints`

## Methods

### addUsers()

> **addUsers**(`body`): `Promise`\<`Workspace`\>

Invite a user to the workspace by email address.

#### Parameters

##### body

`AddUserToWorkspaceRequest`

The email address to invite

#### Returns

`Promise`\<`Workspace`\>

The updated workspace

#### Example

```ts
await clockify.workspaces.addUsers({ email: "new@example.com" });
```

***

### create()

> **create**(`body`): `Promise`\<`Workspace`\>

Create a new workspace. Does not require a workspace ID.

#### Parameters

##### body

`CreateWorkspaceRequest`

The workspace name and optional organization ID

#### Returns

`Promise`\<`Workspace`\>

The created workspace

***

### get()

> **get**(): `Promise`\<`Workspace`\>

Get the current workspace by its configured workspace ID.

#### Returns

`Promise`\<`Workspace`\>

The workspace

***

### getAll()

> **getAll**(): `Promise`\<`Workspace`[]\>

Get all workspaces the authenticated user belongs to.
Does not require a workspace ID.

#### Returns

`Promise`\<`Workspace`[]\>

Array of workspaces

***

### setCostRate()

> **setCostRate**(`body`): `Promise`\<`Workspace`\>

Set the default cost rate for the workspace. Applied to users
who don't have a user-specific cost rate.

#### Parameters

##### body

`CostRateRequest`

The cost rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Workspace`\>

The updated workspace

***

### setHourlyRate()

> **setHourlyRate**(`body`): `Promise`\<`Workspace`\>

Set the default hourly rate for the workspace. Applied to users
who don't have a user-specific hourly rate.

#### Parameters

##### body

`HourlyRateRequest`

The hourly rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Workspace`\>

The updated workspace

***

### setUserCostRate()

> **setUserCostRate**(`userId`, `body`): `Promise`\<`Workspace`\>

Set the cost rate for a specific user in the workspace.

#### Parameters

##### userId

`string`

The user ID

##### body

`CostRateRequest`

The cost rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Workspace`\>

The updated workspace

***

### setUserHourlyRate()

> **setUserHourlyRate**(`userId`, `body`): `Promise`\<`Workspace`\>

Set the hourly rate for a specific user in the workspace.

#### Parameters

##### userId

`string`

The user ID

##### body

`HourlyRateRequest`

The hourly rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Workspace`\>

The updated workspace

***

### updateUserStatus()

> **updateUserStatus**(`userId`, `body`): `Promise`\<`Workspace`\>

Activate or deactivate a user within the workspace.

#### Parameters

##### userId

`string`

The user ID

##### body

`UpdateUserStatusRequest`

The status to set (`"ACTIVE"` or `"INACTIVE"`)

#### Returns

`Promise`\<`Workspace`\>

The updated workspace
