import Auth from "../controllers/auth/auth";
import { Router } from "express";

const router = Router();

router.post("/auth/register", Auth.register);
router.post("/auth/login", Auth.login);
router.get("/auth", () => {
  console.log("auth");
});

export default router;
