const salonFranchiseData = [
  {
    state: "Maharashtra",
    text: "Salon Franchise in Mumbai Near Me | Monsoon Salon",
    description:
      "Start your own salon franchise in Mumbai near me with Monsoon Salon. Get full support, training, and a trusted brand to grow your beauty business."
  },
  {
    state: "Meghalaya",
    text: "Salon Franchise in Meghalaya Near Me | Monsoon Salon",
    description:
      "Explore salon franchise opportunities in Meghalaya and start a successful beauty business with complete guidance and support."
  },
  {
    state: "Uttar Pradesh",
    text: "Salon Franchise Uttar Pradesh | Start Your Beauty Business in UP",
    description:
      "Looking for a salon franchise near me in Uttar Pradesh? Explore top salon franchise opportunities in UP and launch your successful beauty business with expert support and proven models."
  },
  {
    state: "Assam",
    text: "Salon Franchise Assam | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Assam? Explore top opportunities and start your profitable beauty business with expert support."
  },
  {
    state: "Jharkhand",
    text: "Salon Franchise Jharkhand | Start Your Beauty Business",
    description:
      "Launch your beauty business in Jharkhand with trusted salon franchise opportunities and complete support for growth."
  },
  {
    state: "West Bengal",
    text: "Salon Franchise West Bengal | Start Your Beauty Business",
    description:
      "Find top salon franchise opportunities in West Bengal and start a successful beauty business with full support and training."
  },
  {
    state: "New Delhi",
    text: "Salon Franchise New Delhi | Start Your Beauty Business",
    description:
      "Find a salon franchise near me in New Delhi and launch your beauty business with top franchise opportunities and expert guidance."
  },
  {
    state: "Telangana",
    text: "Salon Franchise Telangana | Launch Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Telangana? Discover top opportunities and start your successful beauty business today."
  },
  {
    state: "Tamil Nadu",
    text: "Salon Franchise Tamil Nadu | Launch Your Beauty Business",
    description:
      "Explore salon franchise opportunities in Tamil Nadu and launch a profitable beauty business with full support."
  },
  {
    state: "Rajasthan",
    text: "Salon Franchise Rajasthan | Start Your Beauty Business",
    description:
      "Explore a salon franchise near me in Rajasthan and start a profitable beauty business with expert guidance and proven franchise models."
  },
  {
    state: "Chandigarh",
    text: "Salon Franchise Chandigarh | Start Your Beauty Business",
    description:
      "Searching for a salon franchise near me in Chandigarh? Launch your beauty business with top franchise support and expert guidance."
  },
  {
    state: "Ladakh",
    text: "Salon Franchise Ladakh | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Ladakh and start a successful beauty business with trusted franchise opportunities and expert support."
  },
  {
    state: "Manipur",
    text: "Salon Franchise Manipur | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Manipur? Explore top opportunities to launch your profitable beauty business successfully."
  },
  {
    state: "Madhya Pradesh",
    text: "Salon Franchise MP | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Madhya Pradesh and start a successful beauty business with expert guidance and proven franchise models."
  },
  {
    state: "Arunachal Pradesh",
    text: "Salon Franchise AP | Start Your Beauty Business",
    description:
      "Explore salon franchise opportunities in Arunachal Pradesh and launch a successful beauty business with complete support."
  },
  {
    state: "Andhra Pradesh",
    text: "Salon Franchise Andhra Pradesh | Start Your Beauty Business",
    description:
      "Explore a salon franchise near me in Andhra Pradesh and launch your profitable beauty business with top franchise support and expert guidance."
  },
  {
    state: "Jammu Kashmir",
    text: "Salon Franchise Jammu Kashmir | Start Your Beauty Business",
    description:
      "Find salon franchise opportunities in Jammu & Kashmir and start your beauty business with complete training and guidance."
  },
  {
    state: "Punjab",
    text: "Salon Franchise Punjab | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Punjab? Discover top franchise opportunities to grow your beauty business successfully."
  },
  {
    state: "Haryana",
    text: "Salon Franchise Haryana | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Haryana and start a successful beauty business with expert support and proven franchise models."
  }
];

export function getSalonMeta(stateName) {
  const found = salonFranchiseData.find((elm) => elm.state === stateName);
  if (found) return { title: found.text, description: found.description };
  return {
    title: `Salon Franchise  ${stateName || ""} | Start Your Beauty Business`,
    description: `Looking for a salon franchise near me in ${stateName || ""}? Explore top opportunities and start your profitable beauty business with expert support.`,
  };
}
