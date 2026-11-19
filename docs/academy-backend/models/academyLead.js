const { Schema, model } = require("mongoose");

const academyLeadSchema = new Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  phoneNumber: { type: String, required: true, trim: true, maxlength: 20 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  contactConsent: { type: Boolean, required: true },
  consentedAt: { type: Date, required: true },
  consentVersion: { type: String, default: "arya-academy-v1" },
  source: { type: String, default: "website_academy" },
  submissionId: { type: String, required: true, unique: true },
  emailStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  emailAttemptedAt: Date,
  emailSentAt: Date,
}, {
  collection: "academy_leads",
  timestamps: true,
  versionKey: false,
});

module.exports = model("AcademyLead", academyLeadSchema);
