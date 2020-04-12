/** @format */

import Validator from "schema-validator";
import emailValidator from "./schemas/Email.js";

// import emailValidator from "./schemas/DateTime.js";

export const validateDateTime = (req, res, next) => {
	const validator = new Validator(emailValidator);

	const { email } = req.body;
	const result = validator.check({ email });

	if (result._error) {
		return res.status(500).json(result);
	}
	next();
};

export const validateEmail = (req, res, next) => {
	const validator = new Validator(emailValidator);

	const { email } = req.body;
	const result = validator.check({ email });

	if (result._error) {
		return res.status(500).json(result);
	}
	next();
};
