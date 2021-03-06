/** @format */

import createAgenda from "./src/agenda/index";

const createCore = () => {
	const agenda = createAgenda();

	const start = async () => {
		console.log(`[CORE] - Starting core services!`);
		console.log(`[CORE] - Changing timezone to Recife`);
		process.env.TZ = "America/Recife";

		await agenda.startAgenda();
		console.log(`[CORE] - Core successfully started!`);
	};
	const stop = () => {};

	return {
		start,
		stop,
		createNewTask: agenda.createNewTask
	};
};

export default createCore;
