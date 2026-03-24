# Class: WebhookEndpoints

## Constructors

### Constructor

> **new WebhookEndpoints**(`http`, `workspaceId`): `WebhookEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`WebhookEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`Webhook`\>

Create a new webhook. Workspace admins can create up to 10 each,
with a total of 100 per workspace.

#### Parameters

##### body

`CreateWebhookRequest`

The webhook configuration (URL, event type, trigger sources)

#### Returns

`Promise`\<`Webhook`\>

The created webhook with its auth token

#### Example

```ts
const webhook = await clockify.webhooks.create({
  name: "Time entry tracker",
  url: "https://example.com/webhook",
  webhookEvent: "NEW_TIME_ENTRY",
  triggerSourceType: "PROJECT_ID",
  triggerSource: [projectId],
});
```

***

### delete()

> **delete**(`webhookId`): `Promise`\<`void`\>

Delete a webhook.

#### Parameters

##### webhookId

`string`

The webhook ID

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`webhookId`): `Promise`\<`Webhook`\>

Get a webhook by ID.

#### Parameters

##### webhookId

`string`

The webhook ID

#### Returns

`Promise`\<`Webhook`\>

The webhook

***

### getAll()

> **getAll**(): `Promise`\<`Webhooks`\>

Get all webhooks in the workspace. Returns webhooks with the
workspace webhook count.

#### Returns

`Promise`\<`Webhooks`\>

Webhooks list with count

***

### getForAddon()

> **getForAddon**(`addonId`): `Promise`\<`Webhooks`\>

Get webhooks registered by a specific addon.

#### Parameters

##### addonId

`string`

The addon ID

#### Returns

`Promise`\<`Webhooks`\>

Webhooks list with count

***

### getLogs()

> **getLogs**(`webhookId`, `body`): `Promise`\<`WebhookLog`[]\>

Get delivery logs for a webhook. Useful for debugging failed deliveries.

#### Parameters

##### webhookId

`string`

The webhook ID

##### body

`WebhookLogSearchRequest`

Search criteria for filtering logs

#### Returns

`Promise`\<`WebhookLog`[]\>

Array of webhook delivery logs

***

### regenerateToken()

> **regenerateToken**(`webhookId`): `Promise`\<`Webhook`\>

Regenerate the auth token for a webhook. The old token is
immediately invalidated.

#### Parameters

##### webhookId

`string`

The webhook ID

#### Returns

`Promise`\<`Webhook`\>

The webhook with its new auth token

***

### update()

> **update**(`webhookId`, `body`): `Promise`\<`Webhook`\>

Update a webhook's configuration.

#### Parameters

##### webhookId

`string`

The webhook ID

##### body

`UpdateWebhookRequest`

The fields to update

#### Returns

`Promise`\<`Webhook`\>

The updated webhook
