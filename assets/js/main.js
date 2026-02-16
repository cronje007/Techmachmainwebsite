document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initRevealOnScroll();
  syncFooterYear();
  initImageFallbacks();
  initSectionGallery();
  initLightbox();
  initBackgroundShuffle();
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
    img.addEventListener("error", () => {
      img.src = img.dataset.fallback;
    });
  });
}

function initSectionGallery() {
  const root = document.querySelector("#section-gallery");
  if (!root) return;

  const section = root.dataset.section;
  const data = {
    cereal: ["cover.jpg", "line-01.jpg", "line-02.jpg", "line-03.jpg", "cover.jpeg", "cover.png", "cover.webp"],
    feedmilling: ["cover.jpg", "line-01.jpg", "line-02.jpg", "line-03.jpg", "cover.jpeg", "cover.png", "cover.webp"],
    seed: ["cover.jpg", "line-01.jpg", "line-02.jpg", "line-03.jpg", "cover.jpeg", "cover.png", "cover.webp"]
  };

  const files = data[section] || [];
  if (!files.length) {
    root.innerHTML = '<p class="empty-message">Images will appear here soon.</p>';
    return;
  }

  root.innerHTML = files
    .map((file, index) => {
      const src = `projects/${section}/${file}`;
      return `
        <article class="card gallery-item">
          <img src="${src}" alt="${section} project image ${index + 1}" data-fallback="assets/img/project-fallback.svg" data-full="${src}" />
        </article>
      `;
    })
    .join("");

  initImageFallbacks();
}

function initLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close image">×</button><img src="" alt="Expanded project image" />';
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");

  document.addEventListener("click", (event) => {
    const target = event.target.closest(".gallery-item img");
    if (!target) return;

    const full = target.getAttribute("data-full") || target.src;
    image.src = full;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
  }

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

function initBackgroundShuffle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const files = [
    'Silocomplex.jpg',
    'Silocomplex.jpeg',
    'Silocomplex.png',
    'Silocomplex.webp',
    'image-01.jpg',
    'image-02.jpeg',
    'image-03.png',
    'image-04.webp'
  ];

  const images = files.map((name) => `backround suffle/${name}`);
  let index = 0;

  function applyBackground() {
    const src = encodeURI(images[index]);
    hero.style.backgroundImage = `linear-gradient(110deg, rgba(15, 27, 46, 0.78), rgba(31, 47, 74, 0.64)), url('${src}')`;
  }

  function next() {
    index = (index + 1) % images.length;
    applyBackground();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    applyBackground();
  }

  document.querySelector('[data-bg-next]')?.addEventListener('click', next);
  document.querySelector('[data-bg-prev]')?.addEventListener('click', prev);

  let wheelTimeout;
  hero.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (wheelTimeout) return;
    wheelTimeout = setTimeout(() => {
      wheelTimeout = null;
    }, 220);

    if (event.deltaY > 0) {
      next();
    } else {
      prev();
    }
  }, { passive: false });

  applyBackground();
}
