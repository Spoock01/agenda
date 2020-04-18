/** @format */

import { validateDateTime, validateEmail } from "../validators/index.js";
import { startAgenda, createNewTask } from "../agenda/index.js";

import express from "express";

const router = express.Router();

startAgenda();

router.post("/new-task", validateDateTime, validateEmail, async (req, res) => {
	const { description, dateTime, email } = req.body;

	createNewTask("10 seconds", email, description);

	res.status(200).send(`${description} ${dateTime} ${email}`);
});

export default router;
