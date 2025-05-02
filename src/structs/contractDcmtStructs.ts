import { object, number } from 'superstruct';

export const DownloadDocumentStruct = object({
  contractDocumentId: number(),
});
