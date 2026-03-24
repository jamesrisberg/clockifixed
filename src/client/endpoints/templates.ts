import { HttpClient } from "../http.js";
import type {
  Template,
  TemplateRequest,
  TemplatePatchRequest,
  TemplateResult,
} from "../../types/index.js";

export class TemplateEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all templates in the workspace.
   *
   * @returns Array of templates
   * @deprecated Clockify has deprecated the templates API.
   */
  async getAll(): Promise<Template[]> {
    return this.http.get<Template[]>(
      `/workspaces/${this.workspaceId}/templates`
    );
  }

  /**
   * Create one or more templates. Accepts a single template or an array —
   * single values are automatically wrapped in an array.
   *
   * @param body - One or more template definitions
   * @returns The created templates
   * @deprecated Clockify has deprecated the templates API.
   */
  async create(body: TemplateRequest | TemplateRequest[]): Promise<TemplateResult[]> {
    const payload = Array.isArray(body) ? body : [body];
    return this.http.post<TemplateResult[]>(
      `/workspaces/${this.workspaceId}/templates`,
      { body: payload }
    );
  }

  /**
   * Get a template by ID.
   *
   * @param templateId - The template ID
   * @returns The template
   * @deprecated Clockify has deprecated the templates API.
   */
  async get(templateId: string): Promise<Template> {
    return this.http.get<Template>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`
    );
  }

  /**
   * Update a template.
   *
   * @param templateId - The template ID
   * @param body - The fields to update
   * @returns The updated template
   * @deprecated Clockify has deprecated the templates API.
   */
  async update(templateId: string, body: TemplatePatchRequest): Promise<TemplateResult> {
    return this.http.patch<TemplateResult>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`,
      { body }
    );
  }

  /**
   * Delete a template.
   *
   * @param templateId - The template ID
   * @returns The deleted template
   * @deprecated Clockify has deprecated the templates API.
   */
  async delete(templateId: string): Promise<TemplateResult> {
    return this.http.delete<TemplateResult>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`
    );
  }
}
