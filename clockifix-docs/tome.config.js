/** @type {import('@tomehq/core').TomeConfig} */
export default {
  name: "Clockifixed",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  // api spec disabled — Clockify's OpenAPI has circular $ref chains that
  // Tome can't serialize. See https://docs.clockify.me/ for the official API reference.
  // api: {
  //   spec: "./openapi.json",
  //   playground: true,
  // },
  navigation: [
    {
      group: "Overview",
      pages: ["index"],
    },
    {
      group: "SDK Guide",
      pages: [
        "sdk/getting-started",
        "sdk/architecture",
        "sdk/type-system",
        "sdk/data-flow",
        "sdk/endpoints",
        "sdk/verification",
      ],
    },
    {
      group: "API Reference",
      pages: [
        "api/time-entries/TimeEntryEndpoints",
        "api/projects/ProjectEndpoints",
        "api/users/UserEndpoints",
        "api/clients/ClientEndpoints",
        "api/tags/TagEndpoints",
        "api/tasks/TaskEndpoints",
        "api/groups/GroupEndpoints",
        "api/workspace/WorkspaceEndpoints",
        "api/invoices/InvoiceEndpoints",
        "api/expenses/ExpenseEndpoints",
        "api/webhooks/WebhookEndpoints",
        "api/custom-fields/CustomFieldEndpoints",
        "api/holidays/HolidayEndpoints",
        "api/approvals/ApprovalEndpoints",
        "api/scheduling/SchedulingEndpoints",
        "api/policies/PolicyEndpoints",
        "api/time-off/TimeOffEndpoints",
        "api/balances/BalanceEndpoints",
        "api/reports/ReportEndpoints",
        "api/shared-reports/SharedReportEndpoints",
        "api/templates/TemplateEndpoints",
        "api/entity-changes/EntityChangeEndpoints",
      ],
    },
    {
      group: "Clockify API",
      pages: [
        "api/overview",
        "api/anomalies",
      ],
    },
  ],
};
