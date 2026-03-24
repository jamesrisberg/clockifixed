import { HttpClient } from "../http.js";
import type {
  Task,
  TaskRequestV1,
  UpdateTaskRequest,
  CostRateRequestV1,
  HourlyRateRequestV1,
} from "../../types/index.js";

export interface GetAllTasksParams {
  page?: number;
  pageSize?: number;
  name?: string;
  "is-active"?: boolean;
}

export class TaskEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all tasks for a project. Supports pagination and filtering
   * by name and active status.
   *
   * @param projectId - The project ID
   * @param params - Optional pagination and filter parameters
   * @returns Array of tasks
   *
   * @example
   * ```ts
   * const tasks = await clockify.tasks.getAll(projectId, {
   *   "is-active": true,
   *   pageSize: 100,
   * });
   * ```
   */
  async getAll(
    projectId: string,
    params?: GetAllTasksParams
  ): Promise<Task[]> {
    return this.http.get<Task[]>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              name: params.name,
              "is-active": params["is-active"],
            }
          : undefined,
      }
    );
  }

  /**
   * Create a new task in a project.
   *
   * @param projectId - The project ID
   * @param body - The task configuration
   * @returns The created task
   *
   * @example
   * ```ts
   * const task = await clockify.tasks.create(projectId, {
   *   name: "Design review",
   *   assigneeIds: [userId],
   *   estimate: "PT4H",
   * });
   * ```
   */
  async create(projectId: string, body: TaskRequestV1): Promise<Task> {
    return this.http.post<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks`,
      { body }
    );
  }

  /**
   * Get a task by ID within a project.
   *
   * @param projectId - The project ID
   * @param taskId - The task ID
   * @returns The task
   */
  async get(projectId: string, taskId: string): Promise<Task> {
    return this.http.get<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  }

  /**
   * Update an existing task.
   *
   * @param projectId - The project ID
   * @param taskId - The task ID
   * @param body - The fields to update
   * @returns The updated task
   */
  async update(
    projectId: string,
    taskId: string,
    body: UpdateTaskRequest
  ): Promise<Task> {
    return this.http.put<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}`,
      { body }
    );
  }

  /**
   * Delete a task from a project. The task must be marked as DONE first.
   *
   * @param projectId - The project ID
   * @param taskId - The task ID
   * @returns The deleted task
   */
  async delete(projectId: string, taskId: string): Promise<Task> {
    return this.http.delete<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  }

  /**
   * Set the cost rate for a task.
   *
   * @param projectId - The project ID
   * @param taskId - The task ID
   * @param body - The cost rate amount (in cents) and optional effective date
   * @returns The updated task
   */
  async setCostRate(
    projectId: string,
    taskId: string,
    body: CostRateRequestV1
  ): Promise<Task> {
    return this.http.put<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}/cost-rate`,
      { body }
    );
  }

  /**
   * Set the hourly rate for a task.
   *
   * @param projectId - The project ID
   * @param taskId - The task ID
   * @param body - The hourly rate amount (in cents) and optional effective date
   * @returns The updated task
   */
  async setHourlyRate(
    projectId: string,
    taskId: string,
    body: HourlyRateRequestV1
  ): Promise<Task> {
    return this.http.put<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}/hourly-rate`,
      { body }
    );
  }
}
