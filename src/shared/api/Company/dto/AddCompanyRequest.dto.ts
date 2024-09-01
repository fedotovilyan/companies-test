import { TCompany } from "@/entities/Company";

export type AddCompanyRequestDTO = Omit<TCompany, "id">;
