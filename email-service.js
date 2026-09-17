import nodemailer from 'nodemailer';

// In-memory log of recent email notifications (for admin review and verification)
const emailLogs = [];
const MAX_LOGS = 100;

/**
 * Creates and returns a Nodemailer transporter based on environment variables
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  // Fallback: Test/Simulated Transporter that safely records and outputs without failing
  return {
    isMock: true,
    sendMail: async (mailOptions) => {
      const simulatedId = `<sim-${Date.now()}-${Math.floor(Math.random() * 10000)}@phoenix-tours.ae>`;
      console.log('---------------------------------------------------------');
      console.log(`[EMAIL NOTIFICATION DISPATCHED]`);
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Booking Reference: ${mailOptions.headers?.['X-Booking-ID'] || 'N/A'}`);
      console.log(`Time: ${new Date().toISOString()}`);
      console.log('---------------------------------------------------------');
      return {
        messageId: simulatedId,
        response: '250 Simulated delivery accepted (SMTP not configured)',
        simulated: true
      };
    }
  };
}

/**
 * Generates an accessible, mobile-responsive HTML email template for a booking summary
 */
export function generateBookingEmailHtml(booking) {
  const code = booking.confirmationCode || booking.id || `PX-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const guestName = booking.name || 'Valued Guest';
  const tourName = booking.rideName || booking.tour || 'Dubai Desert Adventure';
  const duration = booking.duration || booking.package || 'Standard Experience';
  const date = booking.date || 'To be confirmed';
  const timeSlot = booking.slotId || booking.time || '09:00 AM';
  const quantity = booking.riders || booking.quantity || 1;
  const unitLabel = booking.unit === 'person' ? (quantity === 1 ? 'Guest' : 'Guests') :
                    booking.unit === 'bike' ? (quantity === 1 ? 'Quad Bike' : 'Quad Bikes') :
                    booking.unit === 'buggy' ? (quantity === 1 ? 'Dune Buggy' : 'Dune Buggies') :
                    (quantity === 1 ? 'Vehicle' : 'Vehicles');
  const total = Number(booking.total || 0).toLocaleString();
  const collectionAmount = Number(booking.collectionAmount || booking.total || 0).toLocaleString();
  const phone = booking.phone || '';
  const pickup = booking.pickup || (booking.rideId ? 'Direct Base Camp Meeting Point (GPS pin sent via WhatsApp)' : 'Hotel Pickup in Dubai');
  const notes = booking.notes || 'None';

  const waMessage = encodeURIComponent(
    `Hello Phoenix Tours! I received my booking confirmation email.\n` +
    `• Booking Code: ${code}\n` +
    `• Experience: ${tourName} (${duration})\n` +
    `• Date & Time: ${date} at ${timeSlot}\n` +
    `• Guest: ${guestName} (${phone})\n` +
    `Please share the base camp location pin and pickup details.`
  );
  const waLink = `https://wa.me/971561505270?text=${waMessage}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Booking Summary - Phoenix Tours</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f3f6f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #183039; }
    table { border-collapse: collapse; }
    .wrapper { width: 100%; background-color: #f3f6f5; padding: 30px 15px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,34,41,0.08); border: 1px solid #e1e9e7; }
    .header { background: linear-gradient(135deg, #012229 0%, #064049 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
    .header-logo { font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin: 0; text-transform: uppercase; }
    .header-tagline { font-size: 11px; letter-spacing: 1.5px; color: #efb238; font-weight: 700; margin-top: 4px; text-transform: uppercase; }
    .badge-code { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 30px; padding: 6px 16px; font-size: 13px; font-weight: 800; color: #ffffff; margin-top: 18px; letter-spacing: 1px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 22px; font-weight: 800; color: #012229; margin: 0 0 10px 0; }
    .intro-text { font-size: 15px; line-height: 1.6; color: #52676e; margin: 0 0 24px 0; }
    .summary-card { background-color: #f8fbfa; border: 1px solid #dbe7e4; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .summary-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0f766e; margin: 0 0 16px 0; border-bottom: 1px solid #e2ece9; padding-bottom: 8px; }
    .summary-table { width: 100%; }
    .summary-table td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    .summary-label { color: #697d83; font-weight: 600; width: 42%; }
    .summary-value { color: #0f2b33; font-weight: 700; text-align: right; }
    .collection-box { background: linear-gradient(135deg, #eef9f6 0%, #e1f4f0 100%); border: 1.5px solid #14b8a6; border-radius: 12px; padding: 18px 20px; margin-bottom: 26px; text-align: center; }
    .collection-badge { display: inline-block; background: #0f766e; color: #ffffff; font-size: 10px; font-weight: 800; letter-spacing: 1px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
    .collection-amount { font-size: 28px; font-weight: 900; color: #064e48; margin: 8px 0 4px 0; }
    .collection-text { font-size: 13px; color: #115e59; font-weight: 600; line-height: 1.5; margin: 0; }
    .cta-button { display: block; background: #14b8a6; background: linear-gradient(135deg, #18a9a5 0%, #0f766e 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 15px; padding: 15px 25px; border-radius: 10px; text-align: center; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(24,169,165,0.3); }
    .tips-box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .tips-title { font-size: 13px; font-weight: 800; color: #44403c; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .tips-list { margin: 0; padding-left: 20px; font-size: 13px; color: #57534e; line-height: 1.7; }
    .footer { background-color: #012229; padding: 28px 20px; text-align: center; color: #8ba2a8; font-size: 12px; line-height: 1.6; }
    .footer strong { color: #dbe7e4; }
    .footer a { color: #efb238; text-decoration: none; font-weight: 700; }
    .divider { height: 1px; background-color: #e5edea; margin: 20px 0; }
    @media only screen and (max-width: 480px) {
      .content { padding: 24px 18px; }
      .header { padding: 28px 18px; }
      .summary-table td { font-size: 13px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <h1 class="header-logo">Phoenix Tours</h1>
        <div class="header-tagline">Dubai Desert Adventures & Sightseeing</div>
        <div class="badge-code">CONFIRMATION: ${code}</div>
      </div>

      <!-- CONTENT BODY -->
      <div class="content">
        <h2 class="greeting">You're booked, ${guestName}!</h2>
        <p class="intro-text">
          Thank you for choosing Phoenix Tours. Here is a full copy of your booking summary and reservation details.
        </p>

        <!-- SUMMARY CARD -->
        <div class="summary-card">
          <h3 class="summary-title">Reservation Summary</h3>
          <table class="summary-table">
            <tr>
              <td class="summary-label">Booking Reference:</td>
              <td class="summary-value" style="color:#0f766e;font-size:15px;">${code}</td>
            </tr>
            <tr>
              <td class="summary-label">Experience:</td>
              <td class="summary-value">${tourName}</td>
            </tr>
            <tr>
              <td class="summary-label">Package / Duration:</td>
              <td class="summary-value">${duration}</td>
            </tr>
            <tr>
              <td class="summary-label">Date & Time Slot:</td>
              <td class="summary-value">${date} · ${timeSlot}</td>
            </tr>
            <tr>
              <td class="summary-label">Guests / Vehicles:</td>
              <td class="summary-value">${quantity} ${unitLabel}</td>
            </tr>
            <tr>
              <td class="summary-label">Meeting / Pickup:</td>
              <td class="summary-value">${pickup}</td>
            </tr>
            <tr>
              <td class="summary-label">Guest Contact:</td>
              <td class="summary-value">${guestName} (${phone})</td>
            </tr>
            ${notes && notes !== 'None' ? `
            <tr>
              <td class="summary-label">Special Requests:</td>
              <td class="summary-value" style="font-weight:normal;font-style:italic;">${notes}</td>
            </tr>` : ''}
            <tr>
              <td class="summary-label" style="border-top:1px dashed #d0deda;padding-top:12px;">Total Price:</td>
              <td class="summary-value" style="border-top:1px dashed #d0deda;padding-top:12px;font-size:16px;color:#012229;">AED ${total}</td>
            </tr>
          </table>
        </div>

        <!-- COLLECTION FROM GUEST CARD -->
        <div class="collection-box">
          <span class="collection-badge">Pay on Arrival</span>
          <div class="collection-amount">AED ${collectionAmount}</div>
          <p class="collection-text">
            <strong>Collection Amount:</strong> Please pay this amount upon arrival at our desert camp reception or pickup. Cash (AED / USD / EUR) and all major credit/debit cards accepted.
          </p>
        </div>

        <!-- WHATSAPP CTA BUTTON -->
        <a href="${waLink}" class="cta-button" target="_blank" rel="noopener">
          📱 Open WhatsApp for GPS Location & Support →
        </a>

        <!-- IMPORTANT ADVICE / CHECKLIST -->
        <div class="tips-box">
          <h4 class="tips-title">Important Guidelines for Your Adventure</h4>
          <ul class="tips-list">
            <li><strong>Arrival Time:</strong> Please arrive 15–20 minutes prior to your scheduled time slot for safety gear fitting and briefing.</li>
            <li><strong>What to Wear:</strong> Casual outdoor clothing, closed shoes (sneakers or trainers), and sunglasses are strongly recommended.</li>
            <li><strong>Identification:</strong> Please carry a valid Emirates ID or original passport copy.</li>
            <li><strong>Free Cancellation:</strong> Flexible cancellation or rescheduling up to 12 hours prior to your scheduled slot.</li>
          </ul>
        </div>

        <p style="font-size:13px;color:#788b91;line-height:1.6;margin:0;text-align:center;">
          Need to make changes or have questions? Reach out to our 24/7 team on WhatsApp at <strong style="color:#012229;">+971 56 150 5270</strong> or reply directly to this email.
        </p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <strong>Phoenix Tours & Adventures</strong><br>
        Dubai Desert Conservation Camp · Dubai, United Arab Emirates<br>
        Licensed UAE Tour Operator · Phone: <a href="tel:+971561505270">+971 56 150 5270</a><br>
        <span style="display:inline-block;margin-top:8px;font-size:11px;color:#5a7379;">
          This is an automated booking confirmation sent to ${booking.email || 'your email'}.
        </span>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates a plain-text fallback for email clients that do not render HTML
 */
export function generateBookingEmailText(booking) {
  const code = booking.confirmationCode || booking.id || `PX-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const guestName = booking.name || 'Valued Guest';
  const tourName = booking.rideName || booking.tour || 'Dubai Desert Adventure';
  const duration = booking.duration || booking.package || 'Standard Experience';
  const date = booking.date || 'To be confirmed';
  const timeSlot = booking.slotId || booking.time || '09:00 AM';
  const quantity = booking.riders || booking.quantity || 1;
  const total = Number(booking.total || 0).toLocaleString();
  const collectionAmount = Number(booking.collectionAmount || booking.total || 0).toLocaleString();
  const phone = booking.phone || '';
  const pickup = booking.pickup || (booking.rideId ? 'Direct Base Camp Meeting Point' : 'Hotel Pickup in Dubai');

  return `
PHOENIX TOURS & ADVENTURES - BOOKING CONFIRMATION
Confirmation Code: ${code}

Dear ${guestName},

Thank you for booking with Phoenix Tours! Here is a summary of your reservation:

• Booking Reference: ${code}
• Experience: ${tourName}
• Package / Duration: ${duration}
• Date & Time Slot: ${date} · ${timeSlot}
• Guests / Vehicles: ${quantity}
• Meeting / Pickup: ${pickup}
• Guest Contact: ${guestName} (${phone})
• Total Price: AED ${total}
• Collection Amount from Guest (Pay on arrival): AED ${collectionAmount}

Payment Policy: Pay on arrival at our base camp reception. Cash (AED/USD/EUR) and major cards accepted.

Preparation Tips:
- Please arrive 15–20 minutes prior to your slot for safety briefing and gear.
- Wear comfortable clothing and sunglasses.
- Bring a valid Emirates ID or passport copy.

Need assistance or location pin?
WhatsApp / Phone: +971 56 150 5270
Website: https://phoenix-tours-barayshah.vercel.app

Best regards,
Phoenix Tours Team
Dubai, United Arab Emirates
  `.trim();
}

/**
 * Dispatches a booking summary confirmation email to the user
 */
export async function sendBookingEmail(booking) {
  if (!booking || !booking.email) {
    return {
      success: false,
      reason: 'No recipient email address provided.'
    };
  }

  const recipientEmail = booking.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    return {
      success: false,
      reason: 'Invalid email address format.'
    };
  }

  const code = booking.confirmationCode || booking.id || 'Reservation';
  const tourName = booking.rideName || booking.tour || 'Dubai Experience';
  const fromAddress = process.env.EMAIL_FROM || '"Phoenix Tours" <bookings@phoenix-tours.ae>';
  const subject = `Booking Confirmation [${code}] - ${tourName} | Phoenix Tours`;

  const htmlContent = generateBookingEmailHtml(booking);
  const textContent = generateBookingEmailText(booking);

  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: fromAddress,
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Booking-ID': code,
        'X-Application': 'Phoenix-Tours-Booking-System'
      }
    };

    const result = await transporter.sendMail(mailOptions);
    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'BOOKING_CONFIRMATION',
      recipient: recipientEmail,
      bookingCode: code,
      tour: tourName,
      subject,
      status: 'SENT',
      messageId: result.messageId || 'unknown',
      simulated: Boolean(result.simulated)
    };

    emailLogs.unshift(logEntry);
    if (emailLogs.length > MAX_LOGS) emailLogs.pop();

    return {
      success: true,
      emailSent: true,
      recipient: recipientEmail,
      messageId: result.messageId,
      simulated: Boolean(result.simulated),
      timestamp: logEntry.timestamp
    };
  } catch (error) {
    console.error('[EMAIL NOTIFICATION ERROR]:', error);
    const errEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'BOOKING_CONFIRMATION',
      recipient: recipientEmail,
      bookingCode: code,
      tour: tourName,
      subject,
      status: 'FAILED',
      error: error.message || String(error)
    };
    emailLogs.unshift(errEntry);

    return {
      success: false,
      emailSent: false,
      error: error.message || 'Failed to dispatch email.'
    };
  }
}

/**
 * Sends a test email to verify SMTP configuration
 */
export async function sendTestEmail(targetEmail) {
  const testBooking = {
    id: `PX-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
    confirmationCode: `PX-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
    name: 'Test Explorer',
    email: targetEmail || 'test@example.com',
    phone: '+971 56 150 5270',
    rideName: 'Quad Bike 60 Min Test Ride',
    tour: 'Quad Bike 60 Min Test Ride',
    duration: '1 hour · 1 Quad',
    package: '1 hour · 1 Quad',
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai' }).format(new Date()),
    slotId: '09:00 AM',
    time: '09:00 AM',
    riders: 1,
    quantity: 1,
    unit: 'bike',
    total: 250,
    collectionAmount: 250,
    notes: 'Test email notification verification from Phoenix Tours system.'
  };

  return await sendBookingEmail(testBooking);
}

/**
 * Returns recent email notification logs
 */
export function getEmailLogs() {
  return emailLogs;
}

/**
 * Returns SMTP system configuration status
 */
export function getEmailConfigStatus() {
  const isConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  return {
    smtpConfigured: isConfigured,
    smtpHost: process.env.SMTP_HOST || 'Not configured (Simulated delivery active)',
    smtpPort: process.env.SMTP_PORT || '587',
    fromAddress: process.env.EMAIL_FROM || 'Phoenix Tours <bookings@phoenix-tours.ae>',
    totalLogged: emailLogs.length,
    recentLogs: emailLogs.slice(0, 10)
  };
}
