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

  /** Get all time-off requests (uses POST as a filter/search). */
  async getAll(body: GetTimeOffRequestsV1Request): Promise<TimeOffRequestsWithCount> {
    return this.http.post<TimeOffRequestsWithCount>(
      `/workspaces/${this.workspaceId}/time-off/requests`,
      { body }
    );
  }

  /** Create a time-off request for a policy. */
  async create(
    policyId: string,
    body: CreateTimeOffRequestV1Request
  ): Promise<TimeOffRequestFull> {
    return this.http.post<TimeOffRequestFull>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/requests`,
      { body }
    );
  }

  /** Create a time-off request for a specific user under a policy. */
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

  /** Delete a time-off request. */
  async delete(policyId: string, requestId: string): Promise<TimeOffRequest> {
    return this.http.delete<TimeOffRequest>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}/requests/${requestId}`
    );
  }

  /** Change the status of a time-off request (approve/reject/withdraw). */
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
