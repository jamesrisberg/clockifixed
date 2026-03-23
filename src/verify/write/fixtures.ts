/**
 * Test data factories for write verification.
 * All names use _cfix_test_ prefix for identification and orphan cleanup.
 */

const PREFIX = "_cfix_test_";
const ts = () => Date.now().toString(36);

export const fixtures = {
  client: () => ({
    name: `${PREFIX}Acme Corp ${ts()}`,
  }),

  project: (clientId?: string) => ({
    name: `${PREFIX}Web Redesign ${ts()}`,
    clientId,
    color: "#2196F3",
    isPublic: true,
    billable: true,
  }),

  task: () => ({
    name: `${PREFIX}Design mockups ${ts()}`,
  }),

  tag: () => ({
    name: `${PREFIX}urgent ${ts()}`,
  }),

  group: () => ({
    name: `${PREFIX}QA Team ${ts()}`,
  }),

  holiday: () => ({
    name: `${PREFIX}Test Holiday ${ts()}`,
    datePeriod: {
      startDate: "2027-12-25",
      endDate: "2027-12-25",
    },
    everyoneIncludingNew: true,
  }),

  customField: () => ({
    name: `${PREFIX}Priority ${ts()}`,
    type: "TXT" as const,
    entityType: "TIMEENTRY" as const,
  }),

  timeEntry: (projectId?: string, taskId?: string) => ({
    start: "2027-01-15T09:00:00Z",
    end: "2027-01-15T11:30:00Z",
    description: `${PREFIX}Testing write ops`,
    projectId,
    taskId,
    billable: true,
  }),

  webhook: (workspaceId: string) => ({
    name: `${PREFIX}Hook${ts()}`.slice(0, 30),
    url: "https://httpbin.org/post",
    triggerSource: [workspaceId],
    triggerSourceType: "WORKSPACE_ID" as const,
    webhookEvent: "TIME_ENTRY_UPDATED" as const,
  }),

  expenseCategory: () => ({
    name: `${PREFIX}Travel ${ts()}`,
  }),

  invoice: (clientId: string) => ({
    clientId,
    currency: "USD",
    dueDate: "2027-06-30",
    issuedDate: "2027-06-01",
    number: `${PREFIX}INV-${ts()}`,
  }),

  policy: () => ({
    name: `${PREFIX}PTO ${ts()}`,
    timeUnit: "DAYS" as const,
  }),

  template: () => ({
    name: `${PREFIX}Template ${ts()}`,
  }),
};

export const updates = {
  client: () => ({
    name: `${PREFIX}Acme Updated ${ts()}`,
  }),

  project: () => ({
    name: `${PREFIX}Web Redesign Updated ${ts()}`,
    color: "#FF5722",
  }),

  task: () => ({
    name: `${PREFIX}Design Updated ${ts()}`,
  }),

  tag: () => ({
    name: `${PREFIX}critical ${ts()}`,
  }),

  group: () => ({
    name: `${PREFIX}QA Updated ${ts()}`,
  }),

  timeEntry: () => ({
    description: `${PREFIX}Updated entry`,
    end: "2027-01-15T12:00:00Z",
  }),

  webhook: (workspaceId: string) => ({
    name: `${PREFIX}Upd${ts()}`.slice(0, 30),
    url: "https://httpbin.org/post",
    triggerSource: [workspaceId],
    triggerSourceType: "WORKSPACE_ID" as const,
    webhookEvent: "TIME_ENTRY_UPDATED" as const,
  }),

  holiday: () => ({
    name: `${PREFIX}Updated Holiday ${ts()}`,
    datePeriod: {
      startDate: "2027-12-26",
      endDate: "2027-12-26",
    },
    occursAnnually: false,
    everyoneIncludingNew: true,
  }),
};

export const PREFIX_PATTERN = PREFIX;
