import Car from '../../types/Car';

const carResponseDTO = (car: Car) => {
  const { companyId, ...carWithoutCompanyId } = car;
  return carWithoutCompanyId;
};

export default carResponseDTO;
