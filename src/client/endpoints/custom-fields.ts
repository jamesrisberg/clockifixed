import { HttpClient } from "../http.js";
import type {
  CustomField,
  CustomFieldRequest,
  UpdateCustomFieldRequestV1,
  CustomFieldProjectDefaultValuesRequest,
} from "../../types/index.js";

export class CustomFieldEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all custom fields in the workspace. */
  async getAll(): Promise<CustomField[]> {
    return this.http.get<CustomField[]>(
      `/workspaces/${this.workspaceId}/custom-fields`
    );
  }

  /** Create a new custom field. */
  async create(body: CustomFieldRequest): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/custom-fields`,
      { body }
    );
  }

  /** Update a custom field. */
  async update(
    customFieldId: string,
    body: UpdateCustomFieldRequestV1
  ): Promise<CustomField> {
    return this.http.put<CustomField>(
      `/workspaces/${this.workspaceId}/custom-fields/${customFieldId}`,
      { body }
    );
  }

  /** Delete a custom field. */
  async delete(customFieldId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/custom-fields/${customFieldId}`
    );
  }

  /** Get custom fields for a project. */
  async getForProject(projectId: string): Promise<CustomField[]> {
    return this.http.get<CustomField[]>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/custom-fields`
    );
  }

  /** Remove a custom field from a project. */
  async removeFromProject(
    projectId: string,
    customFieldId: string
  ): Promise<CustomField> {
    return this.http.delete<CustomField>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`
    );
  }

  /** Update the project default value for a custom field. */
  async updateProjectDefault(
    projectId: string,
    customFieldId: string,
    body: CustomFieldProjectDefaultValuesRequest
  ): Promise<CustomField> {
    return this.http.patch<CustomField>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`,
      { body }
    );
  }
}
