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

  /** Get all tasks for a project. */
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

  /** Create a new task in a project. */
  async create(projectId: string, body: TaskRequestV1): Promise<Task> {
    return this.http.post<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks`,
      { body }
    );
  }

  /** Get a task by ID within a project. */
  async get(projectId: string, taskId: string): Promise<Task> {
    return this.http.get<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  }

  /** Update an existing task. */
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

  /** Delete a task from a project. */
  async delete(projectId: string, taskId: string): Promise<Task> {
    return this.http.delete<Task>(
      `/workspaces/${this.workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  }

  /** Set the cost rate for a task. */
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

  /** Set the hourly rate for a task. */
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
