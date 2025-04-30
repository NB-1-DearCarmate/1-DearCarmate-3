import { create } from 'superstruct';
import { Request, Response } from 'express';
import userService from '../services/userService';
import { RequestHandler } from 'express';
import { OmittedUser } from '../../types/OmittedUser';
import {
  getContractListWithDcmt,
  getContractDraft,
  getEntityName,
} from '../services/contractService';
import { PageParamsStruct } from '../structs/commonStructs';
import { ResponseContractChoiceDTO, ResponseContractDcmtDTO } from '../lib/dtos/contractDTO';
import { DOCUMENT_PATH } from '../config/constants';
import contractDcmtService from '../services/contractDcmtService';
import { CreateDocumentDTO, ResponseDocumentIdDTO } from '../lib/dtos/contractDcmtDTO';
import { DownloadDocumentStruct } from '../structs/contractDcmtStructs';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import path from 'path';
import EmptyUploadError from '../lib/errors/EmptyUploadError';

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
  //인가는 클라이언트에서 patch하는 과정을 실행하며 진행
  const file = req.file;
  if (!file) {
    throw new EmptyUploadError();
  }
  const fileSize = file.size / 1024 / 1024; // MB
  //TODO: test
  console.log(file.path);
  const filePath = path.join(path.resolve(), DOCUMENT_PATH, file.filename);
  console.log(filePath);
  const document = await contractDcmtService.createDocument(
    new CreateDocumentDTO(file.filename, filePath, fileSize),
  );
  res.status(201).send(new ResponseDocumentIdDTO(document.id));
};

export const downloadDocument = async (req: Request, res: Response): Promise<void> => {
  const reqUser = req.user as OmittedUser;
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const { contractDocumentId } = create(req.params, DownloadDocumentStruct);

  const contractDocument = await contractDcmtService.getDocumentWithCompany(contractDocumentId);
  if (!contractDocument.contract) {
    throw new NotFoundError(getEntityName(), 'contract');
  }
  if (contractDocument.contract.companyId !== userCompanyId) {
    throw new UnauthError();
  }

  res.download(contractDocument.filePath, contractDocument.fileName, (err) => {
    if (err) {
      console.error('Download error:', err);
      throw err;
    }
  });
};
