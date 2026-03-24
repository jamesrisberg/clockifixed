# Class: InvoiceEndpoints

## Constructors

### Constructor

> **new InvoiceEndpoints**(`http`, `workspaceId`): `InvoiceEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`InvoiceEndpoints`

## Methods

### addItem()

> **addItem**(`invoiceId`, `body`): `Promise`\<`InvoiceOverview`\>

Add a line item to an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### body

`CreateInvoiceItemRequest`

The line item details (description, quantity, unit price in cents)

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview

***

### changeStatus()

> **changeStatus**(`invoiceId`, `body`): `Promise`\<`void`\>

Change the status of an invoice (e.g. UNSENT, SENT, PAID, VOID).

#### Parameters

##### invoiceId

`string`

The invoice ID

##### body

`ChangeInvoiceStatusRequest`

The new status

#### Returns

`Promise`\<`void`\>

***

### create()

> **create**(`body`): `Promise`\<`CreateInvoice`\>

Create a new invoice.

#### Parameters

##### body

`CreateInvoiceRequest`

The invoice details including client, currency, dates, and number

#### Returns

`Promise`\<`CreateInvoice`\>

The created invoice

#### Example

```ts
const invoice = await clockify.invoices.create({
  clientId: "64a1234567890abcdef12345",
  currency: "USD",
  issuedDate: "2026-03-01T00:00:00Z",
  dueDate: "2026-03-31T00:00:00Z",
  number: "INV-001",
});
```

***

### createPayment()

> **createPayment**(`invoiceId`, `body`): `Promise`\<`InvoiceOverview`\>

Record a payment against an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### body

`CreateInvoicePaymentRequest`

The payment details

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview

***

### delete()

> **delete**(`invoiceId`): `Promise`\<`void`\>

Delete an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

#### Returns

`Promise`\<`void`\>

***

### deletePayment()

> **deletePayment**(`invoiceId`, `paymentId`): `Promise`\<`InvoiceOverview`\>

Delete a payment from an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### paymentId

`string`

The payment ID to delete

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview

***

### duplicate()

> **duplicate**(`invoiceId`): `Promise`\<`InvoiceOverview`\>

Duplicate an invoice, creating an identical copy.

#### Parameters

##### invoiceId

`string`

The invoice ID to duplicate

#### Returns

`Promise`\<`InvoiceOverview`\>

The newly created duplicate invoice

***

### export()

> **export**(`invoiceId`): `Promise`\<`void`\>

Export an invoice as a binary download (e.g. PDF).

#### Parameters

##### invoiceId

`string`

The invoice ID

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`invoiceId`): `Promise`\<`InvoiceOverview`\>

Get an invoice by ID.

#### Parameters

##### invoiceId

`string`

The invoice ID

#### Returns

`Promise`\<`InvoiceOverview`\>

The invoice overview with items and totals

***

### getAll()

> **getAll**(`params?`): `Promise`\<`InvoicesList`\>

Get all invoices in the workspace.

#### Parameters

##### params?

`Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

Optional query parameters for filtering

#### Returns

`Promise`\<`InvoicesList`\>

The invoices list

***

### getInfo()

> **getInfo**(`body`): `Promise`\<`InvoiceInfoResponse`\>

Filter invoices and get summary info via a POST body.

#### Parameters

##### body

`InvoiceFilterRequest`

The filter criteria

#### Returns

`Promise`\<`InvoiceInfoResponse`\>

Filtered invoice information

***

### getPayments()

> **getPayments**(`invoiceId`): `Promise`\<`InvoicePayment`[]\>

Get all payments recorded for an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

#### Returns

`Promise`\<`InvoicePayment`[]\>

Array of payments

***

### getSettings()

> **getSettings**(): `Promise`\<`InvoiceSettings`\>

Get the invoice settings for the workspace (default currency, tax rates, etc.).

#### Returns

`Promise`\<`InvoiceSettings`\>

The invoice settings

***

### importTimeEntriesAndExpenses()

> **importTimeEntriesAndExpenses**(`invoiceId`, `body`): `Promise`\<`InvoiceOverview`\>

Import time entries and expenses into an invoice as line items.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### body

`ImportTimeEntriesAndExpensesRequest`

The import criteria (date range, users, projects, etc.)

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview with imported items

***

### removeItem()

> **removeItem**(`invoiceId`, `order`): `Promise`\<`InvoiceOverview`\>

Remove a line item from an invoice by its order position.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### order

`number`

The zero-based order index of the item to remove

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview

***

### update()

> **update**(`invoiceId`, `body`): `Promise`\<`InvoiceOverview`\>

Update an invoice.

#### Parameters

##### invoiceId

`string`

The invoice ID

##### body

`UpdateInvoiceRequest`

The fields to update (number, currency, dates, taxes, etc.)

#### Returns

`Promise`\<`InvoiceOverview`\>

The updated invoice overview

***

### updateSettings()

> **updateSettings**(`body`): `Promise`\<`void`\>

Update the invoice settings for the workspace.

#### Parameters

##### body

`UpdateInvoiceSettingsRequest`

The settings to update

#### Returns

`Promise`\<`void`\>
