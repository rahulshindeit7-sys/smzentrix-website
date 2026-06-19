const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Send new lead notification email to the business.
 */
async function sendLeadNotificationEmail(lead) {
  const transporter = createTransporter();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card { max-width: 560px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0076ff, #00b4d8); padding: 28px 32px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 16px; color: #111827; font-weight: 500; padding: 10px 14px; background: #f9fafb; border-radius: 8px; border-left: 3px solid #0076ff; }
    .highlight { border-left-color: #10b981; background: #f0fdf4; }
    .footer { padding: 18px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    .cta { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #0076ff; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Website Lead — SM Zentrix</h1>
      <p>Someone just submitted a callback request from your website.</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${lead.name || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Mobile Number</div>
        <div class="value highlight">📱 ${lead.mobile}</div>
      </div>
      <div class="field">
        <div class="label">Interested Product</div>
        <div class="value">${lead.product || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value">${lead.message || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Source</div>
        <div class="value">${lead.source || 'Contact Page Popup'}</div>
      </div>
      <div class="field">
        <div class="label">Page URL</div>
        <div class="value">${lead.page_url || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Submission Time</div>
        <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })}</div>
      </div>
      <a class="cta" href="https://wa.me/91${lead.mobile}">💬 WhatsApp this lead</a>
    </div>
    <div class="footer">
      This notification was sent automatically by SM Zentrix website lead capture system.<br/>
      smzentrix.info
    </div>
  </div>
</body>
</html>
  `.trim();

  const info = await transporter.sendMail({
    from: `"SM Zentrix Website" <${process.env.FROM_EMAIL}>`,
    to: process.env.TO_EMAIL,
    subject: `🚀 New Website Lead - SM Zentrix | ${lead.mobile}`,
    text: `New Lead\n\nName: ${lead.name || '—'}\nMobile: ${lead.mobile}\nProduct: ${lead.product || '—'}\nMessage: ${lead.message || '—'}\nSource: ${lead.source}\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    html,
  });

  return info;
}

module.exports = { sendLeadNotificationEmail };
