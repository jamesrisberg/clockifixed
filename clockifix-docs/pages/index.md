---
title: Clockifixed
description: A normalized, type-safe Clockify API wrapper with runtime validation and full endpoint coverage.
---

# Clockifixed

[npm](https://www.npmjs.com/package/clockifixed) | [GitHub](https://github.com/jamesrisberg/clockifixed)

A complete TypeScript wrapper for the [Clockify API](https://clockify.me) that tames its inconsistencies and provides a clean, validated interface for building integrations.

## Install

```bash
npm install clockifixed
```

Requires Node.js 20+. Only runtime dependency is [Zod](https://zod.dev/).

## Quick Start

```typescript
import { Clockify } from "clockifixed";

// Connect with just an API key to discover workspaces
const api = new Clockify({ apiKey: process.env.CLOCKIFY_API_KEY! });
const workspaces = await api.workspaces.getAll();
const me = await api.users.getLoggedUser();

// Then target a specific workspace for full API access
const clockify = api.forWorkspace(workspaces[0].id);
const projects = await clockify.projects.getAll();

const entry = await clockify.timeEntries.create({
  projectId: projects[0].id!,
  start: "2026-03-17T09:00:00Z",
  end: "2026-03-17T17:00:00Z",
  description: "Building the future",
});
```

## Why Clockifixed?

Clockify's REST API has **108 paths**, **166 operations**, and **277 schema definitions** — but the types are scattered, naming is inconsistent, and the spec doesn't always match reality. Clockifixed fixes that.

| What you get | Details |
|---|---|
| **277 TypeScript types** | Every schema from the OpenAPI spec, properly organized |
| **277 Zod schemas** | Runtime validation that catches what TypeScript can't |
| **22 endpoint modules** | 164 methods covering the full API surface |
| **Runtime verifier** | Hit real endpoints, compare to spec, log divergences |
| **Anomaly tracker** | Documented inconsistencies for Clockify's team |

## Documentation

| Section | What's there |
|---|---|
| [**Getting Started**](/sdk/getting-started) | Installation, configuration, and first API calls |
| [**Architecture**](/sdk/architecture) | How the layers fit together |
| [**Type System**](/sdk/type-system) | TypeScript + Zod dual validation |
| [**Endpoints**](/sdk/endpoints) | All 22 modules and 164 methods |
| [**Verification**](/sdk/verification) | Runtime API drift detection |
| [**System Design**](/system/overview) | Diagrams and data flow |
| [**API Reference**](/api/overview) | Auto-generated from the OpenAPI spec |
| [**Anomalies**](/api/anomalies) | Every inconsistency we've found in Clockify's API |
