/** @format */

import { validateDateTime, validateEmail } from "../validators/index.js";

import express from "express";

const router = express.Router();

router.post("/new-task", validateDateTime, validateEmail, async (req, res) => {
	const { description, dateTime, email } = req.body;
	res.status(200).send(`${description} ${dateTime} ${email}`);
});

export default router;
