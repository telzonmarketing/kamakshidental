function buildGraph(pages) {
  return pages.map((page) => {
    const related = pages
      .filter((candidate) => candidate.slug !== page.slug)
      .filter((candidate) => {
        return (
          candidate.locationSlug !== page.locationSlug ||
          candidate.serviceSlug !== page.serviceSlug
        );
      })
      .slice(0, 5)
      .map((candidate) => ({
        slug: candidate.slug,
        anchor: candidate.title
      }));

    return {
      ...page,
      links: related
    };
  });
}

module.exports = {
  buildGraph
};
