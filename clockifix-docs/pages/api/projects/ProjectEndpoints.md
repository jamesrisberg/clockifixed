# Class: ProjectEndpoints

## Constructors

### Constructor

> **new ProjectEndpoints**(`http`, `workspaceId`): `ProjectEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`ProjectEndpoints`

## Methods

### addUsers()

> **addUsers**(`projectId`, `body`): `Promise`\<`void`\>

Add users to a project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`AddUsersToProjectRequest`

The user IDs to add

#### Returns

`Promise`\<`void`\>

***

### create()

> **create**(`body`): `Promise`\<`Project`\>

Create a new project.

#### Parameters

##### body

`ProjectRequest`

The project configuration

#### Returns

`Promise`\<`Project`\>

The created project

#### Example

```ts
const project = await clockify.projects.create({
  name: "Website Redesign",
  clientId: "64a1234567890abcdef12345",
  color: "#2196F3",
  billable: true,
  isPublic: true,
});
```

***

### createFromTemplate()

> **createFromTemplate**(`body`): `Promise`\<`Project`\>

Create a project from an existing project template.

#### Parameters

##### body

`CreateProjectFromTemplate`

The template reference and any overrides

#### Returns

`Promise`\<`Project`\>

The created project

***

### delete()

> **delete**(`projectId`): `Promise`\<`Project`\>

Delete a project. The project must be archived first.

#### Parameters

##### projectId

`string`

The project ID

#### Returns

`Promise`\<`Project`\>

The deleted project

***

### get()

> **get**(`projectId`): `Promise`\<`Project`\>

Get a project by ID.

#### Parameters

##### projectId

`string`

The project ID

#### Returns

`Promise`\<`Project`\>

The project

***

### getAll()

> **getAll**(`params?`): `Promise`\<`Project`[]\>

Get all projects in the workspace. Supports pagination and filtering
by name, archived status, billable flag, clients, users, and template status.

#### Parameters

##### params?

[`GetAllProjectsParams`](../interfaces/GetAllProjectsParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`Project`[]\>

Array of projects

#### Example

```ts
const active = await clockify.projects.getAll({
  archived: false,
  page: 1,
  pageSize: 50,
});
```

***

### setUserCostRate()

> **setUserCostRate**(`projectId`, `userId`, `body`): `Promise`\<`Project`\>

Set the cost rate for a specific user on a project.

#### Parameters

##### projectId

`string`

The project ID

##### userId

`string`

The user ID

##### body

`CostRateRequestV1`

The cost rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Project`\>

The updated project

***

### setUserHourlyRate()

> **setUserHourlyRate**(`projectId`, `userId`, `body`): `Promise`\<`Project`\>

Set the hourly rate for a specific user on a project.

#### Parameters

##### projectId

`string`

The project ID

##### userId

`string`

The user ID

##### body

`HourlyRateRequestV1`

The hourly rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Project`\>

The updated project

***

### update()

> **update**(`projectId`, `body`): `Promise`\<`Project`\>

Update an existing project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`UpdateProjectRequest`

The fields to update

#### Returns

`Promise`\<`Project`\>

The updated project

***

### updateEstimate()

> **updateEstimate**(`projectId`, `body`): `Promise`\<`Project`\>

Update the time or budget estimate for a project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`ProjectEstimateRequest`

The estimate configuration

#### Returns

`Promise`\<`Project`\>

The updated project

***

### updateMemberships()

> **updateMemberships**(`projectId`, `body`): `Promise`\<`Project`\>

Update the membership list for a project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`UpdateProjectMembershipsRequest`

The membership configuration

#### Returns

`Promise`\<`Project`\>

The updated project

***

### updateTemplate()

> **updateTemplate**(`projectId`, `body`): `Promise`\<`Project`\>

Set or unset the template flag on a project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`PatchProjectTemplateRequest`

The template flag value

#### Returns

`Promise`\<`Project`\>

The updated project
