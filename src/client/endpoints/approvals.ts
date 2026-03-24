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

  /**
   * Get all approval requests in the workspace.
   *
   * @param params - Optional query parameters for filtering
   * @returns Array of approval request details including tracked/billable time
   */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<ApprovalDetails[]> {
    return this.http.get<ApprovalDetails[]>(
      `/workspaces/${this.workspaceId}/approval-requests`,
      { params }
    );
  }

  /**
   * Create an approval request for the authenticated user.
   *
   * @param body - The approval period start and optional period type (WEEKLY, SEMI_MONTHLY, MONTHLY)
   * @returns The created approval request
   */
  async create(body: CreateApprovalRequest): Promise<ApprovalRequest> {
    return this.http.post<ApprovalRequest>(
      `/workspaces/${this.workspaceId}/approval-requests`,
      { body }
    );
  }

  /**
   * Create an approval request on behalf of a specific user.
   *
   * @param userId - The user ID
   * @param body - The approval period start and optional period type
   * @returns The created approval request
   */
  async createForUser(userId: string, body: CreateApprovalRequest): Promise<ApprovalRequest> {
    return this.http.post<ApprovalRequest>(
      `/workspaces/${this.workspaceId}/approval-requests/users/${userId}`,
      { body }
    );
  }

  /**
   * Resubmit time entries for approval after a previous rejection or withdrawal.
   *
   * @param body - The resubmission criteria
   */
  async resubmit(body: Record<string, unknown>): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/approval-requests/resubmit-entries-for-approval`,
      { body }
    );
  }

  /**
   * Resubmit time entries for approval on behalf of a specific user.
   *
   * @param userId - The user ID
   * @param body - The resubmission criteria
   */
  async resubmitForUser(userId: string, body: Record<string, unknown>): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/approval-requests/users/${userId}/resubmit-entries-for-approval`,
      { body }
    );
  }

  /**
   * Update the status of an approval request (approve, reject, or withdraw).
   *
   * @param approvalRequestId - The approval request ID
   * @param body - The new state and optional note
   * @returns The updated approval request
   */
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
