import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';

// Check if email credentials are configured
const isEmailConfigured = () => {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.NOTIFICATION_EMAIL);
};

// Create Gmail transporter only if credentials are available
let transporter: nodemailer.Transporter | null = null;

if (isEmailConfigured()) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Verify the connection
  transporter.verify((error: any, success: any) => {
    if (error) {
      console.error('Gmail SMTP connection error:', error);
    } else {
      console.log('Gmail SMTP server is ready to send emails');
    }
  });
} else {
  console.warn('Email credentials not configured. Email notifications will be disabled.');
  console.warn('Required environment variables: GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFICATION_EMAIL');
  console.warn('Current status:', {
    GMAIL_USER: !!process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
    NOTIFICATION_EMAIL: !!process.env.NOTIFICATION_EMAIL
  });
}

export async function sendInquiryNotification(inquiry: Inquiry): Promise<boolean> {
  if (!transporter || !isEmailConfigured()) {
    console.warn('Email not configured, skipping admin notification');
    return false;
  }

  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Inquiry - Alashore Marine</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0891b2; }
    .label { font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 5px; font-size: 16px; }
    .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0; }
    .topic-badge { display: inline-block; background: #0891b2; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-transform: capitalize; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🐟 New Inquiry Received</h1>
      <p>Alashore Marine Exports Pvt. Ltd.</p>
    </div>
    
    <div class="content">
      <p><strong>You have received a new inquiry through your website!</strong></p>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="label">Customer Name</div>
          <div class="value">${inquiry.firstName} ${inquiry.lastName}</div>
        </div>
        <div class="info-item">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
        </div>
        ${inquiry.phone ? `
        <div class="info-item">
          <div class="label">Phone Number</div>
          <div class="value"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></div>
        </div>
        ` : ''}
        ${inquiry.company ? `
        <div class="info-item">
          <div class="label">Company</div>
          <div class="value">${inquiry.company}</div>
        </div>
        ` : ''}
      </div>
      
      ${inquiry.topic ? `
      <div style="margin: 20px 0;">
        <div class="label">Inquiry Topic</div>
        <span class="topic-badge">${inquiry.topic}</span>
      </div>
      ` : ''}
      
      <div class="message-box">
        <div class="label">Message</div>
        <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${inquiry.message}</div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 6px;">
        <strong>📅 Received:</strong> ${new Date(inquiry.createdAt!).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${inquiry.email}?subject=Re: Your inquiry to Alashore Marine" 
           style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reply to Customer
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was automatically generated from your website contact form.</p>
      <p><strong>Alashore Marine Exports Pvt. Ltd.</strong></p>
      <p>Plot No- D1/18(P), D1/19, D1/20 & D1/37, D1/38, D1/39(P)<br>
         Somnathpur Industrial Estate, Balasore, Odisha, India, Pin- 755019</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"Alashore Marine Website" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🐟 New Inquiry from ${inquiry.firstName} ${inquiry.lastName} - ${inquiry.topic || 'General'}`,
      html: emailHtml,
      text: `
New Inquiry Received - Alashore Marine

Customer: ${inquiry.firstName} ${inquiry.lastName}
Email: ${inquiry.email}
${inquiry.phone ? `Phone: ${inquiry.phone}` : ''}
${inquiry.company ? `Company: ${inquiry.company}` : ''}
${inquiry.topic ? `Topic: ${inquiry.topic}` : ''}

Message:
${inquiry.message}

Received: ${new Date(inquiry.createdAt!).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Reply to customer: ${inquiry.email}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent for inquiry #${inquiry.id}`);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

export async function sendInquiryConfirmation(inquiry: Inquiry): Promise<boolean> {
  if (!transporter || !isEmailConfigured()) {
    console.warn('Email not configured, skipping customer confirmation');
    return false;
  }

  try {
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You - Alashore Marine</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🐟 Thank You for Your Inquiry!</h1>
      <p>Alashore Marine Exports Pvt. Ltd.</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${inquiry.firstName} ${inquiry.lastName}</strong>,</p>
      
      <p>Thank you for contacting Alashore Marine Exports! We have successfully received your inquiry and our team will review it promptly.</p>
      
      <div class="message-box">
        <h3>📋 Your Inquiry Details:</h3>
        <p><strong>Topic:</strong> ${inquiry.topic || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f1f5f9; padding: 15px; border-radius: 4px;">${inquiry.message}</p>
        <p><strong>Submitted:</strong> ${new Date(inquiry.createdAt!).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>
      
      <div style="background: #dbeafe; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <h3>⏰ What Happens Next?</h3>
        <ul>
          <li>Our team will review your inquiry within 24 hours</li>
          <li>We'll get back to you with detailed information</li>
          <li>For urgent matters, call us at +91 7381050536</li>
        </ul>
      </div>
      
      <div style="background: #f0fdf4; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <h3>🌊 About Alashore Marine</h3>
        <p>We are a leading seafood export company specializing in premium quality marine products. With our state-of-the-art processing facilities and commitment to excellence, we deliver the finest seafood to global markets.</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Alashore Marine Exports Pvt. Ltd.</strong></p>
      <p>📍 Plot No- D1/18(P), D1/19, D1/20 & D1/37, D1/38, D1/39(P)<br>
         Somnathpur Industrial Estate, Balasore, Odisha, India, Pin- 755019</p>
      <p>📞 +91 7381050536 | ✉️ alashoremarine@gmail.com</p>
      <p>🌐 Visit our website for more information</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"Alashore Marine Exports" <${process.env.GMAIL_USER}>`,
      to: inquiry.email,
      subject: `🐟 Thank you for your inquiry - Alashore Marine`,
      html: confirmationHtml,
      text: `
Dear ${inquiry.firstName} ${inquiry.lastName},

Thank you for contacting Alashore Marine Exports! We have successfully received your inquiry and our team will review it promptly.

Your Inquiry Details:
Topic: ${inquiry.topic || 'General Inquiry'}
Message: ${inquiry.message}
Submitted: ${new Date(inquiry.createdAt!).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

What Happens Next?
- Our team will review your inquiry within 24 hours
- We'll get back to you with detailed information
- For urgent matters, call us at +91 7381050536

Best regards,
Alashore Marine Exports Pvt. Ltd.
Plot No- D1/18(P), D1/19, D1/20 & D1/37, D1/38, D1/39(P)
Somnathpur Industrial Estate, Balasore, Odisha, India, Pin- 755019
Phone: +91 7381050536
Email: alashoremarine@gmail.com
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${inquiry.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}