# Class: HolidayEndpoints

## Constructors

### Constructor

> **new HolidayEndpoints**(`http`, `workspaceId`): `HolidayEndpoints`

#### Parameters

##### http

`HttpClient`

##### workspaceId

`string`

#### Returns

`HolidayEndpoints`

## Methods

### create()

> **create**(`body`): `Promise`\<`Holiday`\>

Create a new holiday.

#### Parameters

##### body

`CreateHolidayRequest`

The holiday details (name, date period, user/group assignment)

#### Returns

`Promise`\<`Holiday`\>

The created holiday

#### Example

```ts
const holiday = await clockify.holidays.create({
  name: "Christmas Day",
  datePeriod: { startDate: "2026-12-25", endDate: "2026-12-25" },
  everyoneIncludingNew: true,
  occursAnnually: true,
});
```

***

### delete()

> **delete**(`holidayId`): `Promise`\<`Holiday`\>

Delete a holiday.

#### Parameters

##### holidayId

`string`

The holiday ID

#### Returns

`Promise`\<`Holiday`\>

The deleted holiday

***

### getAll()

> **getAll**(): `Promise`\<`Holiday`[]\>

Get all holidays in the workspace.

#### Returns

`Promise`\<`Holiday`[]\>

Array of holidays

***

### getInPeriod()

> **getInPeriod**(`params`): `Promise`\<`Holiday`[]\>

Get holidays that fall within a date range.

#### Parameters

##### params

The start and end dates for the period

###### end

`string`

###### start

`string`

#### Returns

`Promise`\<`Holiday`[]\>

Array of holidays in the period

***

### update()

> **update**(`holidayId`, `body`): `Promise`\<`Holiday`\>

Update a holiday.

#### Parameters

##### holidayId

`string`

The holiday ID

##### body

`UpdateHolidayRequest`

The fields to update

#### Returns

`Promise`\<`Holiday`\>

The updated holiday
