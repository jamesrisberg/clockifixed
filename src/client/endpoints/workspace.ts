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

  /** Get all workspaces the authenticated user belongs to. */
  async getAll(): Promise<Workspace[]> {
    return this.http.get<Workspace[]>("/workspaces");
  }

  /** Create a new workspace. */
  async create(body: CreateWorkspaceRequest): Promise<Workspace> {
    return this.http.post<Workspace>("/workspaces", { body });
  }

  /** Get the current workspace. */
  async get(): Promise<Workspace> {
    return this.http.get<Workspace>(`/workspaces/${this.workspaceId}`);
  }

  /** Set the workspace-level cost rate. */
  async setCostRate(body: CostRateRequest): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/cost-rate`,
      { body }
    );
  }

  /** Set the workspace-level hourly rate. */
  async setHourlyRate(body: HourlyRateRequest): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/hourly-rate`,
      { body }
    );
  }

  /** Add users to the workspace by email. */
  async addUsers(body: AddUserToWorkspaceRequest): Promise<Workspace> {
    return this.http.post<Workspace>(
      `/workspaces/${this.workspaceId}/users`,
      { body }
    );
  }

  /** Update a user's status (active/inactive) within the workspace. */
  async updateUserStatus(
    userId: string,
    body: UpdateUserStatusRequest
  ): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/users/${userId}`,
      { body }
    );
  }

  /** Set the cost rate for a specific user in the workspace. */
  async setUserCostRate(
    userId: string,
    body: CostRateRequest
  ): Promise<Workspace> {
    return this.http.put<Workspace>(
      `/workspaces/${this.workspaceId}/users/${userId}/cost-rate`,
      { body }
    );
  }

  /** Set the hourly rate for a specific user in the workspace. */
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
