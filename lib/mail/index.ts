import { createTransport } from "nodemailer";
import { readFileSync } from "fs";
import { join } from "path";

type TypeMail = "forgotpassword" | "welcome";

export default class TransportMailer {
    private from = "marlon@biggy.com.br";
    private transport = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: this.from,
            pass: "1qaz2wsx",
        },
    });

    /**
     * Prepare mail for send
     *
     * @param {TypeMail} type
     * @param {string} to
     * @param {*} data
     * @memberof TransportMailer
     */
    public prepareMail(type: TypeMail, to: string, tokens: any) {
        const templatePath = join(__dirname, `/templates/${type}.html`);
        let template = readFileSync(templatePath, "utf-8");

        Object.entries(tokens).map((token) =>
            template = template.replace(token[0], token[1].toString()));

        return this.transportMail(template, this.defineSubject(type), to);
    }

    /**
     * Define subject to mail according with type mail
     *
     * @param {string} type
     * @returns {string}
     * @memberof TransportMailer
     */
    private defineSubject(type: string): string {
        let subject = "";

        if (type === "forgotpassword") {
            subject = "Recuração de senha";
        } else if (type === "welcome") {
            subject = "Welcome content creator";
        }

        return subject;
    }

    /**
     * Send mail
     *
     * @private
     * @param {string} template
     * @param {string} subject
     * @param {string} to
     * @returns {Promise<any>}
     * @memberof TransportMailer
     */
    private transportMail(template: string, subject: string, to: string): Promise<any> {
        const options = {
            from: this.from,
            to,
            subject,
            html: template,
        };

        return new Promise((resolve, reject) => {
            this.transport.sendMail(options, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
}
