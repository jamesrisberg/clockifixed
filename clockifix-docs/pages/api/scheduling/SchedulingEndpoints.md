# Class: SchedulingEndpoints

## Constructors

### Constructor

> **new SchedulingEndpoints**(`http`, `workspaceId`): `SchedulingEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`SchedulingEndpoints`

## Methods

### copyAssignment()

> **copyAssignment**(`assignmentId`, `body`): `Promise`\<`Assignment`[]\>

Copy an existing assignment to a new date range or user.

#### Parameters

##### assignmentId

`string`

The assignment ID to copy

##### body

`CopyAssignmentRequest`

The copy target configuration

#### Returns

`Promise`\<`Assignment`[]\>

The newly created assignment instances

***

### createRecurring()

> **createRecurring**(`body`): `Promise`\<`Assignment`[]\>

Create a recurring assignment (repeating schedule for a user on a project).

#### Parameters

##### body

`RecurringAssignmentRequest`

The assignment configuration (user, project, hours, recurrence)

#### Returns

`Promise`\<`Assignment`[]\>

The created assignment instances

***

### deleteRecurring()

> **deleteRecurring**(`assignmentId`): `Promise`\<`Assignment`[]\>

Delete a recurring assignment and all its instances.

#### Parameters

##### assignmentId

`string`

The assignment ID

#### Returns

`Promise`\<`Assignment`[]\>

The deleted assignment instances

***

### getAllAssignments()

> **getAllAssignments**(): `Promise`\<`AssignmentHydrated`[]\>

Get all assignments in the workspace. Requires `start` and `end`
query parameters on the Clockify API side.

#### Returns

`Promise`\<`AssignmentHydrated`[]\>

Array of hydrated assignments with user/project details

***

### getProjectTotals()

> **getProjectTotals**(`body`): `Promise`\<`SchedulingProjectsTotals`[]\>

Get scheduling totals aggregated by project.

#### Parameters

##### body

`ProjectTotalsRequest`

The filter criteria (date range, projects)

#### Returns

`Promise`\<`SchedulingProjectsTotals`[]\>

Array of project scheduling totals

***

### getProjectTotalsForProject()

> **getProjectTotalsForProject**(`projectId`): `Promise`\<`SchedulingProjectsTotals`\>

Get scheduling totals for a single project.

#### Parameters

##### projectId

`string`

The project ID

#### Returns

`Promise`\<`SchedulingProjectsTotals`\>

The project's scheduling totals

***

### getUserTotals()

> **getUserTotals**(`body`): `Promise`\<`SchedulingUsersTotals`[]\>

Get scheduling totals aggregated by user.

#### Parameters

##### body

`GetUserTotalsRequest`

The filter criteria (date range, users)

#### Returns

`Promise`\<`SchedulingUsersTotals`[]\>

Array of user scheduling totals

***

### getUserTotalsForUser()

> **getUserTotalsForUser**(`userId`): `Promise`\<`SchedulingUsersTotals`\>

Get scheduling totals for a single user.

#### Parameters

##### userId

`string`

The user ID

#### Returns

`Promise`\<`SchedulingUsersTotals`\>

The user's scheduling totals

***

### publishAssignments()

> **publishAssignments**(`body`): `Promise`\<`void`\>

Publish draft assignments, making them visible to assigned users.

#### Parameters

##### body

`PublishAssignmentsRequest`

The publish criteria (assignment IDs or date range)

#### Returns

`Promise`\<`void`\>

***

### updateRecurring()

> **updateRecurring**(`assignmentId`, `body`): `Promise`\<`Assignment`[]\>

Update a recurring assignment's configuration.

#### Parameters

##### assignmentId

`string`

The assignment ID

##### body

`RecurringAssignmentRequest`

The updated assignment configuration

#### Returns

`Promise`\<`Assignment`[]\>

The updated assignment instances

***

### updateRecurringPeriod()

> **updateRecurringPeriod**(`assignmentId`, `body`): `Promise`\<`Assignment`[]\>

Update the period or series configuration for a recurring assignment.

#### Parameters

##### assignmentId

`string`

The assignment ID

##### body

`Record`\<`string`, `unknown`\>

The period/series update

#### Returns

`Promise`\<`Assignment`[]\>

The updated assignment instances
