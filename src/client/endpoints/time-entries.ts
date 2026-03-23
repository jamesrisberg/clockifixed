import { HttpClient } from "../http.js";
import type {
  TimeEntryDtoImplV1,
  TimeEntryDtoV1,
  TimeEntryWithRates,
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

  /** Create a new time entry. */
  async create(body: CreateTimeEntryRequest): Promise<TimeEntry> {
    return this.http.post<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/time-entries`,
      { body }
    );
  }

  /** Get a time entry by ID. */
  async get(id: string): Promise<TimeEntry> {
    return this.http.get<TimeEntryWithRates>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`
    );
  }

  /** Update an existing time entry. */
  async update(
    id: string,
    body: UpdateTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.put<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`,
      { body }
    );
  }

  /** Delete a time entry. */
  async delete(id: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/time-entries/${id}`
    );
  }

  /** Update the invoiced status of time entries. */
  async updateInvoicedStatus(
    body: UpdateInvoicedStatusRequest
  ): Promise<void> {
    return this.http.patch<void>(
      `/workspaces/${this.workspaceId}/time-entries/invoiced`,
      { body }
    );
  }

  /** Get the currently running time entry for the authenticated user. */
  async getInProgress(): Promise<TimeEntry> {
    return this.http.get<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/time-entries/status/in-progress`
    );
  }

  /** Get time entries for a specific user. */
  async getForUser(
    userId: string,
    params?: GetTimeEntriesParams
  ): Promise<TimeEntry[]> {
    return this.http.get<TimeEntryWithRates[]>(
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

  /** Create a time entry for a specific user. */
  async createForUser(
    userId: string,
    body: CreateTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.post<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body }
    );
  }

  /** Stop a running timer for a user. */
  async stopTimer(
    userId: string,
    body: StopTimeEntryRequest
  ): Promise<TimeEntry> {
    return this.http.patch<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body }
    );
  }

  /** Delete specific time entries for a user by ID. */
  async deleteForUser(userId: string, timeEntryIds: string[]): Promise<TimeEntry[]> {
    return this.http.delete<TimeEntryDtoImplV1[]>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { params: { "time-entry-ids": timeEntryIds.join(",") } }
    );
  }


  /** Bulk edit time entries for a user. Accepts a single entry or an array. */
  async bulkEdit(
    userId: string,
    body: UpdateTimeEntryBulkRequest | UpdateTimeEntryBulkRequest[]
  ): Promise<TimeEntry[]> {
    const payload = Array.isArray(body) ? body : [body];
    return this.http.put<TimeEntryDtoV1[]>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries`,
      { body: payload }
    );
  }

  /** Duplicate an existing time entry. */
  async duplicate(
    userId: string,
    id: string
  ): Promise<TimeEntry> {
    return this.http.post<TimeEntryDtoImplV1>(
      `/workspaces/${this.workspaceId}/user/${userId}/time-entries/${id}/duplicate`
    );
  }
}
