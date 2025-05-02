import Car from '../../types/Car';

const carResponseDTO = (car: Car) => {
  const { companyId, modelId, ...carWithoutCompanyId } = car;
  return carWithoutCompanyId;
};

export default carResponseDTO;
