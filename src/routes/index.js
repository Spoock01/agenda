/** @format */

import { CONSTANT_OK } from "../utils/constants";
import express from "express";
import { newTaskValidator } from "../validators/index.js";

const router = express.Router();

router.post("/new-task", newTaskValidator, async (req, res) => {
	const { description, dateTime, email } = req.body;
	const { createTask } = req.app.locals.settings;

	createTask({ description, dateTime, email });

	res.status(CONSTANT_OK).json(`${description} ${dateTime} ${email}`);
});

export default router;
