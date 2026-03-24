# Class: GroupEndpoints

## Constructors

### Constructor

> **new GroupEndpoints**(`http`, `workspaceId`): `GroupEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`GroupEndpoints`

## Methods

### addUsers()

> **addUsers**(`groupId`, `body`): `Promise`\<`UserGroup`\>

Add a user to a group.

#### Parameters

##### groupId

`string`

The group ID

##### body

`UserGroupUserRequest`

The user ID to add

#### Returns

`Promise`\<`UserGroup`\>

The updated group

***

### create()

> **create**(`body`): `Promise`\<`UserGroup`\>

Create a new user group.

#### Parameters

##### body

`UserGroupRequest`

The group name

#### Returns

`Promise`\<`UserGroup`\>

The created group

***

### delete()

> **delete**(`id`): `Promise`\<`UserGroup`\>

Delete a user group.

#### Parameters

##### id

`string`

The group ID

#### Returns

`Promise`\<`UserGroup`\>

The deleted group

***

### getAll()

> **getAll**(): `Promise`\<`UserGroup`[]\>

Get all user groups in the workspace.

#### Returns

`Promise`\<`UserGroup`[]\>

Array of user groups

***

### removeUser()

> **removeUser**(`groupId`, `userId`): `Promise`\<`UserGroup`\>

Remove a user from a group.

#### Parameters

##### groupId

`string`

The group ID

##### userId

`string`

The user ID to remove

#### Returns

`Promise`\<`UserGroup`\>

The updated group

***

### update()

> **update**(`id`, `body`): `Promise`\<`UserGroup`\>

Update an existing user group.

#### Parameters

##### id

`string`

The group ID

##### body

`UpdateUserGroupRequest`

The fields to update

#### Returns

`Promise`\<`UserGroup`\>

The updated group
