import { OmittedUser } from '../types/OmittedUser';
import { RequestHandler } from 'express';
import dashBoardService from '../services/dashBoardService';
import { ResponseDashBoardDTO } from '../lib/dtos/dashBoardDTO';

/**
 * @openapi
 * /dashboard:
 *   get:
 *     summary: 대시보드 데이터 조회
 *     description: 로그인한 사용자의 회사에 대한 대시보드 데이터를 조회합니다.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 대시보드 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDashBoardDTO'
 *             example:
 *               monthlySales: 5000000
 *               lastMonthSales: 4500000
 *               growthRate: 11
 *               proceedingContractsCount: 200
 *               completedContractsCount: 1500
 *               contractsByCarType:
 *                 - carType: "SUV"
 *                   count: 300
 *                 - carType: "Sedan"
 *                   count: 500
 *               salesByCarType:
 *                 - carType: "SUV"
 *                   count: 1500000
 *                 - carType: "Sedan"
 *                   count: 3500000
 *       401:
 *         description: 인증되지 않은 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const getDashBoard: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;

  const dashBoardData = await dashBoardService.getDashBoardData(reqUser.companyId);

  res.send(new ResponseDashBoardDTO(dashBoardData));
};
