import nodemailer from 'nodemailer'
import { EMAIL, EMAIL_KEY } from '../config';

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: EMAIL,
        pass: EMAIL_KEY,
    },
    secure: true,
});

const sendMail = (to: string, subject: string, text: string) => {
    const mailData = {
        from: EMAIL,  // sender address
        to: to,   // list of receivers
        subject: subject,
        html: text,
    };

    transporter.sendMail(mailData, function (err, success) {
        if (err)
            console.log(err)
        else
            console.log(success);
    });
}

export {
    sendMail
}
