import UserModel from "@/app/models/User";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }) => {

  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        isVerifiedToken: hashedToken, isVerifiedTokenExpiry:Date.now() + 3600000}) // expiry token for 1 hr
      }else if(emailType === "RESET"){
        await UserModel.findByIdAndUpdate(userId, {
        isForgotPasswordToken: hashedToken, isForgotPasswordTokenExpiry:Date.now() + 3600000})
    }
    const mailOptions = {
      from: "nameer@nameer.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY"? getVerifyEmailHtml(hashedToken): getResetEmailHtml(hashedToken)
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new error(error.message);
  }
};

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cce368d4c96863",
    pass: "cbf4d0daa2216c"
  }
});


const getVerifyEmailHtml = (token) => `
  <html>
    <body>
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${process.env.DOMAIN}/verifyemail?token=${token}">Verify Email</a>
      <p>This link will expire in 1 hour.</p>
    </body>
  </html>
`;

const getResetEmailHtml = (token) => `
  <html>
    <body>
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.DOMAIN}/resetemail?token=${token}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    </body>
  </html>
`;