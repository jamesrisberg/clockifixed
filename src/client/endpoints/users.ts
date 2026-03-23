import { HttpClient } from "../http.js";
import type {
  UserDtoV1,
  MemberProfile,
  RoleDetails,
  UserCustomFieldValue,
  UploadFileResponse,
  GetUsersRequest,
  MemberProfileFullRequest,
  RoleRequest,
  UpsertUserCustomFieldRequestV1,
} from "../../types/index.js";

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  name?: string;
  email?: string;
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
}

export class UserEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get the currently authenticated user. */
  async getLoggedUser(): Promise<UserDtoV1> {
    return this.http.get<UserDtoV1>("/user");
  }

  /** Upload a profile image. */
  async uploadImage(body: unknown): Promise<UploadFileResponse> {
    return this.http.post<UploadFileResponse>("/file/image", { body });
  }

  /** Get all users in the workspace. */
  async getAll(params?: GetAllUsersParams): Promise<UserDtoV1[]> {
    return this.http.get<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              name: params.name,
              email: params.email,
              status: params.status,
            }
          : undefined,
      }
    );
  }

  /** Filter users with advanced criteria. */
  async filter(body: GetUsersRequest): Promise<UserDtoV1[]> {
    return this.http.post<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users/info`,
      { body }
    );
  }

  /** Get a member's profile in the workspace. */
  async getMemberProfile(userId: string): Promise<MemberProfile> {
    return this.http.get<MemberProfile>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}`
    );
  }

  /** Update a member's profile in the workspace. */
  async updateMemberProfile(
    userId: string,
    body: MemberProfileFullRequest
  ): Promise<MemberProfile> {
    return this.http.patch<MemberProfile>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}`,
      { body }
    );
  }

  /** Upsert a custom field value for a user. */
  async upsertCustomFieldValue(
    userId: string,
    customFieldId: string,
    body: UpsertUserCustomFieldRequestV1
  ): Promise<UserCustomFieldValue> {
    return this.http.put<UserCustomFieldValue>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}/custom-field/${customFieldId}`,
      { body }
    );
  }

  /** Get managers for a specific user. */
  async getManagers(userId: string): Promise<UserDtoV1[]> {
    return this.http.get<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users/${userId}/managers`
    );
  }

  /** Create a role assignment for a user. */
  async createRole(userId: string, body: RoleRequest): Promise<RoleDetails[]> {
    return this.http.post<RoleDetails[]>(
      `/workspaces/${this.workspaceId}/users/${userId}/roles`,
      { body }
    );
  }

  /** Delete a role assignment from a user. */
  async deleteRole(userId: string, body: RoleRequest): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/users/${userId}/roles`,
      { body }
    );
  }
}
