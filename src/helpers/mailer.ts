import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const mailOptions = {
      from: "nameer@nameer.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    
  } catch (error) {
    throw new error(error.message);
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});
