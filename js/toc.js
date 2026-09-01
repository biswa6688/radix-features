// Highlights the current section's link in the sticky sidebar TOC as the
// reader scrolls, so the nav always reflects where you actually are on the
// page - not just a static list of jump links.
(() => {
  "use strict";

  const links = Array.from(document.querySelectorAll(".toc ol a[href^='#']"));
  if (links.length === 0) return;

  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);
  if (sections.length === 0) return;

  const linkForId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));

  const setActive = (id) => {
    links.forEach((link) => link.classList.remove("active"));
    const active = linkForId.get(id);
    if (active) active.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) setActive(visible[0].target.id);
    },
    { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
})();
