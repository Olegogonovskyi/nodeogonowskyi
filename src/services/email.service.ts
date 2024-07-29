import path from "node:path";
import nodemailer, {Transporter} from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import {configs} from "../configs/config";
import {EmailEnum} from "../enums/emailEnam";
import {emailConstant} from "../costants/emailCostants";
import {EmailTypeToPayloadType} from "../types/emailTypes/email-type-to-payload.type";
import {ApiErrors} from "../errors/error.api.service";

class EmailService {
    private transporter: Transporter;

    constructor() {
        console.log(31)
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            from: configs.SMTP_EMAIL,
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,
            },
                tls: {
                    rejectUnauthorized: false
                }
        }
        );
console.log(32)



        this.transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extname: ".hbs",
                    defaultLayout: "main",
                    partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
                    layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
                },
                viewPath: path.join(process.cwd(), "src", "templates", "views"),
                extName: ".hbs",
            }),

        );
    }

    public async sendEmail<T extends EmailEnum>(
        type: T,
        to: string,
        context: EmailTypeToPayloadType[T],
    ): Promise<void> {
        try {
            const {subject, template} = emailConstant[type];
            console.log(subject)
            console.log(template)
            const options = {
                to,
                subject,
                template,
                context,
            };
            console.log(33)
            console.log(configs.SMTP_EMAIL)
            console.log(configs.SMTP_PASSWORD)
            await this.transporter.sendMail(options);
            console.log(333)
                } catch (e) {
            console.log(e)
            throw new ApiErrors("something extreemly wrong with emailSender", 401);
                }
    }

}

export const emailService = new EmailService();
