# Class: TemplateEndpoints

## Constructors

### Constructor

> **new TemplateEndpoints**(`http`, `workspaceId`): `TemplateEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`TemplateEndpoints`

## Methods

### ~~create()~~

> **create**(`body`): `Promise`\<`TemplateDtoImpl`[]\>

Create one or more templates. Accepts a single template or an array —
single values are automatically wrapped in an array.

#### Parameters

##### body

`TemplateRequest` \| `TemplateRequest`[]

One or more template definitions

#### Returns

`Promise`\<`TemplateDtoImpl`[]\>

The created templates

#### Deprecated

Clockify has deprecated the templates API.

***

### ~~delete()~~

> **delete**(`templateId`): `Promise`\<`TemplateDtoImpl`\>

Delete a template.

#### Parameters

##### templateId

`string`

The template ID

#### Returns

`Promise`\<`TemplateDtoImpl`\>

The deleted template

#### Deprecated

Clockify has deprecated the templates API.

***

### ~~get()~~

> **get**(`templateId`): `Promise`\<`Template`\>

Get a template by ID.

#### Parameters

##### templateId

`string`

The template ID

#### Returns

`Promise`\<`Template`\>

The template

#### Deprecated

Clockify has deprecated the templates API.

***

### ~~getAll()~~

> **getAll**(): `Promise`\<`Template`[]\>

Get all templates in the workspace.

#### Returns

`Promise`\<`Template`[]\>

Array of templates

#### Deprecated

Clockify has deprecated the templates API.

***

### ~~update()~~

> **update**(`templateId`, `body`): `Promise`\<`TemplateDtoImpl`\>

Update a template.

#### Parameters

##### templateId

`string`

The template ID

##### body

`TemplatePatchRequest`

The fields to update

#### Returns

`Promise`\<`TemplateDtoImpl`\>

The updated template

#### Deprecated

Clockify has deprecated the templates API.
