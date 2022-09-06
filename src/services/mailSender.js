import nodeMailer from 'nodemailer';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { logger } from './logger';

// create transporter for sending email
const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secured: true,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = (to, subject, mailBody) => {
    if (process.env.EMAIL_WHITELIST === '1') {
        if (!existsSync('./mailWhitelist.json')) writeFileSync('./mailWhitelist.json', '[]');

        const mailWhiteList = JSON.parse(
            readFileSync('./mailWhitelist.json', { encoding: 'utf-8' })
        );
        if (!mailWhiteList.includes(to)) {
            logger.info(
                `To: ${to}\nSubject: ${subject}\nContent:\n${mailBody}`
            );
            return;
        }
    }

    // mail setting variable
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to, // list of recipients
        subject,
        html: mailBody
    };

    // call send email function
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) logger.error(err);
        if(info) logger.info('Done sending!', { accepted: info.accepted, rejected: info.rejected });
    });
};

const validateEmail = (email) => {
    const emailRegex = /^([\w!#$%&'*+\-/=?^`{|}~]+)(\.[\w!#$%&'*+\-/=?^`{|}~]+)*@[\w-]{1,63}(\.[\w-]{1,63})+$/;
    return emailRegex.test(email);
};

export { sendMail, validateEmail };
