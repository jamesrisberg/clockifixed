import { HttpClient } from "../http.js";
import type {
  Workspace,
  AddUserToWorkspaceRequest,
  CostRateRequest,
  CreateWorkspaceRequest,
  HourlyRateRequest,
  UpdateUserStatusRequest,
} from "../../types/index.js";

export class WorkspaceEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all workspaces the authenticated user belongs to.
   * Does not require a workspace ID.
   *
   * @returns Array of workspaces
   */
  async getAll(): Promise<Workspace[]> {
    return this.http.get<Workspace[]>("/workspaces");
  }

  /**
   * Create a new workspace. Does not require a workspace ID.
   *
   * @param body - The workspace name and optional organization ID
   * @returns The created workspace
   */
  async create(body: CreateWorkspaceRequest): Promise<Workspace> {
    return this.http.post<Workspace>("/workspaces", { body });
  }

  /**
   * Get the current workspace by its configured workspace ID.
   *
   * @returns The workspace
   */
  async get(): Promise<Workspace> {
    return this.http.get<Workspace>(`/workspaces/${this.workspaceId}`);
  }

  /**
   * Set the default cost rate for the workspace. Applied to users
   * who don't have a user-specific cost rate.
   *
   * @param body - The cost rate amount (in cents) and optional effective date
   * @returns The updated workspace
   */
  async setCostRate(body: CostRateRequest): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/cost-rate`,
      { body }
    );
  }

  /**
   * Set the default hourly rate for the workspace. Applied to users
   * who don't have a user-specific hourly rate.
   *
   * @param body - The hourly rate amount (in cents) and optional effective date
   * @returns The updated workspace
   */
  async setHourlyRate(body: HourlyRateRequest): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/hourly-rate`,
      { body }
    );
  }

  /**
   * Invite a user to the workspace by email address.
   *
   * @param body - The email address to invite
   * @returns The updated workspace
   *
   * @example
   * ```ts
   * await clockify.workspaces.addUsers({ email: "new@example.com" });
   * ```
   */
  async addUsers(body: AddUserToWorkspaceRequest): Promise<Workspace> {
    return this.http.post<Workspace>(
      `/workspaces/${this.workspaceId}/users`,
      { body }
    );
  }

  /**
   * Activate or deactivate a user within the workspace.
   *
   * @param userId - The user ID
   * @param body - The status to set (`"ACTIVE"` or `"INACTIVE"`)
   * @returns The updated workspace
   */
  async updateUserStatus(
    userId: string,
    body: UpdateUserStatusRequest
  ): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/users/${userId}`,
      { body }
    );
  }

  /**
   * Set the cost rate for a specific user in the workspace.
   *
   * @param userId - The user ID
   * @param body - The cost rate amount (in cents) and optional effective date
   * @returns The updated workspace
   */
  async setUserCostRate(
    userId: string,
    body: CostRateRequest
  ): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/users/${userId}/cost-rate`,
      { body }
    );
  }

  /**
   * Set the hourly rate for a specific user in the workspace.
   *
   * @param userId - The user ID
   * @param body - The hourly rate amount (in cents) and optional effective date
   * @returns The updated workspace
   */
  async setUserHourlyRate(
    userId: string,
    body: HourlyRateRequest
  ): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/users/${userId}/hourly-rate`,
      { body }
    );
  }
}
