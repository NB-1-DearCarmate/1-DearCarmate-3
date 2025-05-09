"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCarDropdownDTO = exports.ResponseUserDropdownDTO = exports.ResponseCustomerDropdownDTO = exports.ResponseContractListDTO = exports.ResponseContractDTO = void 0;
const client_1 = require("@prisma/client");
class ResponseContractDTO {
    constructor(contract) {
        this.id = contract.id;
        this.contractPrice = contract.contractPrice.toNumber();
        this.status = contract.status;
        this.resolutionDate = contract.resolutionDate;
        this.user = { id: contract.user.id, name: contract.user.name };
        this.customer = { id: contract.customer.id, name: contract.customer.name };
        this.car = { id: contract.car.id, model: contract.car.carModel.model };
        this.meetings = contract.meetings.map((m) => ({ date: m.time.toISOString() }));
    }
}
exports.ResponseContractDTO = ResponseContractDTO;
class ContractListItemDTO {
    constructor(contract) {
        this.id = contract.id;
        this.car = { id: contract.car.id, model: contract.car.carModel.model };
        this.customer = { id: contract.customer.id, name: contract.customer.name };
        this.user = { id: contract.user.id, name: contract.user.name };
        this.meetings = contract.meetings.map((m) => ({ date: m.time.toISOString() }));
        this.contractPrice = contract.contractPrice.toNumber();
        this.resolutionDate = contract.resolutionDate;
        this.status = contract.status;
    }
}
class ResponseContractListDTO {
    constructor(contracts) {
        this.carInspection = { totalItemCount: 0, data: [] };
        this.priceNegotiation = { totalItemCount: 0, data: [] };
        this.contractDraft = { totalItemCount: 0, data: [] };
        this.contractSuccessful = { totalItemCount: 0, data: [] };
        this.contractFailed = { totalItemCount: 0, data: [] };
        this.statusMap = {
            [client_1.CONTRACT_STATUS.VEHICLE_CHECKING]: 'carInspection',
            [client_1.CONTRACT_STATUS.PRICE_CHECKING]: 'priceNegotiation',
            [client_1.CONTRACT_STATUS.CONTRACT_PREPARING]: 'contractDraft',
            [client_1.CONTRACT_STATUS.CONTRACT_SUCCESS]: 'contractSuccessful',
            [client_1.CONTRACT_STATUS.CONTRACT_FAILED]: 'contractFailed',
        };
        contracts.forEach((contract) => {
            const key = this.statusMap[contract.status];
            if (key) {
                this[key].data.push(new ContractListItemDTO(contract));
                this[key].totalItemCount++;
            }
        });
    }
}
exports.ResponseContractListDTO = ResponseContractListDTO;
class ResponseCustomerDropdownDTO {
    constructor(customers) {
        return customers.map(({ id, name, email }) => ({
            id,
            data: `${name}(${email})`,
        }));
    }
}
exports.ResponseCustomerDropdownDTO = ResponseCustomerDropdownDTO;
class ResponseUserDropdownDTO {
    constructor(users) {
        return users.map(({ id, name, email }) => ({
            id,
            data: `${name}(${email})`,
        }));
    }
}
exports.ResponseUserDropdownDTO = ResponseUserDropdownDTO;
class ResponseCarDropdownDTO {
    constructor(cars) {
        return cars.map((car) => ({
            id: car.id,
            data: `${car.carModel.model}(${car.carNumber})`,
        }));
    }
}
exports.ResponseCarDropdownDTO = ResponseCarDropdownDTO;
