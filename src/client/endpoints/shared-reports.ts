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

  /**
   * Get all shared reports in the workspace.
   *
   * @returns Array of shared reports
   */
  async getAll(): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/shared-reports`
    );
  }

  /**
   * Create a shared report.
   *
   * @param body - The shared report configuration
   * @returns The created shared report
   */
  async create(body: SharedReportRequest): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/shared-reports`,
      { body }
    );
  }

  /**
   * Get a shared report by ID. Note: this endpoint does not use the
   * workspace prefix in its URL path.
   *
   * @param id - The shared report ID
   * @returns The shared report
   */
  async getById(id: string): Promise<unknown> {
    return this.http.get(
      `/shared-reports/${id}`
    );
  }

  /**
   * Update a shared report.
   *
   * @param id - The shared report ID
   * @param body - The fields to update
   * @returns The updated shared report
   */
  async update(id: string, body: UpdateSharedReportRequest): Promise<unknown> {
    return this.http.put(
      `/workspaces/${this.workspaceId}/shared-reports/${id}`,
      { body }
    );
  }

  /**
   * Delete a shared report.
   *
   * @param id - The shared report ID
   */
  async delete(id: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/shared-reports/${id}`
    );
  }
}
