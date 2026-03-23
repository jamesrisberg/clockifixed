import { HttpClient } from "../http.js";
import type {
  ApprovalDetails,
  ApprovalRequest,
  CreateApprovalRequest,
  UpdateApprovalRequest,
} from "../../types/index.js";

export class ApprovalEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all approval requests in the workspace. */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<ApprovalDetails[]> {
    return this.http.get<ApprovalDetails[]>(
      `/workspaces/${this.workspaceId}/approval-requests`,
      { params }
    );
  }

  /** Create an approval request. */
  async create(body: CreateApprovalRequest): Promise<ApprovalRequest> {
    return this.http.post<ApprovalRequest>(
      `/workspaces/${this.workspaceId}/approval-requests`,
      { body }
    );
  }

  /** Create an approval request for a specific user. */
  async createForUser(userId: string, body: CreateApprovalRequest): Promise<ApprovalRequest> {
    return this.http.post<ApprovalRequest>(
      `/workspaces/${this.workspaceId}/approval-requests/users/${userId}`,
      { body }
    );
  }

  /** Resubmit entries for approval. */
  async resubmit(body: Record<string, unknown>): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/approval-requests/resubmit-entries-for-approval`,
      { body }
    );
  }

  /** Resubmit entries for approval for a specific user. */
  async resubmitForUser(userId: string, body: Record<string, unknown>): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/approval-requests/users/${userId}/resubmit-entries-for-approval`,
      { body }
    );
  }

  /** Update the status of an approval request. */
  async updateStatus(
    approvalRequestId: string,
    body: UpdateApprovalRequest
  ): Promise<ApprovalRequest> {
    return this.http.patch<ApprovalRequest>(
      `/workspaces/${this.workspaceId}/approval-requests/${approvalRequestId}`,
      { body }
    );
  }
}
