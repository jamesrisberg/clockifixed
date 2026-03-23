import { HttpClient } from "../http.js";
import type {
  Assignment,
  AssignmentHydrated,
  SchedulingProjectsTotals,
  SchedulingUsersTotals,
  ProjectTotalsRequest,
  PublishAssignmentsRequest,
  RecurringAssignmentRequest,
  CopyAssignmentRequest,
  GetUserTotalsRequest,
} from "../../types/index.js";

export class SchedulingEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all assignments in the workspace. */
  async getAllAssignments(): Promise<AssignmentHydrated[]> {
    return this.http.get<AssignmentHydrated[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/all`
    );
  }

  /** Get project totals for scheduling. */
  async getProjectTotals(body: ProjectTotalsRequest): Promise<SchedulingProjectsTotals[]> {
    return this.http.post<SchedulingProjectsTotals[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/projects/totals`,
      { body }
    );
  }

  /** Get project totals for a specific project. */
  async getProjectTotalsForProject(projectId: string): Promise<SchedulingProjectsTotals> {
    return this.http.get<SchedulingProjectsTotals>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/projects/totals/${projectId}`
    );
  }

  /** Publish assignments. */
  async publishAssignments(body: PublishAssignmentsRequest): Promise<void> {
    return this.http.put<void>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/publish`,
      { body }
    );
  }

  /** Create a recurring assignment. */
  async createRecurring(body: RecurringAssignmentRequest): Promise<Assignment[]> {
    return this.http.post<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring`,
      { body }
    );
  }

  /** Delete a recurring assignment. */
  async deleteRecurring(assignmentId: string): Promise<Assignment[]> {
    return this.http.delete<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring/${assignmentId}`
    );
  }

  /** Update a recurring assignment. */
  async updateRecurring(
    assignmentId: string,
    body: RecurringAssignmentRequest
  ): Promise<Assignment[]> {
    return this.http.patch<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring/${assignmentId}`,
      { body }
    );
  }

  /** Update a recurring assignment period/series. */
  async updateRecurringPeriod(
    assignmentId: string,
    body: Record<string, unknown>
  ): Promise<Assignment[]> {
    return this.http.put<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/series/${assignmentId}`,
      { body }
    );
  }

  /** Get user totals for scheduling. */
  async getUserTotals(body: GetUserTotalsRequest): Promise<SchedulingUsersTotals[]> {
    return this.http.post<SchedulingUsersTotals[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/user-filter/totals`,
      { body }
    );
  }

  /** Get totals for a specific user. */
  async getUserTotalsForUser(userId: string): Promise<SchedulingUsersTotals> {
    return this.http.get<SchedulingUsersTotals>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/users/${userId}/totals`
    );
  }

  /** Copy an assignment. */
  async copyAssignment(
    assignmentId: string,
    body: CopyAssignmentRequest
  ): Promise<Assignment[]> {
    return this.http.post<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/${assignmentId}/copy`,
      { body }
    );
  }
}
