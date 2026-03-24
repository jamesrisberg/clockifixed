import { HttpClient } from "../http.js";
import type {
  TimeOffRequestsWithCount,
  TimeOffRequestFull,
  TimeOffRequest,
  GetTimeOffRequestsV1Request,
  CreateTimeOffRequestV1Request,
  StatusTimeOffRequestV1Request,
} from "../../types/index.js";

export class TimeOffEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get time-off requests using a POST body as a filter. Supports filtering
   * by date range, status, and pagination.
   *
   * @param body - The filter criteria (start, end, statuses, page, pageSize)
   * @returns Time-off requests with total count
   */
  async getAll(body: GetTimeOffRequestsV1Request): Promise<TimeOffRequestsWithCount> {
    return this.http.post<TimeOffRequestsWithCount>(
      `/workspaces/${this.workspaceId}/time-off/requests`,
      { body }
    );
  }

  /**
   * Create a time-off request under a policy for the authenticated user.
   *
   * @param policyId - The time-off policy ID
   * @param body - The request details (date period, optional note)
   * @returns The created time-off request
   */
  async create(
    policyId: string,
    body: CreateTimeOffRequestV1Request
  ): Promise<TimeOffRequestFull> {
    return this.http.post<TimeOffRequestFull>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/requests`,
      { body }
    );
  }

  /**
   * Create a time-off request on behalf of a specific user under a policy.
   *
   * @param policyId - The time-off policy ID
   * @param userId - The user ID
   * @param body - The request details (date period, optional note)
   * @returns The created time-off request
   */
  async createForUser(
    policyId: string,
    userId: string,
    body: CreateTimeOffRequestV1Request
  ): Promise<TimeOffRequestFull> {
    return this.http.post<TimeOffRequestFull>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/users/${userId}/requests`,
      { body }
    );
  }

  /**
   * Delete a time-off request.
   *
   * @param policyId - The time-off policy ID
   * @param requestId - The time-off request ID
   * @returns The deleted request
   */
  async delete(policyId: string, requestId: string): Promise<TimeOffRequest> {
    return this.http.delete<TimeOffRequest>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/requests/${requestId}`
    );
  }

  /**
   * Approve, reject, or withdraw a time-off request.
   *
   * @param policyId - The time-off policy ID
   * @param requestId - The time-off request ID
   * @param body - The new status and optional note
   * @returns The updated request
   */
  async changeStatus(
    policyId: string,
    requestId: string,
    body: StatusTimeOffRequestV1Request
  ): Promise<TimeOffRequest> {
    return this.http.patch<TimeOffRequest>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/requests/${requestId}`,
      { body }
    );
  }
}
