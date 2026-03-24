import { HttpClient } from "../http.js";
import type {
  UpdateBalanceRequest,
} from "../../types/index.js";

export class BalanceEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get time-off balances for all users on a specific policy.
   *
   * @param policyId - The time-off policy ID
   * @returns The balance data for each user on this policy
   */
  async getForPolicy(policyId: string): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/time-off/balance/policy/${policyId}`
    );
  }

  /**
   * Update time-off balances for users on a policy.
   *
   * @param policyId - The time-off policy ID
   * @param body - The balance adjustments
   * @returns The updated balance data
   */
  async update(policyId: string, body: UpdateBalanceRequest): Promise<unknown> {
    return this.http.patch(
      `/workspaces/${this.workspaceId}/time-off/balance/policy/${policyId}`,
      { body }
    );
  }

  /**
   * Get all time-off policy balances for a specific user.
   *
   * @param userId - The user ID
   * @returns The user's balance across all policies
   */
  async getForUser(userId: string): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/time-off/balance/user/${userId}`
    );
  }
}
