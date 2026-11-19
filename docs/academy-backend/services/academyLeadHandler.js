const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validateApplication(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { fullName, phoneNumber, email, contactConsent, submissionId } = body;
  if ([fullName, phoneNumber, email, submissionId].some(value => typeof value !== "string")) return null;
  const application = {
    fullName: fullName.trim(),
    phoneNumber: phoneNumber.trim(),
    email: email.trim().toLowerCase(),
    contactConsent,
    submissionId,
  };
  const digits = application.phoneNumber.replace(/\D/g, "");
  if (application.fullName.length < 2 || application.fullName.length > 100 || /[\r\n\x00-\x1f]/.test(application.fullName)) return null;
  if (!/^\+?[0-9\s()-]+$/.test(application.phoneNumber) || application.phoneNumber.length > 20 || /[\r\n]/.test(application.phoneNumber) || digits.length < 10 || digits.length > 15) return null;
  if (application.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return null;
  if (contactConsent !== true || !UUID.test(submissionId)) return null;
  return application;
}

function createAcademyLeadHandler({ AcademyLead, sendMail, logger = console }) {
  return async function submitAcademyLead(req, res) {
    const application = validateApplication(req.body);
    if (!application) return res.status(400).json({ message: "Enter a valid name, phone number, email and contact consent." });

    let lead;
    try {
      lead = await AcademyLead.create({ ...application, consentedAt: new Date() });
    } catch (error) {
      if (error.code === 11000) {
        // A retry must not create a second lead or send a second notification.
        try {
          lead = await AcademyLead.findOne({ submissionId: application.submissionId });
          if (lead) return res.status(200).json({ message: "Application received.", data: { saved: true } });
        } catch (_) { /* Respond with the same retryable error below. */ }
      }
      logger.error("Academy lead could not be saved", { code: error.code || error.name });
      return res.status(503).json({ message: "Unable to save your application. Please try again." });
    }

    const attemptedAt = new Date();
    let emailStatus = "sent";
    try {
      await sendMail({
        from: process.env.ACADEMY_MAIL_FROM || "enquiry@theprofessionalworld.com",
        to: process.env.ACADEMY_MAIL_TO || "shubhi@theprofessionalworld.com",
        subject: "New ARYA Fellowship Academy Lead",
        text: [
          "New ARYA Fellowship Academy application",
          "",
          `Lead ID: ${lead._id}`,
          `Name: ${application.fullName}`,
          `Phone: ${application.phoneNumber}`,
          `Email: ${application.email}`,
          "Contact consent: Yes (call, SMS or WhatsApp)",
          `Submitted at: ${lead.createdAt.toISOString()}`,
          "Source: Academy website form",
        ].join("\n"),
      });
    } catch (error) {
      emailStatus = "failed";
      logger.error("Academy lead saved; notification email failed", { leadId: String(lead._id), code: error.code || error.name });
    }

    try {
      await AcademyLead.updateOne({ _id: lead._id }, { $set: {
        emailStatus,
        emailAttemptedAt: attemptedAt,
        ...(emailStatus === "sent" ? { emailSentAt: new Date() } : {}),
      } });
    } catch (error) {
      // A notification-status error must not make the applicant resubmit a saved lead.
      logger.error("Academy email status could not be updated", { leadId: String(lead._id), code: error.code || error.name });
    }
    return res.status(201).json({ message: "Application received.", data: { saved: true } });
  };
}

module.exports = { createAcademyLeadHandler, validateApplication };
