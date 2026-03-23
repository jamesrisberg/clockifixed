# clockifixed

[Documentation](https://clockifixed.com) | [npm](https://www.npmjs.com/package/clockifixed) | [GitHub](https://github.com/jamesrisberg/clockifixed)

A typed, validated wrapper around the [Clockify API](https://docs.clockify.me/) for Node.js and TypeScript.

Every response is validated at runtime with [Zod](https://zod.dev/) schemas generated from the official OpenAPI spec, so you get real types *and* real guarantees that the data matches them.

## Install

```bash
npm install clockifixed
```

Requires Node.js 20+.

## Quick start

You need an **API Key** from [Clockify Profile Settings](https://app.clockify.me/user/settings).

```typescript
import { Clockify } from "clockifixed";

// Connect with just an API key — discover workspaces dynamically
const api = new Clockify({ apiKey: "your-api-key" });
const workspaces = await api.workspaces.getAll();
const me = await api.users.getLoggedUser();

// Target a workspace for full API access
const clockify = api.forWorkspace(workspaces[0].id);

// Or pass workspaceId directly if you already know it
// const clockify = new Clockify({ apiKey: "...", workspaceId: "..." });

// List projects
const projects = await clockify.projects.getAll();

// Create a time entry
await clockify.timeEntries.create({
  projectId: "...",
  start: "2026-03-23T09:00:00Z",
  end: "2026-03-23T17:00:00Z",
  description: "Building something great",
});

// Get time entries for a user
const entries = await clockify.timeEntries.getForUser(me.id, {
  start: "2026-03-01T00:00:00Z",
  end: "2026-03-23T23:59:59Z",
});
```

## What's included

- **22 endpoint modules** covering workspaces, projects, time entries, tags, tasks, clients, groups, approvals, expenses, invoices, webhooks, holidays, custom fields, scheduling, policies, time off, balances, reports, shared reports, templates, and entity changes
- **277 TypeScript types** with matching Zod schemas, generated from the Clockify OpenAPI spec
- **Built-in rate limiting** with configurable requests/second (token bucket)
- **Auto-pagination** via async generators on the HTTP client
- **Typed errors** — `ClockifyApiError`, `ClockifyValidationError`, `ClockifyRateLimitError`
- **Runtime validation** — responses are checked against Zod schemas so bugs surface immediately, not downstream

## Configuration

```typescript
const clockify = new Clockify({
  apiKey: "your-api-key",        // Required — from Clockify Profile Settings
  workspaceId: "your-ws-id",     // Optional — needed for most endpoints
  baseUrl: "https://...",        // Optional — override for regional endpoints
  reportsBaseUrl: "https://...", // Optional — override for reports API
  maxRequestsPerSecond: 10,      // Optional — rate limit (default: 10)
  defaultPageSize: 50,           // Optional — pagination default
});
```

## API overview

All endpoints hang off the main `Clockify` instance:

```typescript
clockify.workspaces    // Workspace management
clockify.users         // Users and members
clockify.projects      // Projects
clockify.timeEntries   // Time entries
clockify.tasks         // Tasks (scoped to project)
clockify.tags          // Tags
clockify.clients       // Clients
clockify.groups        // User groups
clockify.approvals     // Approval requests
clockify.expenses      // Expenses
clockify.invoices      // Invoices
clockify.webhooks      // Webhooks
clockify.holidays      // Holidays
clockify.customFields  // Custom fields
clockify.scheduling    // Scheduling and assignments
clockify.policies      // Time-off policies
clockify.timeOff       // Time-off requests
clockify.balances      // Time-off balances
clockify.reports       // Reports
clockify.sharedReports // Shared reports
clockify.templates     // Templates (deprecated by Clockify)
clockify.entityChanges // Entity change tracking (experimental)
```

## Pagination

For endpoints that return paginated results, you can use the lower-level `HttpClient` directly:

```typescript
import { HttpClient } from "clockifixed/client";

const http = new HttpClient({ apiKey: "your-key" });

// Async generator — yields one page at a time
for await (const page of http.getAllPages("/workspaces/ws-id/projects")) {
  console.log(page); // ProjectDtoV1[]
}

// Or collect everything into a single array
const all = await http.collectAllPages("/workspaces/ws-id/projects");
```

## Error handling

```typescript
import { ClockifyApiError, ClockifyRateLimitError } from "clockifixed";

try {
  await clockify.projects.get("bad-id");
} catch (err) {
  if (err instanceof ClockifyRateLimitError) {
    // err.retryAfterMs — milliseconds to wait
  } else if (err instanceof ClockifyApiError) {
    // err.status, err.statusText, err.body, err.url, err.method
  }
}
```

## Types

All request and response types are exported:

```typescript
import type { ProjectDtoImplV1, CreateTimeEntryRequest } from "clockifixed";
```

Zod schemas are also available for custom validation:

```typescript
import { projectDtoImplV1Schema } from "clockifixed";
```

## API drift detection

Clockifixed includes a verification system that checks live API responses against the OpenAPI spec schemas — both reads and writes. Every one of the library's 164 methods is tested against the live Clockify API, with 41 "reality" schemas that document where the API diverges from its own spec.

```bash
# Clone the repo, then:
CLOCKIFY_API_KEY=... npm run verify:cli     # Read-only (GET endpoints)
CLOCKIFY_API_KEY=... npm run verify:write   # Full lifecycle (creates test data, then cleans up)
```

## Development

```bash
git clone https://github.com/jamesrisberg/clockifixed.git
cd clockifixed
npm install
npm run build        # Build the library (excludes verify/scripts)
npm run build:all    # Build everything including verifier
npm test             # Run all tests (139 tests)
npm run verify:cli   # Read API verification (needs CLOCKIFY_API_KEY)
npm run verify:write # Write API verification (creates/cleans test data)
npm run generate     # Regenerate types from openapi.json
npm run lint         # Type-check without emitting
```

## License

MIT
