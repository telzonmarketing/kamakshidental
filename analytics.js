(function () {
  const measurementId = window.KAMAKSHI_GA4_ID;
  const context = window.KAMAKSHI_TRACKING_CONTEXT || {};

  function loadGtag(id) {
    const external = document.createElement("script");
    external.async = true;
    external.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(external);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", id, {
      page_title: document.title,
      page_path: window.location.pathname
    });
  }

  function track(name, extra) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", name, {
      page_slug: context.pageSlug || "",
      location_name: context.location || "",
      service_name: context.service || "",
      ...extra
    });
  }

  if (measurementId) {
    loadGtag(measurementId);
  }

  document.addEventListener("click", function (event) {
    const anchor = event.target.closest("a");
    const row = event.target.closest(".loc-row");

    if (anchor) {
      const href = anchor.getAttribute("href") || "";
      const label = anchor.textContent.trim().slice(0, 80);

      if (href.startsWith("https://wa.me/")) {
        track("whatsapp_click", { click_label: label, destination: href });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { click_label: label, destination: href });
      } else if (
        href.endsWith(".html") ||
        href.startsWith("/") ||
        href === "index.html"
      ) {
        track("internal_navigation_click", { click_label: label, destination: href });
      }
    }

    if (row) {
      const labelNode = row.querySelector(".loc-row-name");
      track("location_card_click", {
        click_label: labelNode ? labelNode.textContent.trim() : "location-card"
      });
    }
  });
})();
