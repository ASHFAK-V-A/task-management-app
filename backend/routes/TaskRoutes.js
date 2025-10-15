import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getTasks, createTask, updateTask, deleteTask, ViewTask, getTaskStats } from "../controllers/TaskController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/stats", getTaskStats);
router.get("/", getTasks);
router.get("/:id", ViewTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
