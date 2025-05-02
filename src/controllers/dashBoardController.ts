import { OmittedUser } from '../types/OmittedUser';
import { RequestHandler } from 'express';
import dashBoardService from '../services/dashBoardService';
import { ResponseDashBoardDTO } from '../lib/dtos/dashBoardDTO';

export const getDashBoard: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;

  const dashBoardData = await dashBoardService.getDashBoardData(reqUser.companyId);

  res.send(new ResponseDashBoardDTO(dashBoardData));
};
