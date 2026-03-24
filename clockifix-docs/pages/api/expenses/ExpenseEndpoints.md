# Class: ExpenseEndpoints

## Constructors

### Constructor

> **new ExpenseEndpoints**(`http`, `workspaceId`): `ExpenseEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`ExpenseEndpoints`

## Methods

### archiveCategory()

> **archiveCategory**(`categoryId`, `body`): `Promise`\<`ExpenseCategoryDtoV1`\>

Archive or unarchive an expense category.

#### Parameters

##### categoryId

`string`

The category ID

##### body

`ExpenseCategoryArchiveV1Request`

The archive status to set

#### Returns

`Promise`\<`ExpenseCategoryDtoV1`\>

The updated category

***

### create()

> **create**(`body`): `Promise`\<`Expense`\>

Create a new expense. Sent as multipart/form-data as required by
the Clockify API (supports receipt file upload).

#### Parameters

##### body

`CreateExpenseV1Request`

The expense details including amount (in cents), category, date, and receipt file

#### Returns

`Promise`\<`Expense`\>

The created expense

#### Example

```ts
const expense = await clockify.expenses.create({
  amount: 2500,
  categoryId: "cat123",
  date: "2026-03-15T00:00:00Z",
  projectId: "proj123",
  userId: "user123",
  file: receiptBlob,
});
```

***

### createCategory()

> **createCategory**(`body`): `Promise`\<`ExpenseCategoryDtoV1`\>

Create an expense category.

#### Parameters

##### body

`ExpenseCategoryV1Request`

The category name

#### Returns

`Promise`\<`ExpenseCategoryDtoV1`\>

The created category

***

### delete()

> **delete**(`expenseId`): `Promise`\<`void`\>

Delete an expense.

#### Parameters

##### expenseId

`string`

The expense ID

#### Returns

`Promise`\<`void`\>

***

### deleteCategory()

> **deleteCategory**(`categoryId`): `Promise`\<`void`\>

Delete an expense category. Must be archived first.

#### Parameters

##### categoryId

`string`

The category ID

#### Returns

`Promise`\<`void`\>

***

### downloadReceipt()

> **downloadReceipt**(`expenseId`, `fileId`): `Promise`\<`void`\>

Download a receipt file attached to an expense (binary download).

#### Parameters

##### expenseId

`string`

The expense ID

##### fileId

`string`

The file ID of the receipt

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`expenseId`): `Promise`\<`Expense`\>

Get an expense by ID.

#### Parameters

##### expenseId

`string`

The expense ID

#### Returns

`Promise`\<`Expense`\>

The expense

***

### getAll()

> **getAll**(`params?`): `Promise`\<`ExpensesAndTotals`\>

Get all expenses in the workspace. Returns expenses wrapped with
daily and weekly totals.

#### Parameters

##### params?

`Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

Optional query parameters for filtering

#### Returns

`Promise`\<`ExpensesAndTotals`\>

Expenses with daily and weekly totals

***

### getCategories()

> **getCategories**(): `Promise`\<`ExpenseCategoriesWithCount`\>

Get all expense categories with their count.

#### Returns

`Promise`\<`ExpenseCategoriesWithCount`\>

Categories wrapped with a total count

***

### update()

> **update**(`expenseId`, `body`): `Promise`\<`Expense`\>

Update an expense. Sent as multipart/form-data as required by
the Clockify API.

#### Parameters

##### expenseId

`string`

The expense ID

##### body

`UpdateExpenseV1Request`

The fields to update

#### Returns

`Promise`\<`Expense`\>

The updated expense

***

### updateCategory()

> **updateCategory**(`categoryId`, `body`): `Promise`\<`ExpenseCategoryDtoV1`\>

Update an expense category.

#### Parameters

##### categoryId

`string`

The category ID

##### body

`ExpenseCategoryV1Request`

The fields to update

#### Returns

`Promise`\<`ExpenseCategoryDtoV1`\>

The updated category
