import { User, USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../../types/OmittedUser';

class UserDTO {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  phoneNumber: string;
  imageUrl: string;
  isAdmin: boolean;
  company: CompanyDTO;
  constructor(user: OmittedUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.employeeNumber = user.employeeNumber;
    this.phoneNumber = user.phoneNumber;
    this.imageUrl = user.imageUrl ?? '';
    this.isAdmin = user.role === USER_ROLE.ADMIN;

    this.company = new CompanyDTO(user.companyId);
  }
}

class CompanyDTO {
  companyCode: string;
  constructor(companyCode: number) {
    this.companyCode = companyCode.toString();
  }
}

export class LoginResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
  constructor(user: OmittedUser, accessToken: string, refreshToken: string) {
    this.user = new UserDTO(user);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
