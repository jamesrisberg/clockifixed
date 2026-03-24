import { HttpClient } from "../http.js";
import type {
  CreateTimeEntryRequest,
  UpdateTimeEntryRequest,
  UpdateInvoicedStatusRequest,
  StopTimeEntryRequest,
  UpdateTimeEntryBulkRequest,
  TimeEntry,
} from "../../types/index.js";

export interface GetTimeEntriesParams {
  page?: number;
  pageSize?: number;
  description?: string;
  start?: string;
  end?: string;
  project?: string;
  task?: string;
  tags?: string;
  "project-required"?: boolean;
  "task-required"?: boolean;
  "in-progress"?: boolean;
}

export class TimeEntryEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Create a new time entry in the workspace.
   *
   * @param body - The time entry to create
   * @returns The created time entry
   *
   * @example
   * ```ts
   * const entry = await clockify.timeEntries.create({
   *   start: "2026-03-23T09:00:00Z",
   *   projectId: "64a1234567890abcdef12345",
   *   description: "Working on documentation",
   *   billable: true,
   * });
   * ```
   */
  async create(body: CreateTimeEntryRequest): Promise<TimeEntry> {
    return this.http.post<TimeEntry>(
      `/workspaces/${this.workspaceId}/time-entries`,
      { body }
    );
  }

  /**
   * Get a time entry by ID. Includes `costRate` and `hourlyRate` fields
   * that are not present on other response shapes.
   *
   * @param id - The time entry ID
   * @returns The time entry with rate details
   */
  async get(id: string): Promise<TimeEntry> {
    return this.http.get<TimeEntry>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`
    );
  }

  /**
   * Update an existing time entry.
   *
   * @param id - The time entry ID
   * @param body - The fields to update
   * @returns The updated time entry
   */
  async update(
    id: string,
    body: UpdateTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.put<TimeEntry>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`,
      { body }
    );
  }

  /**
   * Delete a time entry.
   *
   * @param id - The time entry ID
   */
  async delete(id: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`
    );
  }

  /**
   * Mark time entries as invoiced or not invoiced.
   *
   * @param body - The time entry IDs and invoiced status to set
   */
  async updateInvoicedStatus(
    body: UpdateInvoicedStatusRequest
  ): Promise<void> {
    return this.http.patch<void>(
      `/workspaces/${this.workspaceId}/time-entries/invoiced`,
      { body }
    );
  }

  /**
   * Get the currently running time entry for the authenticated user.
   *
   * @returns The in-progress time entry, or throws if none is running
   *
   * @example
   * ```ts
   * const running = await clockify.timeEntries.getInProgress();
   * console.log(running.description, running.timeInterval.start);
   * ```
   */
  async getInProgress(): Promise<TimeEntry> {
    return this.http.get<TimeEntry>(
      `/workspaces/${this.workspaceId}/time-entries/status/in-progress`
    );
  }

  /**
   * Get time entries for a specific user. Supports pagination and filtering
   * by date range, project, task, tags, and description.
   *
   * @param userId - The user ID to fetch entries for
   * @param params - Optional pagination and filter parameters
   * @returns Array of time entries for the user
   *
   * @example
   * ```ts
   * const entries = await clockify.timeEntries.getForUser(userId, {
   *   start: "2026-03-01T00:00:00Z",
   *   end: "2026-03-31T23:59:59Z",
   *   page: 1,
   *   pageSize: 50,
   * });
   * ```
   */
  async getForUser(
    userId: string,
    params?: GetTimeEntriesParams
  ): Promise<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              description: params.description,
              start: params.start,
              end: params.end,
              project: params.project,
              task: params.task,
              tags: params.tags,
              "project-required": params["project-required"],
              "task-required": params["task-required"],
              "in-progress": params["in-progress"],
            }
          : undefined,
      }
    );
  }

  /**
   * Create a time entry on behalf of a specific user. Requires workspace admin permissions.
   *
   * @param userId - The user ID to create the entry for
   * @param body - The time entry to create
   * @returns The created time entry
   */
  async createForUser(
    userId: string,
    body: CreateTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.post<TimeEntry>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body }
    );
  }

  /**
   * Stop a running timer for a user by setting an end time.
   *
   * @param userId - The user ID whose timer to stop
   * @param body - The stop request with the end timestamp
   * @returns The stopped time entry with the final time interval
   *
   * @example
   * ```ts
   * const stopped = await clockify.timeEntries.stopTimer(userId, {
   *   end: "2026-03-23T17:00:00Z",
   * });
   * ```
   */
  async stopTimer(
    userId: string,
    body: StopTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.patch<TimeEntry>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body }
    );
  }

  /**
   * Delete specific time entries for a user by their IDs.
   *
   * @param userId - The user ID who owns the entries
   * @param timeEntryIds - Array of time entry IDs to delete
   * @returns The deleted time entries
   */
  async deleteForUser(userId: string, timeEntryIds: string[]): Promise<TimeEntry[]> {
    return this.http.delete<TimeEntry[]>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { params: { "time-entry-ids": timeEntryIds.join(",") } }
    );
  }


  /**
   * Bulk edit time entries for a user. Accepts a single update request
   * or an array — single values are automatically wrapped in an array.
   *
   * @param userId - The user ID who owns the entries
   * @param body - One or more bulk update requests
   * @returns The updated time entries
   *
   * @example
   * ```ts
   * const updated = await clockify.timeEntries.bulkEdit(userId, {
   *   timeEntryIds: ["id1", "id2"],
   *   changeFields: [{ field: "BILLABLE", value: "true" }],
   * });
   * ```
   */
  async bulkEdit(
    userId: string,
    body: UpdateTimeEntryBulkRequest | UpdateTimeEntryBulkRequest[]
  ): Promise<TimeEntry[]> {
    const payload = Array.isArray(body) ? body : [body];
    return this.http.put<TimeEntry[]>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body: payload }
    );
  }

  /**
   * Duplicate an existing time entry, creating an identical copy.
   *
   * @param userId - The user ID who owns the entry
   * @param id - The time entry ID to duplicate
   * @returns The newly created duplicate time entry
   */
  async duplicate(
    userId: string,
    id: string
  ): Promise<TimeEntry> {
    return this.http.post<TimeEntry>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries/${id}/duplicate`
    );
  }
}
