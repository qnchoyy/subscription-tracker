import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD } from './env.js';

export const accountEmail = 'yanislav.aleksandrov77@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    },
    secure: true,
    requireTLS: true,
});
export default transporter;