import { Router } from "express";

const router = Router();

router.route("/status").get((req, res) => {
  console.log("Request received at /");
  res.send("I am from the server");
});

export default router;
