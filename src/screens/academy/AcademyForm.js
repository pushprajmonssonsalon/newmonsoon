"use client";

import Link from "next/link";
import styles from "./academy.module.css";

export default function AcademyForm() {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()} aria-labelledby="academy-form-title" aria-describedby="academy-form-status">
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
          <input id="academy-full-name" name="full_name" autoComplete="name" placeholder="Enter your full name" maxLength={100} required />
        </div>
        <div>
          <label htmlFor="academy-phone">Phone number <span aria-hidden="true">*</span></label>
          <input id="academy-phone" name="phone_number" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your phone number" pattern="[+0-9 ()-]{10,20}" maxLength={20} required />
        </div>
        <div>
          <label htmlFor="academy-email">Email address <span aria-hidden="true">*</span></label>
          <input id="academy-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" maxLength={254} required />
        </div>
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="contact_consent" required />
        <span>
          I agree to be contacted by ARYA Fellowship / Monsoon Salon about my
          admission and scholarship by call, SMS or WhatsApp. I have read the{" "}
          <Link href="/privacypolicy">Privacy Policy</Link>.
        </span>
      </label>
      <p className={styles.finePrint}>Scholarship up to 90% is subject to eligibility and availability. T&amp;C apply.</p>
      {/* Enable submission after the authorised server-side integration is connected. */}
      <button type="submit" disabled aria-describedby="academy-form-status" className={styles.submit}>Apply Now <span aria-hidden="true">↗</span></button>
      <p id="academy-form-status" role="status" className={styles.formStatus}>
        Online applications are opening soon. This form is not accepting submissions yet.
      </p>
    </form>
  );
}
