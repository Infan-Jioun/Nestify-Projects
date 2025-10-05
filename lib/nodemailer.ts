import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Extended Error interface for nodemailer errors
interface NodemailerError extends Error {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
}

// Create transporter with Gmail configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Email send function
export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        console.log(`📧 Attempting to send email to: ${to}`);

        const mailOptions = {
            from: {
                name: 'Nestify',
                address: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@nestify.app'
            },
            to,
            subject,
            html,
        };

        console.log('🔹 Mail options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        // Verify connection
        await transporter.verify();
        console.log('SMTP connection verified');

        // Send email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully! Message ID:', result.messageId);

        return result;
    } catch (error) {
        console.error(' Email sending failed:');

        // Type-safe error handling
        const nodemailerError = error as NodemailerError;

        console.error(' Error details:', {
            message: nodemailerError.message,
            code: nodemailerError.code,
            command: nodemailerError.command,
            response: nodemailerError.response,
            responseCode: nodemailerError.responseCode
        });

        throw new Error(`Email sending failed: ${nodemailerError.message}`);
    }
}