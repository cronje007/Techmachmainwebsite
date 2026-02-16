document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initRevealOnScroll();
  initProjectsGallery();
  initLightbox();
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

function initProjectsGallery() {
  const galleryRoot = document.querySelector("#projects-gallery");
  const filterRow = document.querySelector("#project-filters");
  const projectDescription = document.querySelector("#project-description");

  if (!galleryRoot || !filterRow || !projectDescription) return;

  const projectData = {
    "feed-milling": {
      name: "Feed Milling",
      description:
        "Engineering support and complete systems for efficient animal feed production lines.",
      folder: "projects/feed-milling",
      images: []
      // Add file names here, e.g. ["line-01.jpg", "line-02.jpg"]
    },
    "seed-lines": {
      name: "Seed Lines",
      description:
        "Seed cleaning, handling and processing line solutions designed for consistent quality.",
      folder: "projects/seed-lines",
      images: []
    },
    "cereal-milling": {
      name: "Cereal Milling",
      description:
        "Reliable cereal milling project installations tailored to customer capacity needs.",
      folder: "projects/cereal-milling",
      images: []
    }
  };

  const categories = Object.keys(projectData);
  let current = categories[0];

  function renderFilters() {
    filterRow.innerHTML = "";
    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.className = `filter-btn ${category === current ? "is-active" : ""}`;
      btn.type = "button";
      btn.textContent = projectData[category].name;
      btn.setAttribute("data-category", category);
      btn.addEventListener("click", () => {
        current = category;
        renderFilters();
        renderGallery();
      });
      filterRow.appendChild(btn);
    });
  }

  function renderGallery() {
    const data = projectData[current];
    projectDescription.textContent = data.description;
    galleryRoot.innerHTML = "";

    if (!data.images.length) {
      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.textContent = "Images coming soon.";
      galleryRoot.appendChild(placeholder);
      return;
    }

    data.images.forEach((filename, index) => {
      const src = `${data.folder}/${filename}`;
      const item = document.createElement("article");
      item.className = "gallery-item";
      item.innerHTML = `
        <button type="button" class="lightbox-trigger" data-full="${src}" aria-label="Open image ${index + 1} for ${data.name}">
          <img src="${src}" alt="${data.name} project image ${index + 1}" loading="lazy" onerror="this.closest('.gallery-item').remove();" />
        </button>
      `;
      galleryRoot.appendChild(item);
    });
  }

  renderFilters();
  renderGallery();
}

function initLightbox() {
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeBtn = lightbox?.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImage || !closeBtn) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".lightbox-trigger");
    if (!trigger) return;

    const src = trigger.getAttribute("data-full");
    if (!src) return;

    lightboxImage.src = src;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  });

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}


function syncFooterYear() {
  document.querySelectorAll("#year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}
