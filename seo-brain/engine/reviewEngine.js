function generateReviews(location, service) {
  return [
    `Patients in ${location} mention fast, friendly ${service.toLowerCase()} appointments.`,
    `Highly rated ${service.toLowerCase()} clinic near ${location} with helpful staff.`,
    `Local reviews often mention clean facilities, clear pricing, and strong follow-up in ${location}.`
  ];
}

module.exports = {
  generateReviews
};
