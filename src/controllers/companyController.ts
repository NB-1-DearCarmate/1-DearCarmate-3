import { RequestHandler } from 'express';
import companyService from '../services/companyService';
import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import UnauthError from '../lib/errors/UnauthError';
import userService from '../services/userService';
import { PageParamsStruct } from '../structs/commonStructs';
import { create } from 'superstruct';
import {
  CompanyIdParamStruct,
  CreateCompanyBodyStruct,
  PatchCompanyBodyStruct,
} from '../structs/companyStructs';

/**
 * @openapi
 * /company:
 *   post:
 *     summary: 새로운 회사 생성
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
 *                 example: "햇살카"
 *               companyCode:
 *                 type: string
 *                 example: "HS001"
 *     responses:
 *       201:
 *         description: 회사 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 companyName:
 *                   type: string
 *                   example: "햇살카"
 *                 companyCode:
 *                   type: string
 *                   example: "HS001"
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
 * /company/list:
 *   get:
 *     summary: 회사 목록 조회
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 회사 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   companyName:
 *                     type: string
 *                     example: "햇살카"
 *                   companyCode:
 *                     type: string
 *                     example: "HS001"
 */
export const getCompanyList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.query, PageParamsStruct);
  const companies = await companyService.getCompanies(data);
  res.send(companies);
};

/**
 * @openapi
 * /company/{companyId}/users:
 *   get:
 *     summary: 특정 회사의 사용자 목록 조회
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회사 ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 특정 회사의 사용자 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "홍길동"
 *                   email:
 *                     type: string
 *                     example: "hong@example.com"
 */
export const getCompanyUsers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.query, PageParamsStruct);
  const users = await userService.getUsers(data);
  res.send(users);
};

/**
 * @openapi
 * /company/{companyId}:
 *   patch:
 *     summary: 회사 정보 수정
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 회사 ID
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: 수정할 회사 이름
 *         example: "햇살카 수정"
 *     responses:
 *       200:
 *         description: 회사 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 companyName:
 *                   type: string
 *                   example: "햇살카 수정"
 *                 companyCode:
 *                   type: string
 *                   example: "HS001"
 */
export const patchCompany: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const { companyId } = create(req.params, CompanyIdParamStruct);
  const data = create(req.query, PatchCompanyBodyStruct);
  const company = await companyService.updateCompany(companyId, data);
  res.status(200).json(company);
};
export const deleteCompany: RequestHandler = async (req, res, next) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const companyId = parseInt(req.params.companyId as string, 10);
  await companyService.deleteCompany(companyId);
  res.status(200).send({ message: '회사 삭제 성공' });
};
