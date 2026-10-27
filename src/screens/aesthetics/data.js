import hair from "../../assets/images/hair2.webp";
import beauty from "../../assets/images/beauty2.webp";
import makeup from "../../assets/images/beauty1.webp";
import nail from "../../assets/images/nail1.webp";

// Dummy images for now - replace with real treatment photos later.
const dummyImages = [hair, beauty, makeup, nail];

export const aestheticServices = [
  {
    category: "Laser Hair Reduction",
    machine: "1. Diode Laser",
    description:
      "Uses laser energy absorbed by melanin in the hair shaft and follicle to achieve long-term hair reduction. Treatment parameters are selected according to skin type, hair characteristics and device specifications.",
  },
  {
    category: "Laser Skin Treatments",
    machine: "2. Q-Switch Laser",
    description:
      "Delivers high-intensity, short-duration laser pulses that target selected skin pigments. Depending on the wavelength and device, it may be used for certain pigmented lesions and tattoo removal, following appropriate assessment.",
  },
  {
    category: "Skin Rejuvenation & Tightening",
    machine: "3. MNRF (Microneedling Radiofrequency)",
    description:
      "Combines microneedles with radiofrequency energy to deliver controlled thermal stimulation within the skin. It may improve the appearance of acne scars, skin texture and fine lines, depending on the device and treatment protocol.",
  },
  {
    category: "Non-Surgical Skin Lifting",
    machine: "4. HIFU (High-Intensity Focused Ultrasound)",
    description:
      "Focuses ultrasound energy at selected tissue depths to produce controlled thermal effects. Depending on the device and approved indication, it may support skin tightening and lifting.",
  },
  {
    category: "Advanced Facial Treatments",
    machine: "5. HydraFacial",
    description:
      "Uses a device-based facial process combining cleansing, exfoliation, suction-assisted pore cleansing and topical serum application. It helps improve skin hydration, smoothness and overall appearance.",
  },
  {
    category: "Body Sculpting & Fat Reduction",
    machine: "6. Body Contouring",
    description:
      "Uses technology-specific methods, such as radiofrequency, electromagnetic stimulation or controlled cooling, to target selected body-contouring goals. The mechanism and expected outcomes depend on the machine's technology.",
  },
  {
    category: "Skin Analysis & Assessment",
    machine: "7. FA (Facial Analyzer)",
    description:
      "Uses digital imaging and, depending on the system, specialised lighting or image analysis to assess visible skin characteristics such as pigmentation, pores, wrinkles and texture. It supports personalised skincare planning but does not replace medical diagnosis.",
  },
  {
    category: "Skin Tightening & Firming",
    machine: "8. RF (Radiofrequency)",
    description:
      "Delivers radiofrequency energy to generate controlled tissue heating. Depending on the device and application, it may help improve the appearance of skin laxity and support skin firmness.",
  },
].map((s, i) => ({
  ...s,
  slug: s.category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  img: dummyImages[i % dummyImages.length],
}));

export const aestheticFaqs = [
  {
    title: "What treatments and services do you offer at Monsoon Aesthetics?",
    details:
      "We offer advanced skin and body treatments including laser hair reduction, laser skin treatments, skin rejuvenation and tightening, non-surgical skin lifting, HydraFacial, body sculpting, skin analysis and radiofrequency tightening.",
  },
  {
    title: "What makes Monsoon Aesthetics different from a regular salon?",
    details:
      "Our aesthetic treatments use advanced technology with personalised treatment plans, delivered by trained professionals following strict hygiene and safety standards.",
  },
  {
    title: "What are the operating hours?",
    details:
      "Our salons are open every day. Timings may vary by location, so please check your nearest Monsoon Salon on the Locations page.",
  },
  {
    title: "Is a consultation necessary before treatment?",
    details:
      "Yes, a consultation is recommended so our team can assess your skin and goals and build a personalised treatment plan.",
  },
  {
    title: "How do I book an appointment?",
    details:
      "You can book a free consultation using the form on this page, or contact your nearest Monsoon Salon by phone.",
  },
  {
    title: "Where are you located?",
    details:
      "Monsoon Salon has outlets across India. Visit the Locations page to find the salon nearest to you.",
  },
  {
    title: "Do you offer EMI or payment plans?",
    details:
      "Flexible payment options and long-term packages may be available. Our team will explain them during your consultation.",
  },
  {
    title: "Do you offer any packages or membership plans?",
    details:
      "Yes, customised packages and memberships may be available for selected treatments. Details are shared during consultation.",
  },
];
