import { RequestHandler } from 'express';
import companyService from '../services/companyService';
import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../types/OmittedUser';
import UnauthError from '../lib/errors/UnauthError';
import userService from '../services/userService';
import { PageParamsStruct } from '../structs/commonStructs';
import { create } from 'superstruct';
import {
  CompanyIdParamStruct,
  CreateCompanyBodyStruct,
  PatchCompanyBodyStruct,
} from '../structs/companyStructs';
import { ResponseCompanyListDTO, ResponseCompanyUserListDTO } from '../lib/dtos/companyDTO';

/**
 * @openapi
 * /companies:
 *   post:
 *     summary: 새로운 회사 생성
 *     description: 새로운 회사를 생성합니다. 관리자 권한을 가진 사용자만 생성할 수 있습니다.
 *     tags:
 *       - Company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: 회사의 이름입니다.
 *                 example: "햇살카"
 *               companyCode:
 *                 type: string
 *                 description: 회사 고유 코드입니다.
 *                 example: "HS001"
 *     responses:
 *       201:
 *         description: 회사가 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: 생성된 회사의 고유 ID입니다.
 *                   example: 1
 *                 companyName:
 *                   type: string
 *                   description: 생성된 회사의 이름입니다.
 *                   example: "햇살카"
 *                 companyCode:
 *                   type: string
 *                   description: 생성된 회사의 고유 코드입니다.
 *                   example: "HS001"
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 잘못된 형식일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const postCompany: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.body, CreateCompanyBodyStruct);
  const company = await companyService.createCompany(data);
  res.status(201).send(company);
};

/**
 * @openapi
 * /companies:
 *   get:
 *     summary: 회사 목록 조회
 *     description: 회사 목록을 페이지 단위로 조회합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 회사 목록이 성공적으로 반환되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyListDTO'
 *       400:
 *         description: 잘못된 요청입니다. 유효하지 않은 페이지 번호 또는 페이지 크기일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const getCompanyList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.query, PageParamsStruct);
  const result = await companyService.getCompanies(data);
  res.send(new ResponseCompanyListDTO(data.page, data.pageSize, result));
};

/**
 * @openapi
 * /companies/users:
 *   get:
 *     summary: 회사의 사용자 목록 조회
 *     description: 모든 회사의 사용자 목록을 페이지 단위로 조회합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 회사의 사용자 목록이 성공적으로 반환되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyUserListDTO'
 *       400:
 *         description: 잘못된 요청입니다. 유효하지 않은 페이지 번호 또는 페이지 크기일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const getCompanyUsers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const pageParams = create(req.query, PageParamsStruct);
  const result = await userService.getCompanyUsers(pageParams);
  res.send(
    new ResponseCompanyUserListDTO(
      pageParams.page,
      pageParams.pageSize,
      result.users,
      result.totalItemCount,
    ),
  );
};

/**
 * @openapi
 * /companies/{companyId}:
 *   patch:
 *     summary: 회사 정보 수정
 *     description: 지정된 회사의 정보를 수정합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 회사 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: 수정할 회사 이름
 *                 example: 햇살카 수정
 *               companyCode:
 *                 type: string
 *                 description: 수정할 회사 코드
 *                 example: HS-001
 *     responses:
 *       200:
 *         description: 회사 정보가 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyDTO'
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 잘못된 형식일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */

export const patchCompany: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const { companyId } = create(req.params, CompanyIdParamStruct);
  const data = create(req.body, PatchCompanyBodyStruct);
  const company = await companyService.updateCompany(companyId, data);
  res.send(company);
};

/**
 * @openapi
 * /companies/{companyId}:
 *   delete:
 *     summary: 회사 삭제
 *     description: 지정된 회사의 정보를 삭제합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 회사 ID
 *     responses:
 *       200:
 *         description: 회사가 성공적으로 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사 삭제 성공"
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const deleteCompany: RequestHandler = async (req, res, next) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const companyId = parseInt(req.params.companyId as string, 10);
  await companyService.deleteCompany(companyId);
  res.status(200).send({ message: '회사 삭제 성공' });
};
