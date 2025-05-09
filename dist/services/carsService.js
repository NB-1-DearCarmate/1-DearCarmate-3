"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCar = createCar;
exports.getCarList = getCarList;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
exports.getCar = getCar;
exports.getCarModelList = getCarModelList;
exports.carUpload = carUpload;
const BadRequestError_1 = __importDefault(require("../lib/errors/BadRequestError"));
const carsRepository = __importStar(require("../repositories/carsRepository"));
const manufacturerRepository = __importStar(require("../repositories/manufacturerRepository"));
const carsModelRepository = __importStar(require("../repositories/carsModelRepository"));
const carsTypeRepository = __importStar(require("../repositories/carsTypeRepository"));
const carDTO_1 = require("../lib/dtos/carDTO");
function createCar(data, companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const manufacturer = yield manufacturerRepository.getManufacturerByName(data.manufacturer);
        if (!manufacturer) {
            throw new BadRequestError_1.default('제조사가 없습니다');
        }
        const carModel = yield carsModelRepository.getCarModelByModel(data.model, manufacturer.id);
        if (!carModel) {
            throw new BadRequestError_1.default('차종이 없습니다');
        }
        const carType = yield carsTypeRepository.getCarTypeById(carModel.typeId);
        if (!carType) {
            throw new BadRequestError_1.default('타입이 없습니다');
        }
        const car = yield carsRepository.createCar(new carDTO_1.CreateCarDTO(data, companyId, carModel.id));
        return Object.assign(Object.assign({}, car), { manufacturer: manufacturer.name, model: carModel.model, type: carType.type, explanation: (_a = car.explanation) !== null && _a !== void 0 ? _a : undefined, accidentDetails: (_b = car.accidentDetails) !== null && _b !== void 0 ? _b : undefined });
    });
}
function getCarList(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield carsRepository.getCarList(params);
    });
}
function updateCar(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!data.manufacturer || !data.model) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const manufacturer = yield manufacturerRepository.getManufacturerByName(data.manufacturer);
        if (!manufacturer) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const carModel = yield carsModelRepository.getCarModelByModel(data.model, manufacturer.id);
        if (!carModel) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const carType = yield carsTypeRepository.getCarTypeById(carModel.typeId);
        if (!carType) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const updatedCar = yield carsRepository.updateCar(id, new carDTO_1.UpdateCarDTO(data, carModel.id));
        return Object.assign(Object.assign({}, updatedCar), { manufacturer: manufacturer.name, model: carModel.model, type: carType.type, explanation: (_a = updatedCar.explanation) !== null && _a !== void 0 ? _a : undefined, accidentDetails: (_b = updatedCar.accidentDetails) !== null && _b !== void 0 ? _b : undefined });
    });
}
function deleteCar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield carsRepository.deleteCar(id);
    });
}
function getCar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const car = yield carsRepository.getCar(id);
        if (!car) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const carModel = yield carsModelRepository.getCarModelById(car.modelId);
        if (!carModel) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const manufacturer = yield manufacturerRepository.getManufacturerById(carModel.manufacturerId);
        if (!manufacturer) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        const carType = yield carsTypeRepository.getCarTypeById(carModel.typeId);
        if (!carType) {
            throw new BadRequestError_1.default('잘못된 요청입니다');
        }
        return Object.assign(Object.assign({}, car), { manufacturer: manufacturer.name, model: carModel.model, type: carType.type, explanation: (_a = car.explanation) !== null && _a !== void 0 ? _a : undefined, accidentDetails: (_b = car.accidentDetails) !== null && _b !== void 0 ? _b : undefined });
    });
}
function getCarModelList() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield manufacturerRepository.getManufacturerList();
    });
}
function carUpload(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const mappedCars = yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield manufacturerRepository.getManufacturerByName(item.manufacturer);
            if (!manufacturer) {
                throw new BadRequestError_1.default('잘못된 요청입니다');
            }
            const carModel = yield carsModelRepository.getCarModelByModel(item.model, manufacturer.id);
            if (!carModel) {
                throw new BadRequestError_1.default('잘못된 요청입니다');
            }
            const carType = yield carsTypeRepository.getCarTypeById(carModel.typeId);
            if (!carType) {
                throw new BadRequestError_1.default('잘못된 요청입니다');
            }
            return {
                carNumber: item.carNumber,
                manufacturingYear: item.manufacturingYear,
                mileage: item.mileage,
                price: item.price,
                accidentCount: item.accidentCount,
                explanation: item.explanation || '',
                accidentDetails: item.accidentDetails || '',
                companyId: item.companyId,
                modelId: carModel.id,
            };
        })));
        const carUpload = yield carsRepository.createCars(mappedCars);
        return carUpload;
    });
}
