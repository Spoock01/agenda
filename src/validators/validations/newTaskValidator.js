/** @format */

import { CONSTANT_BAD_REQUEST } from "../../utils/constants";
import newTaskSchema from "../schemas/newTaskSchema.js";

const newTaskValidator = async (req, res, next) => {
	try {
		await newTaskSchema.validateAsync(req.body);
	} catch (error) {
		return res
			.status(CONSTANT_BAD_REQUEST)
			.json({ status: CONSTANT_BAD_REQUEST, error });
	}
	next();
};

export { newTaskValidator };
