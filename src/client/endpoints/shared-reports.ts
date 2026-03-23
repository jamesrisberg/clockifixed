import { HttpClient } from "../http.js";
import type {
  SharedReportRequest,
  UpdateSharedReportRequest,
} from "../../types/index.js";

export class SharedReportEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all shared reports in the workspace. */
  async getAll(): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/shared-reports`
    );
  }

  /** Create a shared report. */
  async create(body: SharedReportRequest): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/shared-reports`,
      { body }
    );
  }

  /** Get a shared report by ID (no workspace in path). */
  async getById(id: string): Promise<unknown> {
    return this.http.get(
      `/shared-reports/${id}`
    );
  }

  /** Update a shared report. */
  async update(id: string, body: UpdateSharedReportRequest): Promise<unknown> {
    return this.http.put(
      `/workspaces/${this.workspaceId}/shared-reports/${id}`,
      { body }
    );
  }

  /** Delete a shared report. */
  async delete(id: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/shared-reports/${id}`
    );
  }
}
