import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface NewsletterData {
    email: string;
}

export async function POST(request: NextRequest) {
    try {
        const { email }: NewsletterData = await request.json();

        // Validate email
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email to admin - new subscription
        const adminMailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER,
            subject: `New Newsletter Subscription - Nestify`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; background: linear-gradient(135deg, #10B981, #059669); padding: 20px; border-radius: 10px 10px 0 0; color: white;">
            <h2 style="margin: 0;">New Newsletter Subscriber!</h2>
          </div>
          <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #333;">A new user has subscribed to your newsletter:</p>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold;">Email: ${email}</p>
            </div>
            <p style="font-size: 14px; color: #666;">Subscription date: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
        };

        // Welcome email to subscriber
        const welcomeMailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Welcome to Nestify Newsletter! 🏠`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; background: linear-gradient(135deg, #10B981, #059669); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0 0 10px 0;">Welcome to Nestify! 🎉</h1>
            <p style="margin: 0; opacity: 0.9;">Thank you for subscribing to our newsletter</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Hello there! 👋
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for joining the Nestify community! We're excited to have you on board.
            </p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
              <h3 style="color: #065f46; margin-top: 0;">What to expect:</h3>
              <ul style="color: #065f46; padding-left: 20px;">
                <li>🏠 Latest property listings and updates</li>
                <li>💰 Exclusive deals and offers</li>
                <li>📈 Real estate market insights</li>
                <li>🎯 Home buying/selling tips</li>
                <li>📅 Event invitations and webinars</li>
              </ul>
            </div>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We'll keep you updated with the latest news, property insights, and exclusive offers. 
              Stay tuned for amazing content coming your way!
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}" 
                 style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Explore Properties
              </a>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              If you did not subscribe to our newsletter, please ignore this email.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 12px; color: #999;">
              © 2025 Nestify. All rights reserved.<br>
              329 Queensberry Street, North Melbourne VIC 3051, Australia
            </p>
          </div>
        </div>
      `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(welcomeMailOptions)
        ]);

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter! Check your email for welcome message.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in newsletter subscription:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        );
    }
}