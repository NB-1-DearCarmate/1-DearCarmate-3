import { Router } from "express";
import { createContract } from "../controllers/contractController";
import passport from "passport";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createContract
);

export default router;
