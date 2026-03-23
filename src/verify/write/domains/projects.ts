import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { projectDtoImplV1Schema, projectDtoV1Schema } from "../../../types/index.js";
import { realProjectSchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

/** Archive then delete a project (Clockify requires archive first) */
async function archiveAndDeleteProject(api: Clockify, projectId: string) {
  await api.projects.update(projectId, { name: "archived", archived: true });
  await api.projects.delete(projectId);
}

export function registerProjectTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Project lifecycle", () => {
    it("creates a project", async () => {
      const body = fixtures.project(ctx().persistClientId);
      const result = await withRetry(() => api().projects.create(body));
      cleanup().register(`project:${result.id}`, () => archiveAndDeleteProject(api(), result.id!));
      ctx().projectId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create project", tag: "Project", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/projects`,
        specSchema: projectDtoImplV1Schema,
      }));
      expect(result.id).toBeDefined();
      expect(result.name).toBe(body.name);
    });

    it("creates a persistent project for later phases", async () => {
      const body = fixtures.project(ctx().persistClientId);
      const result = await withRetry(() => api().projects.create(body));
      cleanup().register(`persist-project:${result.id}`, () => archiveAndDeleteProject(api(), result.id!));
      ctx().persistProjectId = result.id!;
      expect(result.id).toBeDefined();
    });

    it("reads back created project", async () => {
      const result = await withRetry(() => api().projects.get(ctx().projectId!));
      reporter().addResult(validateResponse(result, {
        name: "Get project (after create)", tag: "Project", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}`,
        specSchema: projectDtoV1Schema, realitySchema: realProjectSchema,
      }));
      expect(result.id).toBe(ctx().projectId);
    });

    it("updates the project", async () => {
      const body = updates.project();
      const result = await withRetry(() => api().projects.update(ctx().projectId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update project", tag: "Project", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}`,
        specSchema: projectDtoImplV1Schema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("updates project estimate", async () => {
      const result = await withRetry(() =>
        api().projects.updateEstimate(ctx().projectId!, {
          timeEstimate: {
            active: true,
            estimate: "PT40H",
            type: "MANUAL",
          },
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update project estimate", tag: "Project", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}/estimate`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("updates project memberships", async () => {
      const result = await withRetry(() =>
        api().projects.updateMemberships(ctx().projectId!, {
          memberships: [{ userId: ctx().userId }],
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update project memberships", tag: "Project", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}/memberships`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("adds users to project", async () => {
      try {
        await withRetry(() =>
          api().projects.addUsers(ctx().projectId!, {
            userIds: [ctx().userId],
          })
        );
      } catch (err: any) {
        // May fail if user already a member
        if (!err.message?.includes("already")) throw err;
      }
    });

    it("updates project template flag", async () => {
      const result = await withRetry(() =>
        api().projects.updateTemplate(ctx().projectId!, { isTemplate: false })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update project template flag", tag: "Project", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}/template`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("sets project user cost rate", async () => {
      const result = await withRetry(() =>
        api().projects.setUserCostRate(ctx().projectId!, ctx().userId, { amount: 3000 })
      );
      reporter().addResult(validateResponse(result, {
        name: "Set project user cost rate", tag: "Project", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}/users/${ctx().userId}/cost-rate`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("sets project user hourly rate", async () => {
      const result = await withRetry(() =>
        api().projects.setUserHourlyRate(ctx().projectId!, ctx().userId, { amount: 6000 })
      );
      reporter().addResult(validateResponse(result, {
        name: "Set project user hourly rate", tag: "Project", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}/users/${ctx().userId}/hourly-rate`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("creates a project from template", async () => {
      if (!ctx().templateId) return;
      try {
        const result = await withRetry(() =>
          api().projects.createFromTemplate({
            name: "_cfix_test_FromTemplate",
            templateProjectId: ctx().templateId!,
          })
        );
        if (result?.id) {
          cleanup().register(`project-tmpl:${result.id}`, async () => {
            await api().projects.update(result.id!, { name: "archived", archived: true });
            await api().projects.delete(result.id!);
          });
        }
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("deletes the project (archive first)", async () => {
      await withRetry(() => api().projects.update(ctx().projectId!, { name: "archived", archived: true }));
      const result = await withRetry(() => api().projects.delete(ctx().projectId!));
      cleanup().remove(`project:${ctx().projectId}`);
      reporter().addResult(validateResponse(result, {
        name: "Delete project", tag: "Project", method: "DELETE",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().projectId}`,
        specSchema: projectDtoImplV1Schema,
      }));
    });

    it("verifies project is gone", async () => {
      await expect(withRetry(() => api().projects.get(ctx().projectId!))).rejects.toThrow();
    });
  });
}
