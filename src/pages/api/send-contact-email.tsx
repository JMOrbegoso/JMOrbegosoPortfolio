import { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../lib/send-email';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({
      error: {
        code: 'error_sending_email',
        message:
          "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      error: {
        code: 'error_sending_email',
        message: 'Names, email and message are necessary.',
      },
    });
  }

  const result = await sendEmail(firstName, lastName, email, message);

  if (!result) {
    return res.status(500).json({
      error: {
        code: 'error_sending_email',
        message: 'Internal server error.',
      },
    });
  }

  return res.status(200).end();
};
