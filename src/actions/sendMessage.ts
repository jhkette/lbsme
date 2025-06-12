"use server";
import { transporter } from "@/lib/transporter";
interface SendMessageParams {
    email: string;
    name: string;
    message: string;
}

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export async function sendMessage(name: string, email: string,  message: string): Promise<any> {

    const mailOptions: MailOptions = {
        from: email,
        to: "joseph.ketterer@gmail.com",
        subject: `${name.toUpperCase()} sent you a message from Portfolio`,
        text: message,
    };
    console.log(mailOptions)
    await new Promise<void>((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error: Error | null, success: true) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve();
            }
        });
    });
    try {
        await new Promise<void>((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err: Error|null, info: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });

        return true
    } catch (err) {
        console.error(err);
        return {error: "There was an error sending the email"}
    }
}
