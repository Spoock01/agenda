/** @format */

import Agenda from "agenda";
import { createTransport } from "../utils/EmailSender/index.js";
import { emailSender } from "../utils/EmailSender/index.js";
import env from "../env/index.js";

const createAgenda = () => {
	const connectionString =
		"mongodb+srv://omnistack:VnZBeO5UFcs8fZ8k@cluster0-2ehby.mongodb.net/test?retryWrites=true&w=majority";

	const agenda = new Agenda({
		db: {
			address: connectionString,
			options: { useUnifiedTopology: false }
		},
		processEvery: env.PROCESS_EVERY
	});

	const startAgenda = async () => {
		console.log(`[AGENDA] - Starting agenda services!`);
		try {
			await agenda.start();
			createTransport();
		} catch (error) {
			throw new Error(`[AGENDA] - Error starting service! ${error}`);
		}
		console.log(`[AGENDA] - Agenda successfully started!`);
	};

	const createNewTask = async ({ dateTime, email, description }) => {
		console.log(`[AGENDA] - RECEIVED`);

		agenda.define(
			description,
			{ priority: "high", concurrency: 10 },
			async (job) => {
				const { to } = job.attrs.data;
				try {
					await emailSender(to, description);
				} catch (error) {
					console.log(error);
				}

				console.log("Task running to: " + to);
			}
		);

		var dateTimeNow = new Date();
		dateTimeNow.setHours(12);
		var dateTimeMinutes = new Date(dateTime);
		dateTimeMinutes.setHours(12);

		var secNow = dateTimeNow.getTime() / 1000;
		var secFut = dateTimeMinutes.getTime() / 1000;
		var secondsFromNow = Math.ceil(secFut - secNow);

		console.log(`The task will run in ${secondsFromNow} seconds`);

		await agenda.schedule(`in ${secondsFromNow} seconds`, description, {
			to: email,
			description
		});
	};

	return {
		startAgenda,
		createNewTask
	};
};

export default createAgenda;
