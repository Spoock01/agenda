/** @format */

import Agenda from "agenda";
import env from "../env/index.js";
import { emailSender } from "../utils/EmailSender/index.js";
import { createTransport } from "../utils/EmailSender/index.js";

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
		} catch (error) {
			throw new Error(`[AGENDA] - Error starting service! ${error}`);
		}
		console.log(`[AGENDA] - Agenda successfully started!`);
	};

	const createNewTask = async (dateTimeMinutes, email, description) => {
		console.log(`[AGENDA] - RECEIVED`);

		agenda.define(
			description,
			{ priority: "high", concurrency: 10 },
			async (job) => {
				const { to } = job.attrs.data;
				await emailClient.send({
					to,
					from: "example@example.com",
					subject: "Email Report",
					body: "..."
				});
			}
		);

		// await agenda.schedule(dateTimeMinutes, description, { to: email });
	};

	return {
		startAgenda,
		createNewTask
	};
};

export default createAgenda;
