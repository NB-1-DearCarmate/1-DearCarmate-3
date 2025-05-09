import { AGE_GROUP, Customer, REGION } from '@prisma/client';
import { CreateCustomerBodyType } from '../../structs/customerStructs';

const ageGroupMap: Record<string, AGE_GROUP> = {
  '10대': AGE_GROUP.AGE_10,
  '20대': AGE_GROUP.AGE_20,
  '30대': AGE_GROUP.AGE_30,
  '40대': AGE_GROUP.AGE_40,
  '50대': AGE_GROUP.AGE_50,
  '60대': AGE_GROUP.AGE_60,
  '70대': AGE_GROUP.AGE_70,
  '80대': AGE_GROUP.AGE_80,
};

const regionMap: Record<string, REGION> = {
  서울: REGION.SEOUL,
  경기: REGION.GYEONGGI,
  인천: REGION.INCHEON,
  강원: REGION.GANGWON,
  충북: REGION.CHOUNGBUK,
  충남: REGION.CHOUNGNAM,
  세종: REGION.SEJONG,
  대전: REGION.DAJEON,
  경북: REGION.GYEONGBUK,
  경남: REGION.GYEONGNAM,
  광주: REGION.GWANGJU,
  전북: REGION.JEONBUK,
  전남: REGION.JEONNAM,
  대구: REGION.DAEGU,
  울산: REGION.ULSAN,
  부산: REGION.BUSAN,
  제주: REGION.JEJU,
};

const reverseAgeGroupMap: Record<AGE_GROUP, string> = {
  [AGE_GROUP.AGE_10]: '10대',
  [AGE_GROUP.AGE_20]: '20대',
  [AGE_GROUP.AGE_30]: '30대',
  [AGE_GROUP.AGE_40]: '40대',
  [AGE_GROUP.AGE_50]: '50대',
  [AGE_GROUP.AGE_60]: '60대',
  [AGE_GROUP.AGE_70]: '70대',
  [AGE_GROUP.AGE_80]: '80대',
};

const reverseRegionMap: Record<REGION, string> = {
  [REGION.SEOUL]: '서울',
  [REGION.GYEONGGI]: '경기',
  [REGION.INCHEON]: '인천',
  [REGION.GANGWON]: '강원',
  [REGION.CHOUNGBUK]: '충북',
  [REGION.CHOUNGNAM]: '충남',
  [REGION.SEJONG]: '세종',
  [REGION.DAJEON]: '대전',
  [REGION.GYEONGBUK]: '경북',
  [REGION.GYEONGNAM]: '경남',
  [REGION.GWANGJU]: '광주',
  [REGION.JEONBUK]: '전북',
  [REGION.JEONNAM]: '전남',
  [REGION.DAEGU]: '대구',
  [REGION.ULSAN]: '울산',
  [REGION.BUSAN]: '부산',
  [REGION.JEJU]: '제주',
};

export class CreateCustomerDTO {
  name: string;
  gender: string;
  phoneNumber: string;
  ageGroup: AGE_GROUP;
  region: REGION;
  email: string;
  memo?: string;

  constructor(customer: CreateCustomerBodyType) {
    this.name = customer.name;
    this.gender = customer.gender;
    this.phoneNumber = customer.phoneNumber;
    this.ageGroup = ageGroupMap[customer.ageGroup];
    this.region = regionMap[customer.region];
    this.email = customer.email;
    this.memo = customer.memo;
  }
}

export class ResponseCustomerDTO {
  id: number;
  name: string;
  gender: string;
  phoneNumber: string;
  ageGroup: string;
  region: string;
  email: string;
  memo: string;
  contractCount: number;

  constructor(customer: Customer & { _count?: { contracts: number } }) {
    this.id = customer.id;
    this.name = customer.name;
    this.gender = customer.gender;
    this.phoneNumber = customer.phoneNumber;
    this.ageGroup = reverseAgeGroupMap[customer.ageGroup];
    this.region = reverseRegionMap[customer.region];
    this.email = customer.email;
    this.memo = customer.memo ?? '';
    this.contractCount = customer._count?.contracts ?? 0;
  }
}

export class UpdateCustomerDTO {
  name?: string;
  gender?: string;
  phoneNumber?: string;
  ageGroup?: AGE_GROUP;
  region?: REGION;
  email?: string;
  memo?: string;

  constructor(customer: Partial<CreateCustomerBodyType>) {
    if (customer.name !== undefined) this.name = customer.name;
    if (customer.gender !== undefined) this.gender = customer.gender;
    if (customer.phoneNumber !== undefined) this.phoneNumber = customer.phoneNumber;
    if (customer.ageGroup !== undefined) this.ageGroup = ageGroupMap[customer.ageGroup];
    if (customer.region !== undefined) this.region = regionMap[customer.region];
    if (customer.email !== undefined) this.email = customer.email;
    if (customer.memo !== undefined) this.memo = customer.memo;
  }
}

export class ResponseCustomerListDTO {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: ResponseCustomerDTO[];

  constructor(
    page: number,
    pageSize: number,
    result: {
      totalItemCount: number;
      customers: (Customer & { _count?: { contracts: number } })[];
    },
  ) {
    this.currentPage = page;
    this.totalPages = Math.ceil(result.totalItemCount / pageSize);
    this.totalItemCount = result.totalItemCount;
    this.data = result.customers.map((customer) => new ResponseCustomerDTO(customer));
  }
}
