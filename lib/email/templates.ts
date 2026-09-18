export interface RoleEmailTemplate {
  enabled: boolean;
  subject: string;
  heading: string;
  subheading: string;
  body: string;
  buttonText: string;
  buttonUrl: string;
  primaryColor: string;
  headerBgColor: string;
  footerText: string;
}

export interface WaitlistEmailSettings {
  driver: RoleEmailTemplate;
  provider: RoleEmailTemplate;
  business: RoleEmailTemplate;
}

export const DEFAULT_EMAIL_SETTINGS: WaitlistEmailSettings = {
  driver: {
    enabled: true,
    subject: 'Welcome to the Drivly Waitlist, {{name}}! 🚗',
    heading: "You're on the Drivly Waitlist!",
    subheading: 'Roadside Help. Fixed Price. One Tap Away.',
    body: `<p>Hello <strong>{{name}}</strong>,</p>
<p>Thank you for joining the Drivly waitlist! We are building Nigeria's first on-demand roadside assistance platform to eliminate the stress of car troubles on Lagos roads.</p>
<p><strong>What you get as an early waitlist member:</strong></p>
<ul>
  <li>Priority access when the mobile app launches in {{city}}</li>
  <li>Exclusive 25% discount voucher on your first rescue</li>
  <li>Verified, vetted mechanics and tow operators at guaranteed fixed prices</li>
</ul>
<p>We'll notify you the moment early access opens. Until then, drive safe!</p>`,
    buttonText: 'Learn More About Drivly',
    buttonUrl: 'https://drivly.ng/drivers',
    primaryColor: '#7AB800',
    headerBgColor: '#0D3D21',
    footerText: 'Drivly Technologies Inc. • Lagos, Nigeria • info@usedrivly.com',
  },
  provider: {
    enabled: true,
    subject: 'Drivly Provider Network — Waitlist Confirmation, {{name}} 🔧',
    heading: 'Welcome to the Provider Network Waitlist!',
    subheading: 'Keep 85% of every job. Build verified reputation.',
    body: `<p>Hello <strong>{{name}}</strong>,</p>
<p>Thank you for applying to join the Drivly Provider Network as a verified provider (<strong>{{service_type}}</strong>).</p>
<p><strong>Why top automotive professionals partner with Drivly:</strong></p>
<ul>
  <li><strong>Keep 85% of every job:</strong> Highest payout rate in the industry</li>
  <li><strong>Zero haggling:</strong> Fixed transparent prices upfront</li>
  <li><strong>Steady work:</strong> Instant dispatch requests directly to your smartphone</li>
  <li><strong>Fast payouts:</strong> Automated direct deposits to your bank</li>
</ul>
<p>Our verification team will review your application and contact you regarding document onboarding prior to launch.</p>`,
    buttonText: 'Provider Portal & Details',
    buttonUrl: 'https://drivly.ng/providers',
    primaryColor: '#7AB800',
    headerBgColor: '#0D3D21',
    footerText: 'Drivly Technologies Inc. • Lagos, Nigeria • info@usedrivly.com',
  },
  business: {
    enabled: true,
    subject: 'Drivly for Business — Fleet Waitlist Confirmation 🏢',
    heading: 'Thank You for Registering {{company}}!',
    subheading: 'Zero downtime for your fleet. Real-time rescue across Lagos.',
    body: `<p>Hello <strong>{{name}}</strong>,</p>
<p>We have received your corporate waitlist registration for <strong>{{company}}</strong>.</p>
<p>Drivly for Business is engineered to protect commercial fleets and logistics operations from roadside downtime with 24/7 priority dispatch, transparent enterprise pricing, and centralized reporting.</p>
<p><strong>Next Steps:</strong></p>
<p>Our corporate fleet specialist will reach out to you directly to discuss tailored service plans for your fleet ({{fleet_size}} vehicles) and schedule a demo of the corporate dashboard.</p>`,
    buttonText: 'Explore Fleet Solutions',
    buttonUrl: 'https://drivly.ng/fleet',
    primaryColor: '#7AB800',
    headerBgColor: '#0D3D21',
    footerText: 'Drivly Technologies Inc. • Lagos, Nigeria • info@usedrivly.com',
  },
};

/**
 * Replaces placeholders like {{name}}, {{email}}, {{city}}, etc.
 */
export function interpolateVariables(template: string, data: Record<string, any>): string {
  if (!template) return '';
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    const val = data[key];
    if (val === undefined || val === null || val === '') {
      // Fallbacks for specific common variables
      if (key === 'city') return 'your city';
      if (key === 'company') return 'your company';
      if (key === 'service_type') return 'service specialist';
      if (key === 'fleet_size') return 'registered';
      return '';
    }
    return String(val);
  });
}

/**
 * Render a complete, bulletproof HTML email from a template and recipient data.
 */
export function renderEmailHtml(template: RoleEmailTemplate, data: Record<string, any>): string {
  const currentYear = new Date().getFullYear();
  const mergedData = { ...data, year: currentYear };

  const heading = interpolateVariables(template.heading, mergedData);
  const subheading = interpolateVariables(template.subheading, mergedData);
  const body = interpolateVariables(template.body, mergedData);
  const buttonText = interpolateVariables(template.buttonText, mergedData);
  const buttonUrl = interpolateVariables(template.buttonUrl, mergedData);
  const footerText = interpolateVariables(template.footerText, mergedData);

  const primaryColor = template.primaryColor || '#7AB800';
  const headerBgColor = template.headerBgColor || '#0D3D21';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #F7FAF2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #D8E8D0; }
    .btn { display: inline-block; padding: 14px 28px; background-color: ${primaryColor}; color: #0D3D21; font-weight: 700; font-size: 15px; text-decoration: none; border-radius: 8px; text-align: center; }
  </style>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #F7FAF2;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <!-- Main Email Card -->
        <table role="presentation" class="email-container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #D8E8D0; box-shadow: 0 4px 16px rgba(13,61,33,0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: ${headerBgColor}; padding: 36px 32px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <span style="font-size: 32px; font-weight: 900; letter-spacing: -1px; color: #FFFFFF;">
                      Driv<span style="color: ${primaryColor};">ly</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="display: inline-block; padding: 4px 12px; background-color: rgba(255,255,255,0.15); color: ${primaryColor}; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 20px;">
                      Waitlist Confirmed
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding: 40px 36px; color: #2A3B2C; line-height: 1.65; font-size: 15px;">
              ${heading ? `<h1 style="margin: 0 0 8px 0; color: #0D3D21; font-size: 24px; font-weight: 800; line-height: 1.3;">${heading}</h1>` : ''}
              ${subheading ? `<p style="margin: 0 0 24px 0; color: #5F9908; font-size: 16px; font-weight: 600;">${subheading}</p>` : ''}
              
              <div style="color: #2F3E32; font-size: 15px; line-height: 1.7;">
                ${body}
              </div>

              ${buttonText && buttonUrl ? `
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; margin-bottom: 16px;">
                  <tr>
                    <td align="center">
                      <a href="${buttonUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: ${primaryColor}; color: #0D3D21; font-weight: 700; font-size: 15px; text-decoration: none; border-radius: 10px; box-shadow: 0 2px 8px rgba(122,184,0,0.3);">
                        ${buttonText} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              ` : ''}
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="background-color: #F7FAF2; border-top: 1px solid #E8F0E4; padding: 24px 32px; text-align: center; color: #6E826C; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 8px 0; font-weight: 500;">${footerText}</p>
              <p style="margin: 0; color: #8FA489;">
                &copy; ${currentYear} Drivly. All rights reserved. You received this email because you signed up on our website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
