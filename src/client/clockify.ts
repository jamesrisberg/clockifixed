/**
 * Main Clockify API client — the single entry point for all API operations.
 *
 * Can be created with just an API key for workspace discovery,
 * or with a workspaceId for full API access.
 */

import { HttpClient, ClockifyConfig } from "./http.js";
import { WorkspaceEndpoints } from "./endpoints/workspace.js";
import { UserEndpoints } from "./endpoints/users.js";
import { ClientEndpoints } from "./endpoints/clients.js";
import { ProjectEndpoints } from "./endpoints/projects.js";
import { TimeEntryEndpoints } from "./endpoints/time-entries.js";
import { TagEndpoints } from "./endpoints/tags.js";
import { TaskEndpoints } from "./endpoints/tasks.js";
import { GroupEndpoints } from "./endpoints/groups.js";
import { ApprovalEndpoints } from "./endpoints/approvals.js";
import { ExpenseEndpoints } from "./endpoints/expenses.js";
import { InvoiceEndpoints } from "./endpoints/invoices.js";
import { WebhookEndpoints } from "./endpoints/webhooks.js";
import { HolidayEndpoints } from "./endpoints/holidays.js";
import { CustomFieldEndpoints } from "./endpoints/custom-fields.js";
import { SchedulingEndpoints } from "./endpoints/scheduling.js";
import { PolicyEndpoints } from "./endpoints/policies.js";
import { TimeOffEndpoints } from "./endpoints/time-off.js";
import { BalanceEndpoints } from "./endpoints/balances.js";
import { ReportEndpoints } from "./endpoints/reports.js";
import { SharedReportEndpoints } from "./endpoints/shared-reports.js";
import { TemplateEndpoints } from "./endpoints/templates.js";
import { EntityChangeEndpoints } from "./endpoints/entity-changes.js";

export class Clockify {
  private http: HttpClient;
  private _workspaceId: string | undefined;

  /** Workspace management — always available */
  readonly workspaces: WorkspaceEndpoints;
  /** User operations — getLoggedUser() always available, others need workspaceId */
  readonly users: UserEndpoints;

  // Workspace-scoped endpoints — lazily initialized, throw if no workspaceId
  private _clients?: ClientEndpoints;
  private _projects?: ProjectEndpoints;
  private _timeEntries?: TimeEntryEndpoints;
  private _tags?: TagEndpoints;
  private _tasks?: TaskEndpoints;
  private _groups?: GroupEndpoints;
  private _approvals?: ApprovalEndpoints;
  private _expenses?: ExpenseEndpoints;
  private _invoices?: InvoiceEndpoints;
  private _webhooks?: WebhookEndpoints;
  private _holidays?: HolidayEndpoints;
  private _customFields?: CustomFieldEndpoints;
  private _scheduling?: SchedulingEndpoints;
  private _policies?: PolicyEndpoints;
  private _timeOff?: TimeOffEndpoints;
  private _balances?: BalanceEndpoints;
  private _reports?: ReportEndpoints;
  private _sharedReports?: SharedReportEndpoints;
  private _templates?: TemplateEndpoints;
  private _entityChanges?: EntityChangeEndpoints;

  constructor(config: ClockifyConfig & { workspaceId?: string }) {
    this.http = new HttpClient(config);
    this._workspaceId = config.workspaceId;

    // These work without a workspaceId (some methods on each are workspace-scoped)
    const wsId = this._workspaceId ?? "";
    this.workspaces = new WorkspaceEndpoints(this.http, wsId);
    this.users = new UserEndpoints(this.http, wsId);

    // If workspaceId provided, initialize all endpoints eagerly
    if (this._workspaceId) {
      this._initWorkspaceEndpoints(this._workspaceId);
    }
  }

  private _requireWorkspaceId(): string {
    if (!this._workspaceId) {
      throw new Error(
        "This operation requires a workspaceId. Create a new client with " +
        "Clockify({ apiKey, workspaceId }) or use .forWorkspace(id)."
      );
    }
    return this._workspaceId;
  }

  private _initWorkspaceEndpoints(wsId: string): void {
    this._clients = new ClientEndpoints(this.http, wsId);
    this._projects = new ProjectEndpoints(this.http, wsId);
    this._timeEntries = new TimeEntryEndpoints(this.http, wsId);
    this._tags = new TagEndpoints(this.http, wsId);
    this._tasks = new TaskEndpoints(this.http, wsId);
    this._groups = new GroupEndpoints(this.http, wsId);
    this._approvals = new ApprovalEndpoints(this.http, wsId);
    this._expenses = new ExpenseEndpoints(this.http, wsId);
    this._invoices = new InvoiceEndpoints(this.http, wsId);
    this._webhooks = new WebhookEndpoints(this.http, wsId);
    this._holidays = new HolidayEndpoints(this.http, wsId);
    this._customFields = new CustomFieldEndpoints(this.http, wsId);
    this._scheduling = new SchedulingEndpoints(this.http, wsId);
    this._policies = new PolicyEndpoints(this.http, wsId);
    this._timeOff = new TimeOffEndpoints(this.http, wsId);
    this._balances = new BalanceEndpoints(this.http, wsId);
    this._reports = new ReportEndpoints(this.http, wsId);
    this._sharedReports = new SharedReportEndpoints(this.http, wsId);
    this._templates = new TemplateEndpoints(this.http, wsId);
    this._entityChanges = new EntityChangeEndpoints(this.http, wsId);
  }

  get workspaceId(): string | undefined {
    return this._workspaceId;
  }

  /** Client management */
  get clients(): ClientEndpoints { this._requireWorkspaceId(); return this._clients!; }
  /** Project management */
  get projects(): ProjectEndpoints { this._requireWorkspaceId(); return this._projects!; }
  /** Time entry operations */
  get timeEntries(): TimeEntryEndpoints { this._requireWorkspaceId(); return this._timeEntries!; }
  /** Tag management */
  get tags(): TagEndpoints { this._requireWorkspaceId(); return this._tags!; }
  /** Task management */
  get tasks(): TaskEndpoints { this._requireWorkspaceId(); return this._tasks!; }
  /** User group management */
  get groups(): GroupEndpoints { this._requireWorkspaceId(); return this._groups!; }
  /** Approval request management */
  get approvals(): ApprovalEndpoints { this._requireWorkspaceId(); return this._approvals!; }
  /** Expense management */
  get expenses(): ExpenseEndpoints { this._requireWorkspaceId(); return this._expenses!; }
  /** Invoice management */
  get invoices(): InvoiceEndpoints { this._requireWorkspaceId(); return this._invoices!; }
  /** Webhook management */
  get webhooks(): WebhookEndpoints { this._requireWorkspaceId(); return this._webhooks!; }
  /** Holiday management */
  get holidays(): HolidayEndpoints { this._requireWorkspaceId(); return this._holidays!; }
  /** Custom field management */
  get customFields(): CustomFieldEndpoints { this._requireWorkspaceId(); return this._customFields!; }
  /** Scheduling and assignment management */
  get scheduling(): SchedulingEndpoints { this._requireWorkspaceId(); return this._scheduling!; }
  /** Time-off policy management */
  get policies(): PolicyEndpoints { this._requireWorkspaceId(); return this._policies!; }
  /** Time-off request management */
  get timeOff(): TimeOffEndpoints { this._requireWorkspaceId(); return this._timeOff!; }
  /** Time-off balance management */
  get balances(): BalanceEndpoints { this._requireWorkspaceId(); return this._balances!; }
  /** Report generation */
  get reports(): ReportEndpoints { this._requireWorkspaceId(); return this._reports!; }
  /** Shared report management */
  get sharedReports(): SharedReportEndpoints { this._requireWorkspaceId(); return this._sharedReports!; }
  /** Template management (deprecated) */
  get templates(): TemplateEndpoints { this._requireWorkspaceId(); return this._templates!; }
  /** Entity change tracking (experimental) */
  get entityChanges(): EntityChangeEndpoints { this._requireWorkspaceId(); return this._entityChanges!; }

  /**
   * Switch to a different workspace. Returns a new Clockify instance.
   */
  forWorkspace(workspaceId: string): Clockify {
    return new Clockify({
      apiKey: (this.http as any).config.apiKey,
      baseUrl: (this.http as any).config.baseUrl,
      reportsBaseUrl: (this.http as any).config.reportsBaseUrl,
      defaultPageSize: (this.http as any).config.defaultPageSize,
      workspaceId,
    });
  }
}
