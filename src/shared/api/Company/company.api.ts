import { TCompany } from "@/entities/Company/types/TCompany";
import { apiInstance } from "../apiInstance";
import { CompaniesFilters } from "@/entities/Company";

export class CompanyAPI {
  static async fetchCompanies(filters: CompaniesFilters) {
    const searchParams = new URLSearchParams({
      _page: filters.page.toString(),
      _per_page: filters.count.toString(),
    });
    const res = await apiInstance.get<{data: TCompany[], items: number}>(`/companies?${searchParams}`);

    return res.data;
  }

  static async addCompany(company: Omit<TCompany, "id">) {
    const res = await apiInstance.post<TCompany>("/companies", company);

    return res.data;
  }

  static async deleteCompany(companyId: TCompany["id"]) {
    const res = await apiInstance.delete<TCompany>(`/companies/${companyId}`);

    return res.data;
  }

  static async patchCompany(companyId: TCompany['id'], updatedFields: Partial<TCompany>) {
    const res = await apiInstance.patch<TCompany[]>(
      `/companies/${companyId}`,
      updatedFields
    );

    return res.data;
  }
}
