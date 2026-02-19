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

