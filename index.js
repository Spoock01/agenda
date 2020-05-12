/** @format */

import createCore from "./core";
import express from "express";
import router from "./src/routes/index.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
	console.log(`Server started on ${PORT}!`);
	const core = createCore();
	core.start();
	app.set("createTask", core.createNewTask);
});
