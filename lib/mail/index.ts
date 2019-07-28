import * as nodeMailer from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";

const transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f398ae4fa6a315",
        pass: "2edaf6ff62f590",
    },
});

transport.use("compile", hbs({
    viewEngine: {
        extname: ".handlebars",
        layoutsDir: "dist/mail/templates",
        partialsDir: "dist/mail/templates",
    },
    viewPath: "dist/mail/templates",
    extname: ".handlebars",
}));

export default transport;