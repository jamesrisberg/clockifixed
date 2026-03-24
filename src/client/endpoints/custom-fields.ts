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

  /**
   * Get all custom fields defined in the workspace.
   *
   * @returns Array of custom fields
   */
  async getAll(): Promise<CustomField[]> {
    return this.http.get<CustomField[]>(
      `/workspaces/${this.workspaceId}/custom-fields`
    );
  }

  /**
   * Create a new custom field in the workspace.
   *
   * @param body - The field definition (name, type, allowed values, etc.)
   *
   * @example
   * ```ts
   * await clockify.customFields.create({
   *   name: "Department",
   *   type: "DROPDOWN_SINGLE",
   *   entityType: "TIMEENTRY",
   *   allowedValues: ["Engineering", "Design", "Marketing"],
   * });
   * ```
   */
  async create(body: CustomFieldRequest): Promise<void> {
    return this.http.post<void>(
      `/workspaces/${this.workspaceId}/custom-fields`,
      { body }
    );
  }

  /**
   * Update a custom field's definition.
   *
   * @param customFieldId - The custom field ID
   * @param body - The fields to update
   * @returns The updated custom field
   */
  async update(
    customFieldId: string,
    body: UpdateCustomFieldRequestV1
  ): Promise<CustomField> {
    return this.http.put<CustomField>(
      `/workspaces/${this.workspaceId}/custom-fields/${customFieldId}`,
      { body }
    );
  }

  /**
   * Delete a custom field from the workspace.
   *
   * @param customFieldId - The custom field ID
   */
  async delete(customFieldId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/custom-fields/${customFieldId}`
    );
  }

  /**
   * Get the custom fields configured for a specific project.
   *
   * @param projectId - The project ID
   * @returns Array of custom fields on this project
   */
  async getForProject(projectId: string): Promise<CustomField[]> {
    return this.http.get<CustomField[]>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/custom-fields`
    );
  }

  /**
   * Remove a custom field from a project (does not delete the field itself).
   *
   * @param projectId - The project ID
   * @param customFieldId - The custom field ID to remove
   * @returns The removed custom field
   */
  async removeFromProject(
    projectId: string,
    customFieldId: string
  ): Promise<CustomField> {
    return this.http.delete<CustomField>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`
    );
  }

  /**
   * Set or update the default value for a custom field on a specific project.
   *
   * @param projectId - The project ID
   * @param customFieldId - The custom field ID
   * @param body - The default value configuration
   * @returns The updated custom field
   */
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
