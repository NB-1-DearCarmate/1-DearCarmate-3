import { Router } from "express";
import { createContract, updateContract, getAllContracts, getContractById } from "../controllers/contractController";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createContract);

router.patch("/:id", passport.authenticate("jwt", { session: false }), updateContract);

router.get("/", passport.authenticate("jwt", { session: false }), getAllContracts);
router.get("/:id", passport.authenticate("jwt", { session: false }), getContractById);

export default router;
