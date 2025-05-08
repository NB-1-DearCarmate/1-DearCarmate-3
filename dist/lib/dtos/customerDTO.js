"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCustomerListDTO = exports.UpdateCustomerDTO = exports.ResponseCustomerDTO = exports.CreateCustomerDTO = void 0;
const client_1 = require("@prisma/client");
const ageGroupMap = {
    '10대': client_1.AGE_GROUP.AGE_10,
    '20대': client_1.AGE_GROUP.AGE_20,
    '30대': client_1.AGE_GROUP.AGE_30,
    '40대': client_1.AGE_GROUP.AGE_40,
    '50대': client_1.AGE_GROUP.AGE_50,
    '60대': client_1.AGE_GROUP.AGE_60,
    '70대': client_1.AGE_GROUP.AGE_70,
    '80대': client_1.AGE_GROUP.AGE_80,
};
const regionMap = {
    서울: client_1.REGION.SEOUL,
    경기: client_1.REGION.GYEONGGI,
    인천: client_1.REGION.INCHEON,
    강원: client_1.REGION.GANGWON,
    충북: client_1.REGION.CHOUNGBUK,
    충남: client_1.REGION.CHOUNGNAM,
    세종: client_1.REGION.SEJONG,
    대전: client_1.REGION.DAJEON,
    경북: client_1.REGION.GYEONGBUK,
    경남: client_1.REGION.GYEONGNAM,
    광주: client_1.REGION.GWANGJU,
    전북: client_1.REGION.JEONBUK,
    전남: client_1.REGION.JEONNAM,
    대구: client_1.REGION.DAEGU,
    울산: client_1.REGION.ULSAN,
    부산: client_1.REGION.BUSAN,
    제주: client_1.REGION.JEJU,
};
const reverseAgeGroupMap = {
    [client_1.AGE_GROUP.AGE_10]: '10대',
    [client_1.AGE_GROUP.AGE_20]: '20대',
    [client_1.AGE_GROUP.AGE_30]: '30대',
    [client_1.AGE_GROUP.AGE_40]: '40대',
    [client_1.AGE_GROUP.AGE_50]: '50대',
    [client_1.AGE_GROUP.AGE_60]: '60대',
    [client_1.AGE_GROUP.AGE_70]: '70대',
    [client_1.AGE_GROUP.AGE_80]: '80대',
};
const reverseRegionMap = {
    [client_1.REGION.SEOUL]: '서울',
    [client_1.REGION.GYEONGGI]: '경기',
    [client_1.REGION.INCHEON]: '인천',
    [client_1.REGION.GANGWON]: '강원',
    [client_1.REGION.CHOUNGBUK]: '충북',
    [client_1.REGION.CHOUNGNAM]: '충남',
    [client_1.REGION.SEJONG]: '세종',
    [client_1.REGION.DAJEON]: '대전',
    [client_1.REGION.GYEONGBUK]: '경북',
    [client_1.REGION.GYEONGNAM]: '경남',
    [client_1.REGION.GWANGJU]: '광주',
    [client_1.REGION.JEONBUK]: '전북',
    [client_1.REGION.JEONNAM]: '전남',
    [client_1.REGION.DAEGU]: '대구',
    [client_1.REGION.ULSAN]: '울산',
    [client_1.REGION.BUSAN]: '부산',
    [client_1.REGION.JEJU]: '제주',
};
class CreateCustomerDTO {
    constructor(customer) {
        this.name = customer.name;
        this.gender = customer.gender;
        this.phoneNumber = customer.phoneNumber;
        this.ageGroup = ageGroupMap[customer.ageGroup];
        this.region = regionMap[customer.region];
        this.email = customer.email;
        this.memo = customer.memo;
    }
}
exports.CreateCustomerDTO = CreateCustomerDTO;
class ResponseCustomerDTO {
    constructor(customer) {
        var _a, _b, _c;
        this.id = customer.id;
        this.name = customer.name;
        this.gender = customer.gender;
        this.phoneNumber = customer.phoneNumber;
        this.ageGroup = reverseAgeGroupMap[customer.ageGroup];
        this.region = reverseRegionMap[customer.region];
        this.email = customer.email;
        this.memo = (_a = customer.memo) !== null && _a !== void 0 ? _a : '';
        this.contractCount = (_c = (_b = customer._count) === null || _b === void 0 ? void 0 : _b.contracts) !== null && _c !== void 0 ? _c : 0;
    }
}
exports.ResponseCustomerDTO = ResponseCustomerDTO;
class UpdateCustomerDTO {
    constructor(customer) {
        if (customer.name !== undefined)
            this.name = customer.name;
        if (customer.gender !== undefined)
            this.gender = customer.gender;
        if (customer.phoneNumber !== undefined)
            this.phoneNumber = customer.phoneNumber;
        if (customer.ageGroup !== undefined)
            this.ageGroup = ageGroupMap[customer.ageGroup];
        if (customer.region !== undefined)
            this.region = regionMap[customer.region];
        if (customer.email !== undefined)
            this.email = customer.email;
        if (customer.memo !== undefined)
            this.memo = customer.memo;
    }
}
exports.UpdateCustomerDTO = UpdateCustomerDTO;
class ResponseCustomerListDTO {
    constructor(page, pageSize, result) {
        this.currentPage = page;
        this.totalPages = Math.ceil(result.totalItemCount / pageSize);
        this.totalItemCount = result.totalItemCount;
        this.data = result.customers.map((customer) => new ResponseCustomerDTO(customer));
    }
}
exports.ResponseCustomerListDTO = ResponseCustomerListDTO;
