import { OmittedUser } from '../../types/OmittedUser';
import { ResponseUserDTO } from './userDTO';

export class CompanyDTO {
  companyCode: string;
  constructor(companyCode: number) {
    this.companyCode = companyCode.toString();
  }
}

export class LoginResponseDTO {
  user: ResponseUserDTO;
  accessToken: string;
  refreshToken: string;
  constructor(user: OmittedUser, accessToken: string, refreshToken: string) {
    this.user = new ResponseUserDTO(user);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
