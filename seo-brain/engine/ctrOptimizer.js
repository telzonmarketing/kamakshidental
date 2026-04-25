function optimizeTitle(title, ctr) {
  if (ctr < 2) {
    return title.replace(/\bBest\b/i, "Top Rated");
  }

  if (ctr >= 2 && ctr < 3 && !/Near (You|Me)/i.test(title)) {
    return `${title} Near You`;
  }

  return title;
}

function optimizeMetaDescription(description, ctr, location) {
  if (ctr < 2) {
    return `${description} Updated with pricing, reviews, and faster appointment options in ${location}.`;
  }

  if (ctr < 3) {
    return `${description} Compare timings, ratings, and treatment options in ${location}.`;
  }

  return description;
}

module.exports = {
  optimizeTitle,
  optimizeMetaDescription
};
