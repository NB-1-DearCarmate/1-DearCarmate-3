import { create } from 'superstruct';
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { OmittedUser } from '../types/OmittedUser';
import contractService from '../services/contractService';
import { PageParamsStruct } from '../structs/commonStructs';
import { ResponseContractChoiceDTO, ResponseContractDocListDTO } from '../lib/dtos/contractDocDTO';
import { DOCUMENT_PATH } from '../config/constants';
import contractDocService from '../services/contractDocService';
import { ResponseDocumentIdDTO } from '../lib/dtos/contractDocDTO';
import { DownloadDocumentStruct } from '../structs/contractDocStructs';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import path from 'path';
import EmptyUploadError from '../lib/errors/EmptyUploadError';

/**
 * @openapi
 * /contractDocuments:
 *   get:
 *     summary: 계약 문서 목록 조회
 *     description: 페이지 정보를 기반으로 계약 문서 목록을 조회합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: searchBy
 *         required: false
 *         schema:
 *           type: string
 *         description: 검색 기준
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: 검색 키워드
 *     responses:
 *       200:
 *         description: 계약 문서 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractDocListDTO'
 *             example:
 *               contracts:
 *                 - id: 1
 *                   contractPrice: 9500000
 *                   status: "ONGOING"
 *                   createdAt: "2024-02-01T10:00:00Z"
 *                   car:
 *                     id: 5
 *                     carNumber: "12가3456"
 *                   customer:
 *                     id: 7
 *                     name: "홍길동"
 *               page: 1
 *               pageSize: 10
 *               totalCount: 42
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
export const getDocumentList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const data = create(req.query, PageParamsStruct);
  const { contracts, totalItemCount } = await contractService.getContractListWithDoc(
    reqUser.companyId,
    data,
  );
  res.send(new ResponseContractDocListDTO(contracts, data.page, data.pageSize, totalItemCount));
};

/**
 * @openapi
 * /contractDocuments/draft:
 *   get:
 *     summary: 계약 선택 목록 조회
 *     description: 계약 초안 상태인 계약 목록을 조회합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 계약 선택 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResponseContractChoiceDTO'
 *             example:
 *               - id: 3
 *                 contractPrice: 8000000
 *                 customer:
 *                   id: 12
 *                   name: "이순신"
 *                 car:
 *                   id: 9
 *                   carNumber: "34나7890"
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
export const getContractChoice: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const contracts = await contractService.getContractDraft(reqUser.companyId);
  res.send(new ResponseContractChoiceDTO(contracts).data);
};

/**
 * @openapi
 * /contractDocuments/upload:
 *   post:
 *     summary: 계약 문서 업로드
 *     description: 계약 문서를 업로드합니다. 파일 형식은 `multipart/form-data`로 전송해야 합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 문서 파일
 *     responses:
 *       201:
 *         description: 문서 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDocumentIdDTO'
 *             example:
 *               id: 42
 *       400:
 *         description: 업로드된 파일이 없거나 잘못된 요청입니다.
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
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

  const { contractId } = req.body;

  const document = await contractDocService.createDocument(file.filename, filePath, fileSize);
  res.status(201).send(new ResponseDocumentIdDTO(document.id));
};

/**
 * @openapi
 * /contractDocuments/{contractDocumentId}/download:
 *   get:
 *     summary: 계약 문서 다운로드
 *     description: 계약 문서를 다운로드합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractDocumentId
 *         required: true
 *         schema:
 *           type: number
 *         description: 다운로드할 계약 문서의 ID
 *     responses:
 *       200:
 *         description: 문서 다운로드 성공
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: 계약 또는 문서를 찾을 수 없습니다.
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
export const downloadDocument = async (req: Request, res: Response): Promise<void> => {
  const reqUser = req.user as OmittedUser;
  const { contractDocumentId } = create(req.params, DownloadDocumentStruct);

  const contractDocument = await contractDocService.getDocumentWithCompany(contractDocumentId);
  if (!contractDocument.contract) {
    throw new NotFoundError('Contract', 'contract');
  }
  if (contractDocument.contract.companyId !== reqUser.companyId) {
    throw new UnauthError();
  }

  res.download(contractDocument.filePath, contractDocument.fileName, (err) => {
    if (err) {
      console.error('Download error:', err);
      throw err;
    }
  });
};
