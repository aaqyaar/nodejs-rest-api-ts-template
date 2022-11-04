const nodemailer = require("nodemailer");

export const sendEmail = (options: any) => {
  const smtpTransparent = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    service: "gmail",
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
  });

  const mailOptions = {
    from: `"From " <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  return smtpTransparent.sendMail(mailOptions);
};
