import sendgrid from '@sendgrid/mail';
import { CONTACT_EMAIL_SUBJECT } from './constants';

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export default async (
  firstName: string,
  lastName: string,
  email: string,
  message: string,
) => {
  const msg = {
    to: process.env.CONTACT_EMAIL_RECEIVER,
    from: process.env.CONTACT_EMAIL_SENDER ?? '',
    subject: CONTACT_EMAIL_SUBJECT,
    html: `
    <html>
  <head>
    <style>
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <th>First Name:</th>
        <td>${firstName}</td>
      </tr>
      <tr>
        <th>Last Name:</th>
        <td>${lastName}</td>
      </tr>
      <tr>
        <th>Email:</th>
        <td>${email}</td>
      </tr>
      <tr>
        <th>Message:</th>
        <td>${message}</td>
      </tr>
    </table>
  </body>
</html>
    `,
  };
  sendgrid
    .send(msg)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
    });

  return false;
};
