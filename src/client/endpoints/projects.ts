import { HttpClient } from "../http.js";
import type {
  ProjectDtoImplV1,
  ProjectDtoV1,
  CreateProjectFromTemplate,
  ProjectRequest,
  UpdateProjectRequest,
  ProjectEstimateRequest,
  UpdateProjectMembershipsRequest,
  AddUsersToProjectRequest,
  PatchProjectTemplateRequest,
  CostRateRequestV1,
  HourlyRateRequestV1,
  Project,
} from "../../types/index.js";

export interface GetAllProjectsParams {
  page?: number;
  pageSize?: number;
  name?: string;
  archived?: boolean;
  billable?: boolean;
  clients?: string;
  "contains-client"?: boolean;
  "client-status"?: string;
  users?: string;
  "contains-users"?: boolean;
  "user-status"?: string;
  "is-template"?: boolean;
}

export class ProjectEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all projects in the workspace. Supports pagination and filtering
   * by name, archived status, billable flag, clients, users, and template status.
   *
   * @param params - Optional pagination and filter parameters
   * @returns Array of projects
   *
   * @example
   * ```ts
   * const active = await clockify.projects.getAll({
   *   archived: false,
   *   page: 1,
   *   pageSize: 50,
   * });
   * ```
   */
  async getAll(params?: GetAllProjectsParams): Promise<Project[]> {
    return this.http.get<ProjectDtoV1[]>(
      `/workspaces/${this.workspaceId}/projects`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              name: params.name,
              archived: params.archived,
              billable: params.billable,
              clients: params.clients,
              "contains-client": params["contains-client"],
              "client-status": params["client-status"],
              users: params.users,
              "contains-users": params["contains-users"],
              "user-status": params["user-status"],
              "is-template": params["is-template"],
            }
          : undefined,
      }
    );
  }

  /**
   * Create a new project.
   *
   * @param body - The project configuration
   * @returns The created project
   *
   * @example
   * ```ts
   * const project = await clockify.projects.create({
   *   name: "Website Redesign",
   *   clientId: "64a1234567890abcdef12345",
   *   color: "#2196F3",
   *   billable: true,
   *   isPublic: true,
   * });
   * ```
   */
  async create(body: ProjectRequest): Promise<Project> {
    return this.http.post<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects`,
      { body }
    );
  }

  /**
   * Create a project from an existing project template.
   *
   * @param body - The template reference and any overrides
   * @returns The created project
   */
  async createFromTemplate(
    body: CreateProjectFromTemplate
  ): Promise<Project> {
    return this.http.post<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/from-template`,
      { body }
    );
  }

  /**
   * Get a project by ID.
   *
   * @param projectId - The project ID
   * @returns The project
   */
  async get(projectId: string): Promise<Project> {
    return this.http.get<ProjectDtoV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`
    );
  }

  /**
   * Update an existing project.
   *
   * @param projectId - The project ID
   * @param body - The fields to update
   * @returns The updated project
   */
  async update(
    projectId: string,
    body: UpdateProjectRequest
  ): Promise<Project> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`,
      { body }
    );
  }

  /**
   * Delete a project. The project must be archived first.
   *
   * @param projectId - The project ID
   * @returns The deleted project
   */
  async delete(projectId: string): Promise<Project> {
    return this.http.delete<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`
    );
  }

  /**
   * Update the time or budget estimate for a project.
   *
   * @param projectId - The project ID
   * @param body - The estimate configuration
   * @returns The updated project
   */
  async updateEstimate(
    projectId: string,
    body: ProjectEstimateRequest
  ): Promise<Project> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/estimate`,
      { body }
    );
  }

  /**
   * Update the membership list for a project.
   *
   * @param projectId - The project ID
   * @param body - The membership configuration
   * @returns The updated project
   */
  async updateMemberships(
    projectId: string,
    body: UpdateProjectMembershipsRequest
  ): Promise<Project> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/memberships`,
      { body }
    );
  }

  /**
   * Add users to a project.
   *
   * @param projectId - The project ID
   * @param body - The user IDs to add
   */
  async addUsers(
    projectId: string,
    body: AddUsersToProjectRequest
  ): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/memberships`,
      { body }
    );
  }

  /**
   * Set or unset the template flag on a project.
   *
   * @param projectId - The project ID
   * @param body - The template flag value
   * @returns The updated project
   */
  async updateTemplate(
    projectId: string,
    body: PatchProjectTemplateRequest
  ): Promise<Project> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/template`,
      { body }
    );
  }

  /**
   * Set the cost rate for a specific user on a project.
   *
   * @param projectId - The project ID
   * @param userId - The user ID
   * @param body - The cost rate amount (in cents) and optional effective date
   * @returns The updated project
   */
  async setUserCostRate(
    projectId: string,
    userId: string,
    body: CostRateRequestV1
  ): Promise<Project> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/users/${userId}/cost-rate`,
      { body }
    );
  }

  /**
   * Set the hourly rate for a specific user on a project.
   *
   * @param projectId - The project ID
   * @param userId - The user ID
   * @param body - The hourly rate amount (in cents) and optional effective date
   * @returns The updated project
   */
  async setUserHourlyRate(
    projectId: string,
    userId: string,
    body: HourlyRateRequestV1
  ): Promise<Project> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/users/${userId}/hourly-rate`,
      { body }
    );
  }
}
