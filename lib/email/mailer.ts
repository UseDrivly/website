import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
}

/**
 * Creates and returns a configured Nodemailer transporter.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'mail.usedrivly.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'info@usedrivly.com';
  const pass = process.env.SMTP_PASS || ']1=}ecY^l$$]aHa1';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      // Required for shared hosting mail exchangers that may use shared/SNI SSL certs
      rejectUnauthorized: false,
    },
  });
}

/**
 * Send an email via SMTP.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  fromName,
  fromEmail,
}: SendEmailOptions) {
  try {
    const transporter = getMailTransporter();

    const defaultFromName = process.env.SMTP_FROM_NAME || 'Drivly';
    const defaultFromEmail = process.env.SMTP_FROM_EMAIL || 'info@usedrivly.com';

    const senderName = fromName || defaultFromName;
    const senderEmail = fromEmail || defaultFromEmail;

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[sendEmail] Failed to send email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
}

/**
 * Test and verify SMTP configuration.
 */
export async function verifySmtpConnection() {
  try {
    const transporter = getMailTransporter();
    await transporter.verify();
    return { success: true };
  } catch (error: any) {
    console.error('[verifySmtpConnection] Verification failed:', error);
    return { success: false, error: error.message || 'SMTP connection verification failed' };
  }
}
