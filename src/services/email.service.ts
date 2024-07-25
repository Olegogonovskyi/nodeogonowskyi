import path from "node:path";
import nodemailer, { Transporter } from "nodemailer";
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
        });
console.log(32)
        console.log(process.cwd(), "src", "templates", "partials")
        console.log(process.cwd(), "src", "templates", "layouts")
        console.log(process.cwd(), "src", "templates", "views")
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
            // context["frontUrl"] = configs.FRONTEND_URL;
            const options = {
                to,
                subject,
                template,
                context,
            };
            console.log(33)
            return await this.transporter.sendMail(options);
                } catch (e) {
            throw new ApiErrors("something wrong with emailSender", 401);
                }
    }

}

export const emailService = new EmailService();
