import express from "express";
import { accessChat, fetchChats, createGroupChat, removeFromGroup, addToGroup, renameGroup } from "../controllers/chat.js";

const router = express.Router();

router.route("/").post(fetchChats);
router.route("/access").post(accessChat);
router.route("/group").post(createGroupChat);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);
router.route("/grouprename").put(renameGroup);

export default router;
