/** @format */

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const newTaskSchema = Joi.object({
	description: Joi.string().min(5).max(40).required(),
	dateTime: Joi.date().format("YYYY-MM-DD HH:mm").min(new Date()).required(),
	email: Joi.string().email().required()
});

export default newTaskSchema;
