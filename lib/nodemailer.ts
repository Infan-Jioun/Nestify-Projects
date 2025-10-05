
import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Production-optimized transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        // Production optimizations
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000,
        rateLimit: 5
    });
};

export async function sendEmail({ to, subject, html }: EmailOptions) {
    // Enhanced environment variable check
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        const errorMsg = 'Email configuration missing: ' +
            `EMAIL_USER: ${!!process.env.EMAIL_USER}, ` +
            `EMAIL_PASSWORD: ${!!process.env.EMAIL_PASSWORD}`;
        console.error('', errorMsg);
        throw new Error('Email service configuration error');
    }

    let transporter;

    try {
        console.log(`📧 Production: Sending email to ${to}`);

        transporter = createTransporter();

        const mailOptions = {
            from: {
                name: 'Nestify',
                address: process.env.EMAIL_FROM!
            },
            to,
            subject,
            html,
            // Important for production deliverability
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            }
        };

        console.log('🔹 Production mail options ready');

        // Verify connection with timeout
        await Promise.race([
            transporter.verify(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('SMTP verification timeout')), 10000)
            )
        ]);

        console.log('Production SMTP connection verified');

        // Send email with timeout
        const result = await Promise.race([
            transporter.sendMail(mailOptions),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Email sending timeout')), 15000)
            )
        ]);

        console.log('Production email sent successfully!');
        return result;

    } catch (error) {
        console.error(' Production email failed:');

        // Detailed production logging
        if (error instanceof Error) {
            console.error(' Production Error Analysis:', {
                name: error.name,
                message: error.message,
                stack: error.stack?.split('\n')[0], 
                nodeEnv: process.env.NODE_ENV,
                platform: process.platform,
                hasEmailVars: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
            });
        }

        // Close transporter on error
        if (transporter) {
            transporter.close();
        }

        throw new Error('Failed to send email. Please try again in a moment.');
    }
}