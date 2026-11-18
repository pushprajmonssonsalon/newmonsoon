import Image from "next/image";
import { ArrowUpRight, Award, BookOpen, Clock3, MapPin, Scissors, Sparkles, BriefcaseBusiness } from "./icons";
import AcademyForm from "./AcademyForm";
import styles from "./academy.module.css";
import hair from "../../assets/images/hair2.webp";
import beauty from "../../assets/images/beauty2.webp";
import makeup from "../../assets/images/beauty1.webp";
import nails from "../../assets/images/nail1.webp";

const courses = [
  { name: "Hair Styling", image: hair, text: "Turn your passion for hair into a professional skill." },
  { name: "Beauty & Skin Care", image: beauty, text: "Build your skills in beauty and skin care." },
  { name: "Professional Makeup", image: makeup, text: "Explore the art of professional makeup." },
  { name: "Nail Art", image: nails, text: "Bring creativity and detail to every set of nails." },
];

export default function Academy() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="academy-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <div className={styles.location}><MapPin /> New Delhi <span /> Beauty Academy</div>
            <p className={styles.wordmark}>ARYA <span>FELLOWSHIP</span></p>
            <h1 id="academy-title">Upgrade your skills.<br /><em>Build your career!</em></h1>
            <p className={styles.heroDescription}>Your passion for beauty has a future. Take the next step with professional training in Hair, Skin, Makeup and Nail Art.</p>
            <div className={styles.jobPromise}>
              <BriefcaseBusiness />
              <div><strong>Guaranteed Job Opportunity</strong><p>Earn up to <b>₹15,000/month</b> after course completion.</p></div>
            </div>
            <a href="#academy-application" className={styles.primaryButton}>Limited seats – Enroll now <ArrowUpRight /></a>
            <p className={styles.powered}>Powered by <strong>Monsoon Salon</strong></p>
          </div>
          <div className={styles.posterWrap}>
            <Image src="/images/academy/arya-fellowship.jpeg" alt="ARYA Fellowship: professional beauty courses, 90% scholarship, 250 hours of training, practical learning and certification in New Delhi. Powered by Monsoon Salon." width={1254} height={1254} priority sizes="(min-width: 1100px) 560px, (min-width: 768px) 50vw, 100vw" className={styles.poster} />
          </div>
        </div>
      </section>

      <section className={styles.scholarship} aria-labelledby="scholarship-title">
        <div className={`${styles.container} ${styles.scholarshipInner}`}>
          <div className={styles.percentage}>90<span>%</span></div>
          <div><p className={styles.eyebrow}>An opportunity to begin</p><h2 id="scholarship-title">Get 90% scholarship on<br />professional beauty courses.</h2><p className={styles.scholarshipNote}>Subject to eligibility and availability. T&amp;C apply.</p></div>
          <a href="#academy-application" className={styles.lightButton}>Apply for scholarship <ArrowUpRight /></a>
        </div>
      </section>

      <section className={`${styles.container} ${styles.courses}`} aria-labelledby="academy-courses-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>Courses offered</p><h2 id="academy-courses-title">Find your craft.</h2></div>
          <p>Four ways to turn your creativity<br />into your next career move.</p>
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <article className={styles.course} key={course.name}>
              <div className={styles.courseImage}><Image src={course.image} alt={course.name} width={400} height={480} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" /><span>0{index + 1}</span></div>
              <h3>{course.name}</h3><p>{course.text}</p>
              <a href="#academy-application" aria-label={`Enquire about ${course.name}`}>Explore your opportunity <ArrowUpRight /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="academy-application" className={styles.application} aria-labelledby="academy-program-title">
        <div className={`${styles.container} ${styles.applicationGrid}`}>
          <div className={styles.program}>
            <p className={styles.eyebrow}>Program highlights</p>
            <h2 id="academy-program-title">Learn by doing.<br /><em>Grow with confidence.</em></h2>
            <p className={styles.programIntro}>Build your skills through practical learning, with a program designed around your future in beauty.</p>
            <ul className={styles.highlights}>
              <li><Clock3 /><div><h3>250 hours of training</h3><p>Dedicated time to develop your professional skills.</p></div></li>
              <li><BookOpen /><div><h3>Practical learning</h3><p>Learn through hands-on experience.</p></div></li>
              <li><Award /><div><h3>Certification</h3><p>Complete your training with certification.</p></div></li>
            </ul>
            <div className={styles.academyLocation}><MapPin /><div><span>ACADEMY LOCATION</span><strong>New Delhi</strong></div></div>
            <p className={styles.limited}><Sparkles /> Limited seats. Make your next move.</p>
          </div>
          <AcademyForm />
        </div>
      </section>
      <div className={styles.signoff}><Scissors /><span>ARYA FELLOWSHIP</span><span className={styles.signoffDivider}>/</span><span>Powered by Monsoon Salon</span></div>
    </div>
  );
}
