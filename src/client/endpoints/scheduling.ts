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

  /**
   * Get all assignments in the workspace. Requires `start` and `end`
   * query parameters on the Clockify API side.
   *
   * @returns Array of hydrated assignments with user/project details
   */
  async getAllAssignments(): Promise<AssignmentHydrated[]> {
    return this.http.get<AssignmentHydrated[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/all`
    );
  }

  /**
   * Get scheduling totals aggregated by project.
   *
   * @param body - The filter criteria (date range, projects)
   * @returns Array of project scheduling totals
   */
  async getProjectTotals(body: ProjectTotalsRequest): Promise<SchedulingProjectsTotals[]> {
    return this.http.post<SchedulingProjectsTotals[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/projects/totals`,
      { body }
    );
  }

  /**
   * Get scheduling totals for a single project.
   *
   * @param projectId - The project ID
   * @returns The project's scheduling totals
   */
  async getProjectTotalsForProject(projectId: string): Promise<SchedulingProjectsTotals> {
    return this.http.get<SchedulingProjectsTotals>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/projects/totals/${projectId}`
    );
  }

  /**
   * Publish draft assignments, making them visible to assigned users.
   *
   * @param body - The publish criteria (assignment IDs or date range)
   */
  async publishAssignments(body: PublishAssignmentsRequest): Promise<void> {
    return this.http.put<void>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/publish`,
      { body }
    );
  }

  /**
   * Create a recurring assignment (repeating schedule for a user on a project).
   *
   * @param body - The assignment configuration (user, project, hours, recurrence)
   * @returns The created assignment instances
   */
  async createRecurring(body: RecurringAssignmentRequest): Promise<Assignment[]> {
    return this.http.post<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring`,
      { body }
    );
  }

  /**
   * Delete a recurring assignment and all its instances.
   *
   * @param assignmentId - The assignment ID
   * @returns The deleted assignment instances
   */
  async deleteRecurring(assignmentId: string): Promise<Assignment[]> {
    return this.http.delete<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring/${assignmentId}`
    );
  }

  /**
   * Update a recurring assignment's configuration.
   *
   * @param assignmentId - The assignment ID
   * @param body - The updated assignment configuration
   * @returns The updated assignment instances
   */
  async updateRecurring(
    assignmentId: string,
    body: RecurringAssignmentRequest
  ): Promise<Assignment[]> {
    return this.http.patch<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/recurring/${assignmentId}`,
      { body }
    );
  }

  /**
   * Update the period or series configuration for a recurring assignment.
   *
   * @param assignmentId - The assignment ID
   * @param body - The period/series update
   * @returns The updated assignment instances
   */
  async updateRecurringPeriod(
    assignmentId: string,
    body: Record<string, unknown>
  ): Promise<Assignment[]> {
    return this.http.put<Assignment[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/series/${assignmentId}`,
      { body }
    );
  }

  /**
   * Get scheduling totals aggregated by user.
   *
   * @param body - The filter criteria (date range, users)
   * @returns Array of user scheduling totals
   */
  async getUserTotals(body: GetUserTotalsRequest): Promise<SchedulingUsersTotals[]> {
    return this.http.post<SchedulingUsersTotals[]>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/user-filter/totals`,
      { body }
    );
  }

  /**
   * Get scheduling totals for a single user.
   *
   * @param userId - The user ID
   * @returns The user's scheduling totals
   */
  async getUserTotalsForUser(userId: string): Promise<SchedulingUsersTotals> {
    return this.http.get<SchedulingUsersTotals>(
      `/workspaces/${this.workspaceId}/scheduling/assignments/users/${userId}/totals`
    );
  }

  /**
   * Copy an existing assignment to a new date range or user.
   *
   * @param assignmentId - The assignment ID to copy
   * @param body - The copy target configuration
   * @returns The newly created assignment instances
   */
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
