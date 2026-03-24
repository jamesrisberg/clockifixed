# Interface: InvoiceFilterRequest

## Properties

### clients?

> `optional` **clients?**: [`ContainsArchivedFilterRequest`](../../common/interfaces/ContainsArchivedFilterRequest.md)

***

### companies?

> `optional` **companies?**: [`BaseFilterRequest`](../../common/interfaces/BaseFilterRequest.md)

***

### exactAmount?

> `optional` **exactAmount?**: `number`

***

### exactBalance?

> `optional` **exactBalance?**: `number`

***

### greaterThanAmount?

> `optional` **greaterThanAmount?**: `number`

***

### greaterThanBalance?

> `optional` **greaterThanBalance?**: `number`

***

### invoiceNumber?

> `optional` **invoiceNumber?**: `string`

***

### issueDate?

> `optional` **issueDate?**: [`TimeRangeRequest`](../../common/interfaces/TimeRangeRequest.md)

***

### lessThanAmount?

> `optional` **lessThanAmount?**: `number`

***

### lessThanBalance?

> `optional` **lessThanBalance?**: `number`

***

### page?

> `optional` **page?**: `number`

***

### pageSize?

> `optional` **pageSize?**: `number`

***

### sortColumn?

> `optional` **sortColumn?**: `"ID"` \| `"AMOUNT"` \| `"CLIENT"` \| `"ISSUE_DATE"` \| `"DUE_ON"` \| `"BALANCE"`

***

### sortOrder?

> `optional` **sortOrder?**: `"ASCENDING"` \| `"DESCENDING"`

***

### statuses?

> `optional` **statuses?**: (`"UNSENT"` \| `"SENT"` \| `"PAID"` \| `"PARTIALLY_PAID"` \| `"VOID"` \| `"OVERDUE"`)[]

***

### strictSearch?

> `optional` **strictSearch?**: `boolean`
