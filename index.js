/** @format */

import Agenda from "agenda";
import agenda from "./src/agenda/index.js";
import express from "express";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
	console.log("Server started!");
});
