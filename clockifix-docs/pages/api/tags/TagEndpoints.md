# Class: TagEndpoints

## Constructors

### Constructor

> **new TagEndpoints**(`http`, `workspaceId`): `TagEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`TagEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`TagDtoV1`\>

Create a new tag.

#### Parameters

##### body

`TagRequest`

The tag name

#### Returns

`Promise`\<`TagDtoV1`\>

The created tag

***

### delete()

> **delete**(`id`): `Promise`\<`TagDtoV1`\>

Delete a tag.

#### Parameters

##### id

`string`

The tag ID

#### Returns

`Promise`\<`TagDtoV1`\>

The deleted tag

***

### get()

> **get**(`id`): `Promise`\<`TagDtoV1`\>

Get a tag by ID.

#### Parameters

##### id

`string`

The tag ID

#### Returns

`Promise`\<`TagDtoV1`\>

The tag

***

### getAll()

> **getAll**(`params?`): `Promise`\<`TagDtoV1`[]\>

Get all tags in the workspace. Supports pagination and filtering
by name and archived status.

#### Parameters

##### params?

[`GetAllTagsParams`](../interfaces/GetAllTagsParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`TagDtoV1`[]\>

Array of tags

***

### update()

> **update**(`id`, `body`): `Promise`\<`TagDtoV1`\>

Update an existing tag.

#### Parameters

##### id

`string`

The tag ID

##### body

`UpdateTagRequest`

The fields to update

#### Returns

`Promise`\<`TagDtoV1`\>

The updated tag
