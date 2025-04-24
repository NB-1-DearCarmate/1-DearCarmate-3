import { Router } from "express";
import { createContract, updateContract} from "../controllers/contractController";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createContract);

router.patch("/:id", passport.authenticate("jwt", { session: false }), updateContract);

export default router;
