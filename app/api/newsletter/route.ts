import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface NewsletterData {
    email: string;
}

// Lucide icons as SVG
const lucideIcons = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    bell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    trendingUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    userPlus: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
    sparkles: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
};

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

        // Email to admin - new subscription (Modern Design)
        const adminMailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER,
            subject: `🎉 New Newsletter Subscription - Nestify`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscription</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px 30px; text-align: center; color: white;">
            <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 50px; backdrop-filter: blur(10px);">
                ${lucideIcons.userPlus}
                <h2 style="margin: 0; font-size: 24px; font-weight: 700;">New Subscriber Alert!</h2>
            </div>
            <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 16px;">Someone just joined the Nestify family</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
                ${lucideIcons.sparkles}
                <h3 style="color: #1F2937; margin: 15px 0 10px 0; font-size: 20px;">Welcome to the community!</h3>
                <p style="color: #6B7280; margin: 0;">Here are the details of our new subscriber</p>
            </div>

            <!-- Subscriber Card -->
            <div style="background: linear-gradient(135deg, #F3F4F6, #E5E7EB); border-radius: 16px; padding: 25px; text-align: center; border: 2px dashed #10B981;">
                <div style="display: inline-flex; align-items: center; gap: 8px; background: white; padding: 12px 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    ${lucideIcons.mail}
                    <div style="text-align: left;">
                        <p style="margin: 0; font-size: 14px; color: #6B7280; font-weight: 600;">EMAIL ADDRESS</p>
                        <p style="margin: 5px 0 0 0; font-size: 18px; color: #1F2937; font-weight: 700;">${email}</p>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                <div style="background: #F0FDF4; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="color: #10B981; margin-bottom: 8px;">${lucideIcons.calendar}</div>
                    <p style="margin: 0; font-size: 14px; color: #065F46; font-weight: 600;">Subscription Date</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #065F46; font-weight: 700;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div style="background: #EFF6FF; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="color: #3B82F6; margin-bottom: 8px;">${lucideIcons.bell}</div>
                    <p style="margin: 0; font-size: 14px; color: #1E40AF; font-weight: 600;">Total Subscribers</p>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #1E40AF; font-weight: 700;">Growing! 🚀</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #F9FAFB; padding: 25px 30px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0; color: #6B7280; font-size: 14px;">
                This notification was sent from your Nestify website<br>
                <span style="color: #10B981; font-weight: 600;">Keep building amazing relationships! 💚</span>
            </p>
        </div>
    </div>
</body>
</html>
            `,
        };

        // Welcome email to subscriber (Modern Design)
        const welcomeMailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `🚀 Welcome to Nestify - Let's Find Your Dream Home!`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Nestify</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15);">
        <!-- Hero Section -->
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 50px 30px; text-align: center; color: white; position: relative;">
            <div style="position: absolute; top: 20px; right: 30px; background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                🎉 WELCOME
            </div>
            
            <div style="display: inline-flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.2); padding: 20px 30px; border-radius: 60px; backdrop-filter: blur(10px); margin-bottom: 20px;">
                ${lucideIcons.home}
                <h1 style="margin: 0; font-size: 32px; font-weight: 800;">Nestify</h1>
            </div>
            
            <p style="margin: 0; font-size: 18px; opacity: 0.95; font-weight: 500;">
                Your journey to the perfect home starts here!
            </p>
        </div>

        <!-- Welcome Message -->
        <div style="padding: 40px 30px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #F0FDF4; padding: 12px 20px; border-radius: 50px; margin-bottom: 25px;">
                ${lucideIcons.check}
                <span style="color: #065F46; font-weight: 600;">Successfully Subscribed!</span>
            </div>
            
            <h2 style="color: #1F2937; margin: 0 0 15px 0; font-size: 28px; font-weight: 700;">
                Hello Future Homeowner! 👋
            </h2>
            
            <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                We're absolutely thrilled to welcome you to the Nestify community! 
                Get ready to discover amazing properties and expert insights tailored just for you.
            </p>

            <!-- Features Grid -->
            <div style="background: #F8FAFC; border-radius: 20px; padding: 30px; margin: 30px 0;">
                <h3 style="color: #1F2937; margin: 0 0 25px 0; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    ${lucideIcons.sparkles}
                    What Awaits You
                </h3>
                
                <div style="display: grid; gap: 20px;">
                    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="color: #10B981;">${lucideIcons.home}</div>
                        <div style="text-align: left;">
                            <p style="margin: 0; color: #1F2937; font-weight: 600;">Exclusive Listings</p>
                            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">First access to premium properties</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="color: #F59E0B;">${lucideIcons.trendingUp}</div>
                        <div style="text-align: left;">
                            <p style="margin: 0; color: #1F2937; font-weight: 600;">Market Insights</p>
                            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">Expert analysis and trends</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="color: #EF4444;">${lucideIcons.target}</div>
                        <div style="text-align: left;">
                            <p style="margin: 0; color: #1F2937; font-weight: 600;">Personalized Matches</p>
                            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">Properties tailored to your needs</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="color: #8B5CF6;">${lucideIcons.bell}</div>
                        <div style="text-align: left;">
                            <p style="margin: 0; color: #1F2937; font-weight: 600;">Instant Alerts</p>
                            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">Never miss your dream home</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0 25px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}" 
                   style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3); transition: all 0.3s;">
                   🏠 Start Exploring Properties
                </a>
            </div>

            <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 0;">
                We're committed to helping you find the perfect place to call home.<br>
                <strong>Welcome to the family! 🎉</strong>
            </p>
        </div>

        <!-- Footer -->
        <div style="background: #1F2937; color: white; padding: 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 700;">Nestify</p>
                <p style="margin: 0; font-size: 14px; opacity: 0.8;">Finding your perfect home, together</p>
            </div>
            
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 12px; opacity: 0.7;">
                    329 Queensberry Street, North Melbourne VIC 3051, Australia
                </p>
                <p style="margin: 0; font-size: 12px; opacity: 0.7;">
                    © 2025 Nestify. All rights reserved. | 
                    <a href="#" style="color: #10B981; text-decoration: none;">Unsubscribe</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
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