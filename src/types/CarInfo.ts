import Car from './Car';

interface CarInfo extends Car {
  manufacturer: string;
  model: string;
  type: string;
}

export default CarInfo;
