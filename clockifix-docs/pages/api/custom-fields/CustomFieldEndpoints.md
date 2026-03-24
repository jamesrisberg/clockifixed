# Class: CustomFieldEndpoints

## Constructors

### Constructor

> **new CustomFieldEndpoints**(`http`, `workspaceId`): `CustomFieldEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`CustomFieldEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`void`\>

Create a new custom field in the workspace.

#### Parameters

##### body

`CustomFieldRequest`

The field definition (name, type, allowed values, etc.)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await clockify.customFields.create({
  name: "Department",
  type: "DROPDOWN_SINGLE",
  entityType: "TIMEENTRY",
  allowedValues: ["Engineering", "Design", "Marketing"],
});
```

***

### delete()

> **delete**(`customFieldId`): `Promise`\<`void`\>

Delete a custom field from the workspace.

#### Parameters

##### customFieldId

`string`

The custom field ID

#### Returns

`Promise`\<`void`\>

***

### getAll()

> **getAll**(): `Promise`\<`CustomField`[]\>

Get all custom fields defined in the workspace.

#### Returns

`Promise`\<`CustomField`[]\>

Array of custom fields

***

### getForProject()

> **getForProject**(`projectId`): `Promise`\<`CustomField`[]\>

Get the custom fields configured for a specific project.

#### Parameters

##### projectId

`string`

The project ID

#### Returns

`Promise`\<`CustomField`[]\>

Array of custom fields on this project

***

### removeFromProject()

> **removeFromProject**(`projectId`, `customFieldId`): `Promise`\<`CustomField`\>

Remove a custom field from a project (does not delete the field itself).

#### Parameters

##### projectId

`string`

The project ID

##### customFieldId

`string`

The custom field ID to remove

#### Returns

`Promise`\<`CustomField`\>

The removed custom field

***

### update()

> **update**(`customFieldId`, `body`): `Promise`\<`CustomField`\>

Update a custom field's definition.

#### Parameters

##### customFieldId

`string`

The custom field ID

##### body

`UpdateCustomFieldRequestV1`

The fields to update

#### Returns

`Promise`\<`CustomField`\>

The updated custom field

***

### updateProjectDefault()

> **updateProjectDefault**(`projectId`, `customFieldId`, `body`): `Promise`\<`CustomField`\>

Set or update the default value for a custom field on a specific project.

#### Parameters

##### projectId

`string`

The project ID

##### customFieldId

`string`

The custom field ID

##### body

`CustomFieldProjectDefaultValuesRequest`

The default value configuration

#### Returns

`Promise`\<`CustomField`\>

The updated custom field
