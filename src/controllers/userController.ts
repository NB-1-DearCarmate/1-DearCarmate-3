import { create } from 'superstruct';
import userService from '../services/userService';
import {
  CreateUserBodyStruct,
  DeleteUserParamStruct,
  UpdateUserBodyStruct,
} from '../structs/userStructs';
import { RequestHandler } from 'express';
import { CreateUserDTO, ResponseUserDTO } from '../lib/dtos/userDTO';
import companyService from '../services/companyService';
import CommonError from '../lib/errors/CommonError';
import NotFoundError from '../lib/errors/NotFoundError';
import { OmittedUser } from '../../types/OmittedUser';
import { USER_ROLE } from '@prisma/client';
import UnauthError from '../lib/errors/UnauthError';

/**
 * @openapi
 * /users:
 *   post:
 *     summary: 새로운 사용자 생성
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               employeeNumber:
 *                 type: string
 *                 example: 12345
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *               password:
 *                 type: string
 *                 example: securepassword
 *               company:
 *                 type: string
 *                 example: "Acme Corp"
 *               companyCode:
 *                 type: string
 *                 example: "ACME123"
 *     responses:
 *       201:
 *         description: 사용자 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 *       404:
 *         description: 회사가 존재하지 않거나 회사 코드가 잘못됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Company not found or company code is wrong"
 */
export const createUser: RequestHandler = async (req, res) => {
  const data = create(req.body, CreateUserBodyStruct);
  const company = await companyService.getByName(data.company);
  if (company.companyCode !== data.companyCode) {
    throw new CommonError('Company code is wrong', 404);
  }

  const user = await userService.createUser(new CreateUserDTO(data, company.id));
  res.status(201).send(new ResponseUserDTO(user));
};

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: 로그인한 사용자 정보 조회
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: 사용자 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 */
export const getInfo: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  res.send(new ResponseUserDTO(reqUser));
};

/**
 * @openapi
 * /users/me:
 *   put:
 *     summary: 로그인한 사용자 정보 수정
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: john.updated@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 010-9876-5432
 *     responses:
 *       200:
 *         description: 사용자 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 *       400:
 *         description: 수정하려는 정보가 잘못된 경우
 */
export const editInfo: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const data = create(req.body, UpdateUserBodyStruct);
  const user = await userService.updateUser(reqUser.id, data);
  res.status(201).send(new ResponseUserDTO(user));
};

/**
 * @openapi
 * /users/me/withdraw:
 *   delete:
 *     summary: 사용자 탈퇴
 *     tags:
 *       - User
 *     responses:
 *       204:
 *         description: 사용자 탈퇴 성공
 */
export const withDraw: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  await userService.deleteUser(reqUser.id);
  res.status(204).send();
};

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: 관리자에 의한 사용자 삭제
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 삭제할 사용자 ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 사용자 삭제 성공
 *       401:
 *         description: 권한 없음
 */
export const deleteUser: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const { userId } = create(req.params, DeleteUserParamStruct);
  await userService.deleteUser(userId);
  res.status(204).send();
};
