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

  /** Generate a detailed report. */
  async detailed(body: DetailedReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/detailed`,
      { body }
    );
  }

  /** Generate a summary report. */
  async summary(body: SummaryReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/summary`,
      { body }
    );
  }

  /** Generate a weekly report. */
  async weekly(body: WeeklyReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/weekly`,
      { body }
    );
  }

  /** Generate an attendance report. */
  async attendance(body: AttendanceReportFilter): Promise<unknown> {
    return this.http.post(
      `/workspaces/${this.workspaceId}/reports/attendance`,
      { body }
    );
  }

  /** Generate a detailed expense report. */
  async expenseDetailed(body: ExpenseReportFilter): Promise<ExpenseDetailedReport> {
    return this.http.post<ExpenseDetailedReport>(
      `/workspaces/${this.workspaceId}/reports/expenses/detailed`,
      { body }
    );
  }

  /** Get audit log entries. */
  async auditLog(body: AuditLogGetRequest): Promise<PageableV1ListAuditLog> {
    return this.http.post<PageableV1ListAuditLog>(
      `/workspaces/${this.workspaceId}/audit-log`,
      { body }
    );
  }
}
