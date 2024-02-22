import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.email_smtp_host,
    port: Number(config.email_smtp_port),
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.email_smtp_auth_user,
      pass: config.email_smtp_auth_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_send_from, // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
