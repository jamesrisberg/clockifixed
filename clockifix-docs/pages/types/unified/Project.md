# Interface: Project

Unified project — superset of ProjectDtoV1 (GET) and ProjectDtoImplV1 (POST/PUT/DELETE).

Fields only present on mutation responses: `clientId`, `clientName`, `isPublic`, `isTemplate`, `estimateReset`.
Fields only present on GET responses: none (GET is a subset of mutation responses).

## Properties

### archived?

> `optional` **archived?**: `boolean`

***

### billable?

> `optional` **billable?**: `boolean`

***

### budgetEstimate?

> `optional` **budgetEstimate?**: `EstimateWithOptions` \| `null`

***

### clientId?

> `optional` **clientId?**: `string`

***

### clientName?

> `optional` **clientName?**: `string`

***

### color?

> `optional` **color?**: `string`

***

### costRate?

> `optional` **costRate?**: `RateDtoV1` \| `null`

***

### duration?

> `optional` **duration?**: `string` \| `null`

***

### estimate?

> `optional` **estimate?**: `Estimate` \| `null`

***

### estimateReset?

> `optional` **estimateReset?**: `EstimateReset` \| `null`

***

### hourlyRate?

> `optional` **hourlyRate?**: `RateDtoV1` \| `null`

***

### id?

> `optional` **id?**: `string`

***

### isPublic?

> `optional` **isPublic?**: `boolean`

***

### isTemplate?

> `optional` **isTemplate?**: `boolean`

***

### memberships?

> `optional` **memberships?**: `Membership`[]

***

### name?

> `optional` **name?**: `string`

***

### note?

> `optional` **note?**: `string`

***

### public?

> `optional` **public?**: `boolean`

***

### template?

> `optional` **template?**: `boolean`

***

### timeEstimate?

> `optional` **timeEstimate?**: `TimeEstimate` \| `null`

***

### workspaceId?

> `optional` **workspaceId?**: `string`
