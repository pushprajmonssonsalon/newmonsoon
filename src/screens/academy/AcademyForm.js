"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./academy.module.css";

export default function AcademyForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const submissionId = useRef(null);
  const submissionData = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current || status === "success") return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const fullName = String(fields.get("full_name") || "").trim();
    const phoneNumber = String(fields.get("phone_number") || "").trim();
    const email = String(fields.get("email") || "").trim();

    const phoneDigits = phoneNumber.replace(/\D/g, "");
    if (fullName.length < 2 || !/^\+?[0-9\s()-]+$/.test(phoneNumber) || phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Please enter your full name and a valid phone number.");
      setStatus("error");
      return;
    }

    submitting.current = true;
    setStatus("submitting");
    setError("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      // Keep the same ID on a retry in case the earlier request was saved.
      const application = { fullName, phoneNumber, email, contactConsent: fields.get("contact_consent") === "on" };
      const fingerprint = JSON.stringify(application);
      if (!submissionId.current || submissionData.current !== fingerprint) {
        submissionId.current = crypto.randomUUID();
        submissionData.current = fingerprint;
      }
      const response = await fetch("/api/academyLeads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...application,
          submissionId: submissionId.current,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.data?.saved !== true) {
        throw new Error(response.status === 400
          ? "Please check your name, phone number, email and consent, then try again."
          : "We couldn't confirm your application. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (failure) {
      setError(failure.name === "AbortError"
        ? "This is taking longer than expected. Please try again."
        : failure instanceof TypeError
          ? "Unable to connect. Please check your connection and try again."
          : failure.message);
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className={styles.form} role="status" aria-live="polite">
        <p className={styles.eyebrow}>ARYA Fellowship</p>
        <h2>Thank you! Your application is received.</h2>
        <p className={styles.formIntro}>Our counsellor will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-labelledby="academy-form-title" aria-describedby="academy-form-status" aria-busy={status === "submitting"}>
      <p className={styles.eyebrow}>Your next chapter starts here</p>
      <h2 id="academy-form-title">Apply for ARYA Scholarship</h2>
      <p className={styles.formIntro}>
        ARYA Fellowship, powered by Monsoon Salon, New Delhi. Explore 250 hours
        of practical training in Hair, Skin, Makeup and Nail Art. Up to 90%
        scholarship, subject to eligibility.
      </p>

      <div className={styles.fields}>
        <div>
          <label htmlFor="academy-full-name">Full name <span aria-hidden="true">*</span></label>
          <input id="academy-full-name" name="full_name" autoComplete="name" placeholder="Enter your full name" minLength={2} maxLength={100} required disabled={status === "submitting"} />
        </div>
        <div>
          <label htmlFor="academy-phone">Phone number <span aria-hidden="true">*</span></label>
          <input id="academy-phone" name="phone_number" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your phone number" minLength={10} maxLength={20} required disabled={status === "submitting"} />
        </div>
        <div>
          <label htmlFor="academy-email">Email address <span aria-hidden="true">*</span></label>
          <input id="academy-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" maxLength={254} required disabled={status === "submitting"} />
        </div>
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="contact_consent" required disabled={status === "submitting"} />
        <span>
          I agree to be contacted by ARYA Fellowship / Monsoon Salon about my
          admission and scholarship by call, SMS or WhatsApp. I have read the{" "}
          <Link href="/privacypolicy">Privacy Policy</Link>.
        </span>
      </label>
      <p className={styles.finePrint}>Scholarship up to 90% is subject to eligibility and availability. T&amp;C apply.</p>
      <button type="submit" disabled={status === "submitting"} aria-describedby="academy-form-status" className={styles.submit}>{status === "submitting" ? "Submitting..." : "Apply Now"} <span aria-hidden="true">↗</span></button>
      <p id="academy-form-status" role={status === "error" ? "alert" : "status"} className={styles.formStatus}>
        {error || (status === "submitting" ? "Sending your application. Please wait." : "Fill in your details and our counsellor will contact you.")}
      </p>
    </form>
  );
}
