import { HttpClient } from "../http.js";
import type {
  DetailedReportFilter,
  SummaryReportFilter,
  WeeklyReportFilter,
  AttendanceReportFilter,
  ExpenseReportFilter,
  ExpenseDetailedReport,
  AuditLogGetRequest,
  PageableV1ListAuditLog,
} from "../../types/index.js";

export class ReportEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Generate a detailed time entry report. Requires `dateRangeStart`,
   * `dateRangeEnd`, and `detailedFilter` in the body.
   *
   * @param body - The report filter criteria
   * @returns The detailed report data
   */
  async detailed(body: DetailedReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/detailed`,
      { body }
    );
  }

  /**
   * Generate a summary report grouped by project, user, or other dimensions.
   * Requires `dateRangeStart`, `dateRangeEnd`, and `summaryFilter`.
   *
   * @param body - The report filter criteria
   * @returns The summary report data
   */
  async summary(body: SummaryReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/summary`,
      { body }
    );
  }

  /**
   * Generate a weekly report showing hours per day.
   * Requires `dateRangeStart`, `dateRangeEnd`, and `weeklyFilter`.
   *
   * @param body - The report filter criteria
   * @returns The weekly report data
   */
  async weekly(body: WeeklyReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/weekly`,
      { body }
    );
  }

  /**
   * Generate an attendance report showing user work patterns.
   * Requires `dateRangeStart`, `dateRangeEnd`, and `attendanceFilter`.
   *
   * @param body - The report filter criteria
   * @returns The attendance report data
   */
  async attendance(body: AttendanceReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/attendance`,
      { body }
    );
  }

  /**
   * Generate a detailed expense report.
   *
   * @param body - The expense report filter criteria
   * @returns The detailed expense report
   */
  async expenseDetailed(body: ExpenseReportFilter): Promise<ExpenseDetailedReport> {
    return this.http.post<ExpenseDetailedReport>(
      `/workspaces/${this.workspaceId}/reports/expenses/detailed`,
      { body }
    );
  }

  /**
   * Get audit log entries for the workspace. Tracks user actions
   * like entity creation, updates, and deletions.
   *
   * @param body - The audit log query (date range, filters, pagination)
   * @returns Paginated audit log entries
   */
  async auditLog(body: AuditLogGetRequest): Promise<PageableV1ListAuditLog> {
    return this.http.post<PageableV1ListAuditLog>(
      `/workspaces/${this.workspaceId}/audit-log`,
      { body }
    );
  }
}
