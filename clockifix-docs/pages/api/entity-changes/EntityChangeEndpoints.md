# Class: EntityChangeEndpoints

## Constructors

### Constructor

> **new EntityChangeEndpoints**(`http`, `workspaceId`): `EntityChangeEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`EntityChangeEndpoints`

## Methods

### getCreated()

> **getCreated**(`params`): `Promise`\<`unknown`\>

Get entities created within a time range. This is an experimental API.

#### Parameters

##### params

[`EntityChangesParams`](../interfaces/EntityChangesParams.md)

The entity type, date range, and optional pagination

#### Returns

`Promise`\<`unknown`\>

Created entities matching the criteria

***

### getDeleted()

> **getDeleted**(`params`): `Promise`\<`PageableCollectionLogBinDocument`\>

Get entities deleted within a time range. This is an experimental API.

#### Parameters

##### params

[`EntityChangesParams`](../interfaces/EntityChangesParams.md)

The entity type, date range, and optional pagination

#### Returns

`Promise`\<`PageableCollectionLogBinDocument`\>

Paginated collection of deleted entity records

***

### getUpdated()

> **getUpdated**(`params`): `Promise`\<`unknown`\>

Get entities updated within a time range. This is an experimental API.

#### Parameters

##### params

[`EntityChangesParams`](../interfaces/EntityChangesParams.md)

The entity type, date range, and optional pagination

#### Returns

`Promise`\<`unknown`\>

Updated entities matching the criteria
