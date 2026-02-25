// ===============================
// Nick Fisher Portfolio Scripts
// ===============================

// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Make project cards clickable
document.querySelectorAll(".card[data-href]").forEach((card) => {
  const href = card.getAttribute("data-href");
  if (!href) return;

  // Mouse click
  card.addEventListener("click", (e) => {
    // If clicking a real link inside the card, don't override it
    const interactive = e.target.closest("a, button, input, textarea, select");
    if (interactive) return;

    window.location.href = href;
  });

  // Keyboard accessibility (Enter / Space)
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = href;
    }
  });
});



// ===============================
// Subtle 3D tilt + dynamic shadow
// ===============================
(() => {
  const MAX_TILT_DEG = 5;
  const SHADOW_MOVE = 10; // how far shadow moves

  const cards = document.querySelectorAll(".card--tilt");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rx = (-y * MAX_TILT_DEG).toFixed(2);
      const ry = (x * MAX_TILT_DEG).toFixed(2);

      // Shadow moves opposite tilt
      const sx = (-x * SHADOW_MOVE).toFixed(2);
      const sy = (y * SHADOW_MOVE + 18).toFixed(2);

      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--sx", `${sx}px`);
      card.style.setProperty("--sy", `${sy}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--sx", `0px`);
      card.style.setProperty("--sy", `18px`);
    });
  });
})();


// ===============================
// Media Carousel (arrows + keyboard)
// ===============================
(() => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-track]");
    const prevBtn = carousel.querySelector("[data-prev]");
    const nextBtn = carousel.querySelector("[data-next]");
    const viewport = carousel.querySelector(".mediaViewport");

    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    let index = 0;

    const update = () => {
      track.style.transform = `translateX(${-index * 100}%)`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    };

    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      update();
    });

    nextBtn.addEventListener("click", () => {
      index = Math.min(slides.length - 1, index + 1);
      update();
    });

    // Keyboard support when viewport is focused
    viewport?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        index = Math.max(0, index - 1);
        update();
      } else if (e.key === "ArrowRight") {
        index = Math.min(slides.length - 1, index + 1);
        update();
      }
    });

    update();
  });
})();

// ===============================
// Revolving carousels (games + automation)
// Looks for: [data-revolve-carousel]
// ===============================
(() => {
  const carousels = document.querySelectorAll("[data-revolve-carousel]");

  carousels.forEach((root) => {
    const stage = root.querySelector(".revolveStage");
    stage.classList.add("is-active");
    const items = Array.from(root.querySelectorAll(".revolveItem"));
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");

    if (!stage || !items.length || !prev || !next) return;

    let index = 0;

    // Tunables (feel free to tweak)
    const X = 240;      // horizontal spacing between items
    const Z = 170;      // depth pushback for side items
    const ROT = 20;     // rotateY degrees
    const SCALE_SIDE = 0.88;

    function render() {
      items.forEach((el, i) => {
        el.classList.remove("is-active");
        // shortest wrap-around offset so it "revolves" nicely
        let offset = i - index;
        const half = Math.floor(items.length / 2);

        if (offset > half) offset -= items.length;
        if (offset < -half) offset += items.length;

        const abs = Math.abs(offset);
        if (offset === 0) {
          el.classList.add("is-active");
        }

        const visible = abs <= 2; // show center + 2 neighbors each side

        const tx = offset * X;
        const tz = -abs * Z;
        const ry = offset * -ROT;
        const sc = offset === 0 ? 1 : SCALE_SIDE;

        el.style.opacity = visible ? (offset === 0 ? "1" : "0.55") : "0";
        el.style.filter = visible ? (offset === 0 ? "none" : "brightness(0.75)") : "brightness(0.65)";
        el.style.pointerEvents = offset === 0 ? "auto" : "none";

        el.style.transform =
          `translate(-50%, -50%) translate3d(${tx}px,0,${tz}px) rotateY(${ry}deg) scale(${sc})`;
      });
    }

    function go(dir) {
      index = (index + dir + items.length) % items.length;
      render();
    }

    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));

    // keyboard: focus stage then use arrows
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });

    // click center card using your existing card handler (data-href)
    // NOTE: your existing clickable-card JS will still work.

    render();
  });
})();


