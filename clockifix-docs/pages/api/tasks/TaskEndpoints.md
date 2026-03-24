# Class: TaskEndpoints

## Constructors

### Constructor

> **new TaskEndpoints**(`http`, `workspaceId`): `TaskEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`TaskEndpoints`

## Methods

### create()

> **create**(`projectId`, `body`): `Promise`\<`Task`\>

Create a new task in a project.

#### Parameters

##### projectId

`string`

The project ID

##### body

`TaskRequestV1`

The task configuration

#### Returns

`Promise`\<`Task`\>

The created task

#### Example

```ts
const task = await clockify.tasks.create(projectId, {
  name: "Design review",
  assigneeIds: [userId],
  estimate: "PT4H",
});
```

***

### delete()

> **delete**(`projectId`, `taskId`): `Promise`\<`Task`\>

Delete a task from a project. The task must be marked as DONE first.

#### Parameters

##### projectId

`string`

The project ID

##### taskId

`string`

The task ID

#### Returns

`Promise`\<`Task`\>

The deleted task

***

### get()

> **get**(`projectId`, `taskId`): `Promise`\<`Task`\>

Get a task by ID within a project.

#### Parameters

##### projectId

`string`

The project ID

##### taskId

`string`

The task ID

#### Returns

`Promise`\<`Task`\>

The task

***

### getAll()

> **getAll**(`projectId`, `params?`): `Promise`\<`Task`[]\>

Get all tasks for a project. Supports pagination and filtering
by name and active status.

#### Parameters

##### projectId

`string`

The project ID

##### params?

[`GetAllTasksParams`](../interfaces/GetAllTasksParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`Task`[]\>

Array of tasks

#### Example

```ts
const tasks = await clockify.tasks.getAll(projectId, {
  "is-active": true,
  pageSize: 100,
});
```

***

### setCostRate()

> **setCostRate**(`projectId`, `taskId`, `body`): `Promise`\<`Task`\>

Set the cost rate for a task.

#### Parameters

##### projectId

`string`

The project ID

##### taskId

`string`

The task ID

##### body

`CostRateRequestV1`

The cost rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Task`\>

The updated task

***

### setHourlyRate()

> **setHourlyRate**(`projectId`, `taskId`, `body`): `Promise`\<`Task`\>

Set the hourly rate for a task.

#### Parameters

##### projectId

`string`

The project ID

##### taskId

`string`

The task ID

##### body

`HourlyRateRequestV1`

The hourly rate amount (in cents) and optional effective date

#### Returns

`Promise`\<`Task`\>

The updated task

***

### update()

> **update**(`projectId`, `taskId`, `body`): `Promise`\<`Task`\>

Update an existing task.

#### Parameters

##### projectId

`string`

The project ID

##### taskId

`string`

The task ID

##### body

`UpdateTaskRequest`

The fields to update

#### Returns

`Promise`\<`Task`\>

The updated task
