/** @format */

import env from "../../env/index.js";
import nodemailer from "nodemailer";

let transporter;

export const createTransport = () => {
	console.log(`[EMAIL_SERVICE] Creating transport...`);

	try {
		transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: env.USER_EMAIL,
				pass: env.PASSWORD
			}
		});
	} catch (error) {
		console.log(`[EMAIL_SERVICE] - Failed! ${error}`);
	}
};

export const emailSender = async (destiny, message) => {
	var mailOptions = {
		from: "twittertestapi01@gmail.com",
		to: destiny,
		subject: "Sending Email From Agenda",
		text: message
	};

	console.log(`Sending email to ${destiny} with ${message}`);

	await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(`Error in sendMail: ${error}`);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	});
};
