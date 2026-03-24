import { HttpClient } from "../http.js";
import type {
  CreateHolidayRequest,
  UpdateHolidayRequest,
  Holiday,
} from "../../types/index.js";

export class HolidayEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all holidays in the workspace.
   *
   * @returns Array of holidays
   */
  async getAll(): Promise<Holiday[]> {
    return this.http.get<Holiday[]>(
      `/workspaces/${this.workspaceId}/holidays`
    );
  }

  /**
   * Create a new holiday.
   *
   * @param body - The holiday details (name, date period, user/group assignment)
   * @returns The created holiday
   *
   * @example
   * ```ts
   * const holiday = await clockify.holidays.create({
   *   name: "Christmas Day",
   *   datePeriod: { startDate: "2026-12-25", endDate: "2026-12-25" },
   *   everyoneIncludingNew: true,
   *   occursAnnually: true,
   * });
   * ```
   */
  async create(body: CreateHolidayRequest): Promise<Holiday> {
    return this.http.post<Holiday>(
      `/workspaces/${this.workspaceId}/holidays`,
      { body }
    );
  }

  /**
   * Get holidays that fall within a date range.
   *
   * @param params - The start and end dates for the period
   * @returns Array of holidays in the period
   */
  async getInPeriod(params: { start: string; end: string }): Promise<Holiday[]> {
    return this.http.get<Holiday[]>(
      `/workspaces/${this.workspaceId}/holidays/in-period`,
      {
        params: {
          start: params.start,
          end: params.end,
        },
      }
    );
  }

  /**
   * Update a holiday.
   *
   * @param holidayId - The holiday ID
   * @param body - The fields to update
   * @returns The updated holiday
   */
  async update(holidayId: string, body: UpdateHolidayRequest): Promise<Holiday> {
    return this.http.put<Holiday>(
      `/workspaces/${this.workspaceId}/holidays/${holidayId}`,
      { body }
    );
  }

  /**
   * Delete a holiday.
   *
   * @param holidayId - The holiday ID
   * @returns The deleted holiday
   */
  async delete(holidayId: string): Promise<Holiday> {
    return this.http.delete<Holiday>(
      `/workspaces/${this.workspaceId}/holidays/${holidayId}`
    );
  }
}
