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

  /** Get all projects in the workspace. */
  async getAll(params?: GetAllProjectsParams): Promise<ProjectDtoV1[]> {
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

  /** Create a new project. */
  async create(body: ProjectRequest): Promise<ProjectDtoImplV1> {
    return this.http.post<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects`,
      { body }
    );
  }

  /** Create a project from a template. */
  async createFromTemplate(
    body: CreateProjectFromTemplate
  ): Promise<ProjectDtoImplV1> {
    return this.http.post<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/from-template`,
      { body }
    );
  }

  /** Get a project by ID. */
  async get(projectId: string): Promise<ProjectDtoV1> {
    return this.http.get<ProjectDtoV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`
    );
  }

  /** Update an existing project. */
  async update(
    projectId: string,
    body: UpdateProjectRequest
  ): Promise<ProjectDtoImplV1> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`,
      { body }
    );
  }

  /** Delete a project. */
  async delete(projectId: string): Promise<ProjectDtoImplV1> {
    return this.http.delete<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}`
    );
  }

  /** Update the time/budget estimate for a project. */
  async updateEstimate(
    projectId: string,
    body: ProjectEstimateRequest
  ): Promise<ProjectDtoImplV1> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/estimate`,
      { body }
    );
  }

  /** Update project memberships. */
  async updateMemberships(
    projectId: string,
    body: UpdateProjectMembershipsRequest
  ): Promise<ProjectDtoImplV1> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/memberships`,
      { body }
    );
  }

  /** Add users to a project. */
  async addUsers(
    projectId: string,
    body: AddUsersToProjectRequest
  ): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/memberships`,
      { body }
    );
  }

  /** Update whether a project is a template. */
  async updateTemplate(
    projectId: string,
    body: PatchProjectTemplateRequest
  ): Promise<ProjectDtoImplV1> {
    return this.http.patch<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/template`,
      { body }
    );
  }

  /** Set the cost rate for a user on a project. */
  async setUserCostRate(
    projectId: string,
    userId: string,
    body: CostRateRequestV1
  ): Promise<ProjectDtoImplV1> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/users/${userId}/cost-rate`,
      { body }
    );
  }

  /** Set the hourly rate for a user on a project. */
  async setUserHourlyRate(
    projectId: string,
    userId: string,
    body: HourlyRateRequestV1
  ): Promise<ProjectDtoImplV1> {
    return this.http.put<ProjectDtoImplV1>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/users/${userId}/hourly-rate`,
      { body }
    );
  }
}
