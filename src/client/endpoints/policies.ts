import { HttpClient } from "../http.js";
import type {
  Policy,
  CreatePolicyRequest,
  UpdatePolicyRequest,
  ChangePolicyStatusRequest,
} from "../../types/index.js";

export class PolicyEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all time-off policies in the workspace.
   *
   * @returns Array of policies
   */
  async getAll(): Promise<Policy[]> {
    return this.http.get<Policy[]>(
      `/workspaces/${this.workspaceId}/time-off/policies`
    );
  }

  /**
   * Create a new time-off policy.
   *
   * @param body - The policy configuration (name, approval rules, time unit, etc.)
   * @returns The created policy
   *
   * @example
   * ```ts
   * const policy = await clockify.policies.create({
   *   name: "Vacation",
   *   approve: { requiresApproval: true },
   *   timeUnit: "DAYS",
   *   allowHalfDay: true,
   * });
   * ```
   */
  async create(body: CreatePolicyRequest): Promise<Policy> {
    return this.http.post<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies`,
      { body }
    );
  }

  /**
   * Get a time-off policy by ID.
   *
   * @param policyId - The policy ID
   * @returns The policy
   */
  async get(policyId: string): Promise<Policy> {
    return this.http.get<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`
    );
  }

  /**
   * Update a time-off policy.
   *
   * @param policyId - The policy ID
   * @param body - The fields to update
   * @returns The updated policy
   */
  async update(policyId: string, body: UpdatePolicyRequest): Promise<Policy> {
    return this.http.put<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`,
      { body }
    );
  }

  /**
   * Archive or unarchive a time-off policy.
   *
   * @param policyId - The policy ID
   * @param body - The new status
   * @returns The updated policy
   */
  async updateStatus(policyId: string, body: ChangePolicyStatusRequest): Promise<Policy> {
    return this.http.patch<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`,
      { body }
    );
  }

  /**
   * Delete a time-off policy. Must be archived first.
   *
   * @param policyId - The policy ID
   */
  async delete(policyId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`
    );
  }
}
