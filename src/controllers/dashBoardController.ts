import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import { RequestHandler } from 'express';
import UnauthError from '../lib/errors/UnauthError';
import customerService from '../services/customerService';
import {
  CreateCustomerBodyStruct,
  CustomerIdParamStruct,
  PatchCustomerBodyStruct,
} from '../structs/customerStructs';
import { create } from 'superstruct';
import userService from '../services/userService';
import { PageParamsStruct } from '../structs/commonStructs';
import {
  RequestCustomerDTO,
  RequestUpdateCustomerDTO,
  ResponseCustomerDTO,
} from '../lib/dtos/customerDTO';

/*
- 이 달의 매출, 진행 중인 계약 수, 성사된 계약 수를 표시합니다.
- 차량타입별 계약수, 차량타입별 매출액을 표시합니다.
트랜잭션
*/
export const getDashBoard: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const dashBoardData = await userService.getCompanyIdById(reqUser.id);

  res.send(new ResponseCustomerDTO(customer));
};
