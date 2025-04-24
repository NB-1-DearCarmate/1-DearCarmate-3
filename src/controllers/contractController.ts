import { Request, Response } from "express";
import { createContractService, updateContractService } from "../services/contractService";

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await createContractService(req.body);
    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "계약 생성 실패" });
  }
};

export const updateContract = async (req: Request, res: Response) => {
    try {
      const contractId = parseInt(req.params.id);
      const updated = await updateContractService(contractId, req.body);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "계약 수정 실패" });
    }
  };