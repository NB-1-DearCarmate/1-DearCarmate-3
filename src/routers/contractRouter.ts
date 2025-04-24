import { Router } from "express";
import { createContract, updateContract, getAllContracts, getContractById, deleteContract, updateContractStatus, getCustomersForContract, } from "../controllers/contractController";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createContract);

router.patch("/:id", passport.authenticate("jwt", { session: false }), updateContract);

router.get("/", passport.authenticate("jwt", { session: false }), getAllContracts);
router.get("/:id", passport.authenticate("jwt", { session: false }), getContractById);

router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteContract);

router.patch("/:id/status", passport.authenticate("jwt", { session: false }), updateContractStatus);

router.get(
    "/customers",
    passport.authenticate("jwt", { session: false }),
    getCustomersForContract
  );  

export default router;
