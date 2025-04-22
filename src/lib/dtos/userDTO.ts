import { CompanyDTO } from './authDTO';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  phoneNumber: string;
  imageUrl: string | null;
  isAdmin: boolean;
  company: CompanyDTO;
  constructor(
    id: number,
    name: string,
    email: string,
    employeeNumber: string,
    phoneNumber: string,
    imageUrl: string | null = null,
    isAdmin: boolean,
    company: CompanyDTO,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.employeeNumber = employeeNumber;
    this.phoneNumber = phoneNumber;
    this.imageUrl = imageUrl;
    this.isAdmin = isAdmin;
    this.company = company;
  }
}
