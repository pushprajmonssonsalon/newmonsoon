const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createAcademyLeadHandler, validateApplication } = require("../services/academyLeadHandler");

const application = {
  fullName: "Test Applicant",
  phoneNumber: "+91 9999900000",
  email: "applicant@example.com",
  contactConsent: true,
  submissionId: "ef6341bf-30dc-4bc6-8b5c-e185fe48c731",
};

function harness(overrides = {}) {
  const events = [];
  const lead = { _id: "test-lead", createdAt: new Date("2026-11-19T00:00:00Z") };
  const dependencies = {
    AcademyLead: {
      create: async values => { events.push(["save", values]); return lead; },
      updateOne: async (query, update) => { events.push(["status", update.$set]); },
      findOne: async () => lead,
    },
    sendMail: async options => { events.push(["email", options]); },
    logger: { error() {} },
  };
  if (overrides.model) Object.assign(dependencies.AcademyLead, overrides.model);
  if (overrides.sendMail) dependencies.sendMail = overrides.sendMail;
  const response = { status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  return { events, response, run: body => createAcademyLeadHandler(dependencies)({ body }, response) };
}

test("validates consent, rejects malformed input, and normalises fields", () => {
  for (const invalid of [null, [], {}, { ...application, fullName: " " }, { ...application, fullName: "Injected\nName" }, { ...application, phoneNumber: "123" }, { ...application, phoneNumber: "1234567890123456" }, { ...application, email: "bad-email" }, { ...application, email: { $ne: null } }, { ...application, contactConsent: "true" }, { ...application, submissionId: "invalid" }]) {
    assert.equal(validateApplication(invalid), null);
  }
  const value = validateApplication({ ...application, fullName: " Test Applicant ", email: " APPLICANT@EXAMPLE.COM " });
  assert.equal(value.fullName, "Test Applicant");
  assert.equal(value.email, "applicant@example.com");
});

test("invalid requests neither write leads nor send email", async () => {
  const h = harness();
  await h.run({ ...application, contactConsent: false });
  assert.equal(h.response.code, 400);
  assert.deepEqual(h.events, []);
});

test("saves before email and records successful delivery", async () => {
  const h = harness();
  await h.run(application);
  assert.deepEqual(h.events.map(event => event[0]), ["save", "email", "status"]);
  assert.equal(h.events[0][1].contactConsent, true);
  assert.ok(h.events[0][1].consentedAt instanceof Date);
  assert.match(h.events[1][1].text, /Test Applicant/);
  assert.equal(h.events[1][1].from, process.env.ACADEMY_MAIL_FROM || "enquiry@theprofessionalworld.com");
  assert.equal(h.events[1][1].to, process.env.ACADEMY_MAIL_TO || "shubhi@theprofessionalworld.com");
  assert.equal(h.events[2][1].emailStatus, "sent");
  assert.equal(h.response.code, 201);
  assert.equal(h.response.body.data.saved, true);
});

test("database failure sends no email and returns a retryable error", async () => {
  const h = harness({ model: { create: async () => { throw new Error("DB unavailable"); } } });
  await h.run(application);
  assert.deepEqual(h.events, []);
  assert.equal(h.response.code, 503);
});

test("email failure preserves saved application and records notification failure", async () => {
  const h = harness({ sendMail: async () => { throw new Error("SMTP unavailable"); } });
  await h.run(application);
  assert.equal(h.events[0][0], "save");
  assert.equal(h.events[1][1].emailStatus, "failed");
  assert.equal(h.response.code, 201);
  assert.equal(h.response.body.data.saved, true);
});

test("retrying a saved submission does not send duplicate email", async () => {
  const h = harness({ model: { create: async () => { const error = new Error("Duplicate"); error.code = 11000; throw error; } } });
  await h.run(application);
  assert.equal(h.response.code, 200);
  assert.equal(h.response.body.data.saved, true);
  assert.deepEqual(h.events, []);
});

test("failure to update email status does not reject an already saved application", async () => {
  const h = harness({ model: { updateOne: async () => { throw new Error("Status update failed"); } } });
  await h.run(application);
  assert.equal(h.response.code, 201);
  assert.equal(h.response.body.data.saved, true);
});
