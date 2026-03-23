import { HttpClient } from "../http.js";
import type {
  HolidayDtoV1,
  HolidayDto,
  CreateHolidayRequest,
  UpdateHolidayRequest,
} from "../../types/index.js";

export class HolidayEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all holidays in the workspace. */
  async getAll(): Promise<HolidayDtoV1[]> {
    return this.http.get<HolidayDtoV1[]>(
      `/workspaces/${this.workspaceId}/holidays`
    );
  }

  /** Create a new holiday. */
  async create(body: CreateHolidayRequest): Promise<HolidayDtoV1> {
    return this.http.post<HolidayDtoV1>(
      `/workspaces/${this.workspaceId}/holidays`,
      { body }
    );
  }

  /** Get holidays within a date period. */
  async getInPeriod(params: { start: string; end: string }): Promise<HolidayDtoV1[]> {
    return this.http.get<HolidayDtoV1[]>(
      `/workspaces/${this.workspaceId}/holidays/in-period`,
      {
        params: {
          start: params.start,
          end: params.end,
        },
      }
    );
  }

  /** Update a holiday. */
  async update(holidayId: string, body: UpdateHolidayRequest): Promise<HolidayDtoV1> {
    return this.http.put<HolidayDtoV1>(
      `/workspaces/${this.workspaceId}/holidays/${holidayId}`,
      { body }
    );
  }

  /** Delete a holiday. */
  async delete(holidayId: string): Promise<HolidayDto> {
    return this.http.delete<HolidayDto>(
      `/workspaces/${this.workspaceId}/holidays/${holidayId}`
    );
  }
}
