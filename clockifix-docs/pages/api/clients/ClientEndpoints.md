# Class: ClientEndpoints

## Constructors

### Constructor

> **new ClientEndpoints**(`http`, `workspaceId`): `ClientEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`ClientEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`ClockifyClient`\>

Create a new client.

#### Parameters

##### body

`CreateClientRequest`

The client details

#### Returns

`Promise`\<`ClockifyClient`\>

The created client

#### Example

```ts
const client = await clockify.clients.create({
  name: "Acme Corp",
  email: "billing@acme.com",
});
```

***

### delete()

> **delete**(`id`): `Promise`\<`ClockifyClient`\>

Delete a client. The client must be archived first.

#### Parameters

##### id

`string`

The client ID

#### Returns

`Promise`\<`ClockifyClient`\>

The deleted client

***

### get()

> **get**(`id`): `Promise`\<`ClockifyClient`\>

Get a client by ID.

#### Parameters

##### id

`string`

The client ID

#### Returns

`Promise`\<`ClockifyClient`\>

The client

***

### getAll()

> **getAll**(`params?`): `Promise`\<`ClockifyClient`[]\>

Get all clients in the workspace. Supports pagination and filtering
by name and archived status.

#### Parameters

##### params?

[`GetAllClientsParams`](../interfaces/GetAllClientsParams.md)

Optional pagination and filter parameters

#### Returns

`Promise`\<`ClockifyClient`[]\>

Array of clients

#### Example

```ts
const clients = await clockify.clients.getAll({ archived: false });
```

***

### update()

> **update**(`id`, `body`): `Promise`\<`ClockifyClient`\>

Update an existing client.

#### Parameters

##### id

`string`

The client ID

##### body

`UpdateClientRequest`

The fields to update

#### Returns

`Promise`\<`ClockifyClient`\>

The updated client
