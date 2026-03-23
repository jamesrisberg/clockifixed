/**
 * Shared test context and cleanup registry for write verification.
 */

export interface TestContext {
  workspaceId: string;
  userId: string;

  // Persistent entities (survive full suite for dependent phases + read verifier)
  persistClientId?: string;
  persistProjectId?: string;
  persistTaskId?: string;
  persistTimeEntryId?: string;
  persistCategoryId?: string;
  persistPolicyId?: string;
  persistInvoiceId?: string;
  persistWebhookId?: string;
  persistTemplateId?: string;

  // Lifecycle entities (created and deleted within domain tests)
  clientId?: string;
  projectId?: string;
  taskId?: string;
  tagId?: string;
  groupId?: string;
  holidayId?: string;
  customFieldId?: string;
  timeEntryId?: string;
  expenseCategoryId?: string;
  expenseId?: string;
  webhookId?: string;
  invoiceId?: string;
  policyId?: string;
  timeOffRequestId?: string;
  templateId?: string;
  approvalRequestId?: string;
  assignmentId?: string;
}

type CleanupFn = () => Promise<any>;

interface CleanupEntry {
  label: string;
  fn: CleanupFn;
}

export class CleanupRegistry {
  private stack: CleanupEntry[] = [];

  register(label: string, fn: CleanupFn): void {
    this.stack.push({ label, fn });
  }

  /** Remove an entry by label (e.g., when entity was already deleted in a test) */
  remove(label: string): void {
    this.stack = this.stack.filter((e) => e.label !== label);
  }

  /** Run all cleanup functions in LIFO order. Returns results. */
  async runAll(): Promise<{
    succeeded: string[];
    failed: Array<{ label: string; error: string }>;
  }> {
    const succeeded: string[] = [];
    const failed: Array<{ label: string; error: string }> = [];

    // Reverse for LIFO (delete children before parents)
    const entries = [...this.stack].reverse();

    for (const entry of entries) {
      try {
        await entry.fn();
        succeeded.push(entry.label);
      } catch (err: any) {
        // 404 means already deleted — that's fine
        if (err.message?.includes("404")) {
          succeeded.push(`${entry.label} (already gone)`);
        } else {
          failed.push({ label: entry.label, error: err.message ?? String(err) });
        }
      }
    }

    this.stack = [];
    return { succeeded, failed };
  }

  get size(): number {
    return this.stack.length;
  }
}
