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

> **create**(`body`): `Promise`\<`Tag`\>

Create a new tag.

#### Parameters

##### body

`TagRequest`

The tag name

#### Returns

`Promise`\<`Tag`\>

The created tag

***

### delete()

> **delete**(`id`): `Promise`\<`Tag`\>

Delete a tag.

#### Parameters

##### id

`string`

The tag ID

#### Returns

`Promise`\<`Tag`\>

The deleted tag

***

### get()

> **get**(`id`): `Promise`\<`Tag`\>

Get a tag by ID.

#### Parameters

##### id

`string`

The tag ID

#### Returns

`Promise`\<`Tag`\>

The tag

***

### getAll()

> **getAll**(`params?`): `Promise`\<`Tag`[]\>

Get all tags in the workspace. Supports pagination and filtering
by name and archived status.

#### Parameters

##### params?

[`GetAllTagsParams`](../interfaces/GetAllTagsParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`Tag`[]\>

Array of tags

***

### update()

> **update**(`id`, `body`): `Promise`\<`Tag`\>

Update an existing tag.

#### Parameters

##### id

`string`

The tag ID

##### body

`UpdateTagRequest`

The fields to update

#### Returns

`Promise`\<`Tag`\>

The updated tag
