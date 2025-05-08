"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCarModelListDTO = exports.ResponseCarListDTO = exports.UpdateCarDTO = exports.CreateCarDTO = exports.CarResponseDTO = void 0;
// export const carResponseDTO = (car: Car) => {
//   const { companyId, modelId, ...carWithoutCompanyId } = car;
//   return carWithoutCompanyId;
// };
class CarResponseDTO {
    constructor(car) {
        this.id = car.id;
        this.carNumber = car.carNumber;
        this.manufacturingYear = car.manufacturingYear;
        this.mileage = car.mileage;
        this.price = car.price;
        this.accidentCount = car.accidentCount;
        this.explanation = car.explanation || '';
        this.accidentDetails = car.accidentDetails || '';
        this.status = car.status;
        this.manufacturer = car.manufacturer;
        this.model = car.model;
        this.type = car.type;
    }
}
exports.CarResponseDTO = CarResponseDTO;
class CreateCarDTO {
    constructor(data, companyId, modelId) {
        this.carNumber = data.carNumber;
        this.manufacturingYear = data.manufacturingYear;
        this.mileage = data.mileage;
        this.price = data.price;
        this.accidentCount = data.accidentCount;
        this.explanation = data.explanation || '';
        this.accidentDetails = data.accidentDetails || '';
        this.companyId = companyId;
        this.modelId = modelId;
    }
}
exports.CreateCarDTO = CreateCarDTO;
class UpdateCarDTO {
    constructor(data, modelId) {
        var _a, _b;
        if (data.carNumber !== undefined)
            this.carNumber = data.carNumber;
        if (data.manufacturingYear !== undefined)
            this.manufacturingYear = data.manufacturingYear;
        if (data.mileage !== undefined)
            this.mileage = data.mileage;
        if (data.price !== undefined)
            this.price = data.price;
        if (data.accidentCount !== undefined)
            this.accidentCount = data.accidentCount;
        if (data.explanation !== undefined)
            this.explanation = (_a = data.explanation) !== null && _a !== void 0 ? _a : '';
        if (data.accidentDetails !== undefined)
            this.accidentDetails = (_b = data.accidentDetails) !== null && _b !== void 0 ? _b : '';
        this.modelId = modelId;
    }
}
exports.UpdateCarDTO = UpdateCarDTO;
class ResponseCarListDTO {
    constructor(page, pageSize, result) {
        this.currentPage = page;
        this.totalPages = Math.ceil(result.totalItemCount / pageSize);
        this.totalItemCount = result.totalItemCount;
        this.data = result.mappedCars;
    }
}
exports.ResponseCarListDTO = ResponseCarListDTO;
class ResponseCarModelDTO {
    constructor(manufacturer, models) {
        this.manufacturer = manufacturer;
        this.model = models;
    }
}
class ResponseCarModelListDTO {
    constructor(manufacturers) {
        this.data = manufacturers
            .filter((manufacturer) => manufacturer.carModels.length > 0)
            .map((manufacturer) => new ResponseCarModelDTO(manufacturer.name, manufacturer.carModels.map((carModel) => carModel.model)));
    }
}
exports.ResponseCarModelListDTO = ResponseCarModelListDTO;
