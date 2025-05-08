import { object, number } from 'superstruct';
import { integerString } from './commonStructs';

export const DownloadDocumentStruct = object({
  contractDocumentId: integerString,
});
