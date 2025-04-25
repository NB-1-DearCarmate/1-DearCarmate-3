import { object, number, string, optional, array } from "superstruct";

export const ContractCreateStruct = object({
  customerId: number(),
  carId: number(),
  userId: number(),
  companyId: number(),
  contractPrice: number(),
  status: optional(string()), 
  resolutionDate: optional(string()), 
  meetings: array(
    object({
      time: string(),
    })
  ),
});
