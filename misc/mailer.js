const nodemailer = require('nodemailer');

module.exports = function (email) {
	this.email = email;
	this.send = function (message) {
		console.log('Sending email to...' + email);
		let transporter = nodemailer.createTransport({
			service: 'outlook',
			auth: {
				user: `${process.env.BOT_EMAIL}`,
				pass: `${process.env.EMAIL_PASS}`,
			},
		});

		let mailOptions = {
			from: `${process.env.ADMIN_EMAIL}`,
			to: email,
			subject: 'Verification Code',
			text: message,
		};

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				console.log('Error Occured: ' + err);
				return false;
			} else {
				console.log('Email Sent!');
				return true;
			}
		});
	};
};
