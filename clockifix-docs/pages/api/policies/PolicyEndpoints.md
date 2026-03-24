# Class: PolicyEndpoints

## Constructors

### Constructor

> **new PolicyEndpoints**(`http`, `workspaceId`): `PolicyEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`PolicyEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`Policy`\>

Create a new time-off policy.

#### Parameters

##### body

`CreatePolicyRequest`

The policy configuration (name, approval rules, time unit, etc.)

#### Returns

`Promise`\<`Policy`\>

The created policy

#### Example

```ts
const policy = await clockify.policies.create({
  name: "Vacation",
  approve: { requiresApproval: true },
  timeUnit: "DAYS",
  allowHalfDay: true,
});
```

***

### delete()

> **delete**(`policyId`): `Promise`\<`void`\>

Delete a time-off policy. Must be archived first.

#### Parameters

##### policyId

`string`

The policy ID

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`policyId`): `Promise`\<`Policy`\>

Get a time-off policy by ID.

#### Parameters

##### policyId

`string`

The policy ID

#### Returns

`Promise`\<`Policy`\>

The policy

***

### getAll()

> **getAll**(): `Promise`\<`Policy`[]\>

Get all time-off policies in the workspace.

#### Returns

`Promise`\<`Policy`[]\>

Array of policies

***

### update()

> **update**(`policyId`, `body`): `Promise`\<`Policy`\>

Update a time-off policy.

#### Parameters

##### policyId

`string`

The policy ID

##### body

`UpdatePolicyRequest`

The fields to update

#### Returns

`Promise`\<`Policy`\>

The updated policy

***

### updateStatus()

> **updateStatus**(`policyId`, `body`): `Promise`\<`Policy`\>

Archive or unarchive a time-off policy.

#### Parameters

##### policyId

`string`

The policy ID

##### body

`ChangePolicyStatusRequest`

The new status

#### Returns

`Promise`\<`Policy`\>

The updated policy
