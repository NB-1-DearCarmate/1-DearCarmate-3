import { CAR_STATUS } from '@prisma/client';

interface Car {
  id: number;
  companyId: number;
  carNumber: string;
  modelId: number;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation?: string;
  accidentDetails?: string;
  status: CAR_STATUS;
  manufacturer: string;
  model: string;
  type: string;
}

export default Car;
