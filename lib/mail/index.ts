import * as nodeMailer from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";

const { HOST, PORT_MAIL, USER, PASS } = process.env;

const transport = nodeMailer.createTransport({
    host: HOST,
    port: PORT_MAIL,
    auth: {
        user: USER,
        pass: PASS,
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
