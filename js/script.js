document.addEventListener("DOMContentLoaded", () => {

  //==============================
  // Scroll Reveal
  //==============================

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  const galleryObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  }, {

    threshold: 0.15

  });

  document.querySelectorAll(".gallery figure").forEach(el => galleryObserver.observe(el));

  //==============================
  // Lightbox
  //==============================

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  const galleryImages = document.querySelectorAll(".gallery img");
  let currentIndex = 0;

  function animateImage() {

    lightboxImg.animate(

      [
        {
          opacity: 0.2,
          transform: "scale(0.96)"
        },
        {
          opacity: 1,
          transform: "scale(1)"
        }
      ],

      {
        duration: 250
      }

    );

  }

  galleryImages.forEach((img, index) => {

    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {

      currentIndex = index;

      lightboxImg.src = img.src;

      lightboxCaption.textContent = img.alt;

      animateImage();

      lightbox.classList.add("open");

      document.body.style.overflow = "hidden";
    });

  });


  function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {

    if (e.target === lightbox) {

      closeLightbox();

    }

  });

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

      closeLightbox();

    }

  });

  document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("open")) return;

    if (e.key === "ArrowRight") {

      currentIndex++;

      if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

      }

      lightboxImg.src = galleryImages[currentIndex].src;

      lightboxCaption.textContent = galleryImages[currentIndex].alt;
      animateImage();

    }

    if (e.key === "ArrowLeft") {

      currentIndex--;

      if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

      }

      lightboxImg.src = galleryImages[currentIndex].src;

      lightboxCaption.textContent = galleryImages[currentIndex].alt;
      animateImage();

    }

  });

  //==============================
  // Swipe
  //==============================

  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {

    touchStartX = e.touches[0].clientX;

  });

  lightbox.addEventListener("touchend", (e) => {

    const touchEndX = e.changedTouches[0].clientX;

    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {

      currentIndex++;

      if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

      }

    } else {

      currentIndex--;

      if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

      }

    }

    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxCaption.textContent = galleryImages[currentIndex].alt;
    animateImage();

  });


  //==============================
  // Active Navigation
  //==============================

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const navObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {

          link.classList.remove("active");

          if (link.getAttribute("href") === "#" + entry.target.id) {

            link.classList.add("active");

          }

        });

      }

    });

  }, {
    threshold: .5
  });

  sections.forEach(section => navObserver.observe(section));

});