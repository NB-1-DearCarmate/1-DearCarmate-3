import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../../types/OmittedUser';
import { CompanyDTO } from './authDTO';
import { CreateUserBodyType } from '../../structs/userStructs';

export class ResponseUserDTO {
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

export class CreateUserDTO {
  name: string;
  email: string;
  employeeNumber: string;
  phoneNumber: string;
  password: string;
  companyId: number;
  role: USER_ROLE = USER_ROLE.EMPLOYEE;
  constructor(user: CreateUserBodyType, companyId: number) {
    this.name = user.name;
    this.email = user.email;
    this.employeeNumber = user.employeeNumber;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
    this.companyId = companyId;
  }
}
