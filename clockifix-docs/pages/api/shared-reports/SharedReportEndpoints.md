# Class: SharedReportEndpoints

## Constructors

### Constructor

> **new SharedReportEndpoints**(`http`, `workspaceId`): `SharedReportEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`SharedReportEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`unknown`\>

Create a shared report.

#### Parameters

##### body

`SharedReportRequest`

The shared report configuration

#### Returns

`Promise`\<`unknown`\>

The created shared report

***

### delete()

> **delete**(`id`): `Promise`\<`void`\>

Delete a shared report.

#### Parameters

##### id

`string`

The shared report ID

#### Returns

`Promise`\<`void`\>

***

### getAll()

> **getAll**(): `Promise`\<`unknown`\>

Get all shared reports in the workspace.

#### Returns

`Promise`\<`unknown`\>

Array of shared reports

***

### getById()

> **getById**(`id`): `Promise`\<`unknown`\>

Get a shared report by ID. Note: this endpoint does not use the
workspace prefix in its URL path.

#### Parameters

##### id

`string`

The shared report ID

#### Returns

`Promise`\<`unknown`\>

The shared report

***

### update()

> **update**(`id`, `body`): `Promise`\<`unknown`\>

Update a shared report.

#### Parameters

##### id

`string`

The shared report ID

##### body

`UpdateSharedReportRequest`

The fields to update

#### Returns

`Promise`\<`unknown`\>

The updated shared report
