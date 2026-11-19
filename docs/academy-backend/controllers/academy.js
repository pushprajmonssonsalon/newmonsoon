const AcademyLead = require("../models/academyLead");
const { emailTransport } = require("../services/emailService");
const { createAcademyLeadHandler } = require("../services/academyLeadHandler");

exports.submitAcademyLead = createAcademyLeadHandler({
  AcademyLead,
  // Reuse the existing sender's Gmail configuration, only after a lead is saved.
  sendMail: (options) => {
    const transporter = emailTransport();
    transporter.options.connectionTimeout = 10000;
    transporter.options.greetingTimeout = 10000;
    transporter.options.socketTimeout = 15000;
    return transporter.sendMail(options);
  },
});
