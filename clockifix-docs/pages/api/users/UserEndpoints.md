# Class: UserEndpoints

## Constructors

### Constructor

> **new UserEndpoints**(`http`, `workspaceId`): `UserEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`UserEndpoints`

## Methods

### createRole()

> **createRole**(`userId`, `body`): `Promise`\<`RoleDetails`[]\>

Assign a role to a user (e.g. WORKSPACE_ADMIN, TEAM_MANAGER, PROJECT_MANAGER).

#### Parameters

##### userId

`string`

The user ID

##### body

`RoleRequest`

The role assignment details

#### Returns

`Promise`\<`RoleDetails`[]\>

The user's updated role assignments

***

### deleteRole()

> **deleteRole**(`userId`, `body`): `Promise`\<`void`\>

Remove a role assignment from a user.

#### Parameters

##### userId

`string`

The user ID

##### body

`RoleRequest`

The role to remove

#### Returns

`Promise`\<`void`\>

***

### filter()

> **filter**(`body`): `Promise`\<`UserDtoV1`[]\>

Filter users with advanced criteria via a POST body.

#### Parameters

##### body

`GetUsersRequest`

The filter criteria

#### Returns

`Promise`\<`UserDtoV1`[]\>

Array of matching users

***

### getAll()

> **getAll**(`params?`): `Promise`\<`UserDtoV1`[]\>

Get all users in the workspace. Supports pagination and filtering
by name, email, and status.

#### Parameters

##### params?

[`GetAllUsersParams`](../interfaces/GetAllUsersParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`UserDtoV1`[]\>

Array of users

#### Example

```ts
const active = await clockify.users.getAll({
  status: "ACTIVE",
  pageSize: 100,
});
```

***

### getLoggedUser()

> **getLoggedUser**(): `Promise`\<`UserDtoV1`\>

Get the currently authenticated user. Does not require a workspace ID.

#### Returns

`Promise`\<`UserDtoV1`\>

The authenticated user

#### Example

```ts
const me = await clockify.users.getLoggedUser();
console.log(me.name, me.email, me.activeWorkspace);
```

***

### getManagers()

> **getManagers**(`userId`): `Promise`\<`UserDtoV1`[]\>

Get the managers assigned to a specific user.

#### Parameters

##### userId

`string`

The user ID

#### Returns

`Promise`\<`UserDtoV1`[]\>

Array of users who are managers of this user

***

### getMemberProfile()

> **getMemberProfile**(`userId`): `Promise`\<`MemberProfile`\>

Get a member's profile in the workspace.

#### Parameters

##### userId

`string`

The user ID

#### Returns

`Promise`\<`MemberProfile`\>

The member's workspace profile

***

### updateMemberProfile()

> **updateMemberProfile**(`userId`, `body`): `Promise`\<`MemberProfile`\>

Update a member's profile in the workspace.

#### Parameters

##### userId

`string`

The user ID

##### body

`MemberProfileFullRequest`

The profile fields to update

#### Returns

`Promise`\<`MemberProfile`\>

The updated member profile

***

### uploadImage()

> **uploadImage**(`body`): `Promise`\<`UploadFileResponse`\>

Upload a profile image for the authenticated user.

#### Parameters

##### body

`unknown`

The image data to upload

#### Returns

`Promise`\<`UploadFileResponse`\>

The upload result with the file URL

***

### upsertCustomFieldValue()

> **upsertCustomFieldValue**(`userId`, `customFieldId`, `body`): `Promise`\<`UserCustomFieldValue`\>

Set or update a custom field value for a user. Creates the value
if it doesn't exist, or updates it if it does.

#### Parameters

##### userId

`string`

The user ID

##### customFieldId

`string`

The custom field ID

##### body

`UpsertUserCustomFieldRequestV1`

The value to set

#### Returns

`Promise`\<`UserCustomFieldValue`\>

The upserted custom field value
