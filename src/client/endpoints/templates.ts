import { HttpClient } from "../http.js";
import type {
  Template,
  TemplateDtoImpl,
  TemplateRequest,
  TemplatePatchRequest,
} from "../../types/index.js";

export class TemplateEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all templates in the workspace. */
  async getAll(): Promise<Template[]> {
    return this.http.get<Template[]>(
      `/workspaces/${this.workspaceId}/templates`
    );
  }

  /** Create new templates. Accepts a single template or an array. */
  async create(body: TemplateRequest | TemplateRequest[]): Promise<TemplateDtoImpl[]> {
    const payload = Array.isArray(body) ? body : [body];
    return this.http.post<TemplateDtoImpl[]>(
      `/workspaces/${this.workspaceId}/templates`,
      { body: payload }
    );
  }

  /** Get a template by ID. */
  async get(templateId: string): Promise<Template> {
    return this.http.get<Template>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`
    );
  }

  /** Update a template. */
  async update(templateId: string, body: TemplatePatchRequest): Promise<TemplateDtoImpl> {
    return this.http.patch<TemplateDtoImpl>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`,
      { body }
    );
  }

  /** Delete a template. */
  async delete(templateId: string): Promise<TemplateDtoImpl> {
    return this.http.delete<TemplateDtoImpl>(
      `/workspaces/${this.workspaceId}/templates/${templateId}`
    );
  }
}
