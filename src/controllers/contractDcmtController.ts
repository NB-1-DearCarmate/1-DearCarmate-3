import { create } from 'superstruct';
import userService from '../services/userService';
import { RequestHandler } from 'express';
import { OmittedUser } from '../../types/OmittedUser';
import { getContractListWithDcmt, getContractDraft } from '../services/contractService';
import { PageParamsStruct } from '../structs/commonStructs';
import { ResponseContractChoiceDTO, ResponseContractDcmtDTO } from '../lib/dtos/contractDTO';
import { DOCUMENT_PATH } from '../config/constants';
import { mimeTypeVerifier } from '../lib/fileUploader';

export const getDocumentList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const data = create(req.query, PageParamsStruct);
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const { contracts, page, pageSize, totalItemCount } = await getContractListWithDcmt(
    userCompanyId,
    data,
  );
  res.send(new ResponseContractDcmtDTO(contracts, page, pageSize, totalItemCount));
};

export const getContractChoice: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const contracts = await getContractDraft(userCompanyId);
  res.send(new ResponseContractChoiceDTO(contracts).data);
};

export const uploadDocument = async (req: Request, res: Response): Promise<void> => {
  const file = await mimeTypeVerifier(req, DOCUMENT_PATH, [
    'jpg',
    'png',
    'webp',
    'gif',
    'avif',
    'bmp',
    'ico',
    'txt',
    'pdf',
    'docx',
    'xlsx',
    'csv',
    'zip',
    'rar',
    '7z',
    'hwp',
  ]);

  const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${IMAGE_PATH}/${file.filename}`;
  res.status(201).json({ imageUrl: downloadUrl });
};
