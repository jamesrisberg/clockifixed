import { HttpClient } from "../http.js";
import type {
  UpdateBalanceRequest,
} from "../../types/index.js";

export class BalanceEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get balances for a specific policy. */
  async getForPolicy(policyId: string): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/time-off/balance/policy/${policyId}`
    );
  }

  /** Update balances for a policy. */
  async update(policyId: string, body: UpdateBalanceRequest): Promise<unknown> {
    return this.http.patch(
      `/workspaces/${this.workspaceId}/time-off/balance/policy/${policyId}`,
      { body }
    );
  }

  /** Get balances for a specific user. */
  async getForUser(userId: string): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/time-off/balance/user/${userId}`
    );
  }
}
