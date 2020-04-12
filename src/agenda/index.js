/** @format */

import Agenda from "agenda";
import env from "../env/index.js";

const connectionString =
	"mongodb+srv://omnistack:VnZBeO5UFcs8fZ8k@cluster0-2ehby.mongodb.net/test?retryWrites=true&w=majority";

const agenda = new Agenda({
	db: {
		address: connectionString,
		options: { useUnifiedTopology: false }
	},
	processEvery: env.PROCESS_EVERY
});

export const startAgenda = async () => {
	await agenda.start();
};

export const createNewTask = async (dateTimeMinutes, email, description) => {
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

	await agenda.schedule(dateTimeMinutes, description, { to: email });
};

export default agenda;
