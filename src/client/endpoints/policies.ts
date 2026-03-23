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

  /** Get all time-off policies in the workspace. */
  async getAll(): Promise<Policy[]> {
    return this.http.get<Policy[]>(
      `/workspaces/${this.workspaceId}/time-off/policies`
    );
  }

  /** Create a new time-off policy. */
  async create(body: CreatePolicyRequest): Promise<Policy> {
    return this.http.post<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies`,
      { body }
    );
  }

  /** Get a policy by ID. */
  async get(policyId: string): Promise<Policy> {
    return this.http.get<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`
    );
  }

  /** Update a policy. */
  async update(policyId: string, body: UpdatePolicyRequest): Promise<Policy> {
    return this.http.put<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`,
      { body }
    );
  }

  /** Update the status of a policy (archive/unarchive). */
  async updateStatus(policyId: string, body: ChangePolicyStatusRequest): Promise<Policy> {
    return this.http.patch<Policy>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`,
      { body }
    );
  }

  /** Delete a policy. */
  async delete(policyId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/time-off/policies/${policyId}`
    );
  }
}
