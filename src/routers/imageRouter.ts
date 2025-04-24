import { Router } from "express";
import upload from "../lib/multer";
import { uploadImage } from "../controllers/imageController";
import passport from "passport"; 

const router = Router();

router.post(
    "/upload",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    uploadImage
  );  

export default router;
