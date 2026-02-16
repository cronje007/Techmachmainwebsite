document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initRevealOnScroll();
  syncFooterYear();
});

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  const activeLink = document.querySelector(`.site-nav a[data-page='${page}']`);
  if (activeLink) activeLink.classList.add("is-active");
}

function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
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
