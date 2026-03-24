# Class: BalanceEndpoints

## Constructors

### Constructor

> **new BalanceEndpoints**(`http`, `workspaceId`): `BalanceEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`BalanceEndpoints`

## Methods

### getForPolicy()

> **getForPolicy**(`policyId`): `Promise`\<`unknown`\>

Get time-off balances for all users on a specific policy.

#### Parameters

##### policyId

`string`

The time-off policy ID

#### Returns

`Promise`\<`unknown`\>

The balance data for each user on this policy

***

### getForUser()

> **getForUser**(`userId`): `Promise`\<`unknown`\>

Get all time-off policy balances for a specific user.

#### Parameters

##### userId

`string`

The user ID

#### Returns

`Promise`\<`unknown`\>

The user's balance across all policies

***

### update()

> **update**(`policyId`, `body`): `Promise`\<`unknown`\>

Update time-off balances for users on a policy.

#### Parameters

##### policyId

`string`

The time-off policy ID

##### body

`UpdateBalanceRequest`

The balance adjustments

#### Returns

`Promise`\<`unknown`\>

The updated balance data
