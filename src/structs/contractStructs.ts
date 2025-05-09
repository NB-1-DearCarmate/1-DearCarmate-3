import { object, number, string, optional, array, Infer, partial } from 'superstruct';

export const ContractCreateStruct = object({
  customerId: number(),
  carId: number(),
  userId: number(),
  contractPrice: number(),
  status: optional(string()),
  resolutionDate: optional(string()),
  meetings: array(
    object({
      date: string(),
    }),
  ),
  contractDocuments: optional(array(object({ id: number(), fileName: string() }))),
});
export type ContractCreateType = Infer<typeof ContractCreateStruct>;

export const ContractUpdateStruct = partial(ContractCreateStruct);
export type ContractUpdateType = Infer<typeof ContractUpdateStruct>;
