const nodemailer = require("nodemailer");
const fs = require('fs').promises;

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});
const readTemplateByPath = async (subpath) => {
    const data = await fs.readFile(`${__dirname}/templates/${subpath}`, "utf-8");
    return data.toString();
};

module.exports = {
	transporter,
	readTemplateByPath
};