const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service: 'Outlook365',
	host: 'smtp.office365.com',
	tls: {
		ciphers: 'SSLv3',
		rejectUnauthorized: false,
	},
	auth: {
		user: process.env.BOT_EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

/****Sends email with verification code to given email address returns Promise Object****/
module.exports.sendVerifyEmail = (email, name, code) => {
	console.log('Sending email to...' + email);

	let mailOptions = {
		from: process.env.BOT_EMAIL,
		to: email,
		subject: 'Verification Code',
		text: `Hello ${name}, your verification code is: ${code}.`,
	};

	return new Promise(function (resolve, reject) {
		// transporter.sendMail(mailOptions, function (error, data) {
		// 	if (error) {
		// 		reject(false);
		// 		console.log('Error Occured: ' + error);
		// 	} else {
		// 		resolve(true);
		// 		console.log('Email Sent!');
		// 	}
		// });
		transporter.sendMail(mailOptions, function (error, data) {
			resolve(true);
		});
	});
};
