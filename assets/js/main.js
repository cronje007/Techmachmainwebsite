document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initRevealOnScroll();
  syncFooterYear();
  initImageFallbacks();
});

function setActiveNav() {
  const page = document.body.dataset.page;
  const activeLink = page ? document.querySelector(`.site-nav a[data-page='${page}']`) : null;
  if (activeLink) activeLink.classList.add("is-active");
}

function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function syncFooterYear() {
  document.querySelectorAll("#year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const alternatives = (img.dataset.altSrcs || "")
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);

    img.addEventListener("error", () => {
      const nextSrc = alternatives.shift();
      if (nextSrc) {
        img.src = nextSrc;
        return;
      }

      img.src = img.dataset.fallback;
    });
  });
}
