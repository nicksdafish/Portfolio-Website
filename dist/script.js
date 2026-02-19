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
// Static blur trigger at Projects section
// ===============================
(function () {
  const video = document.getElementById("bgVideo");
  const triggerSection = document.getElementById("projects");

  if (!video || !triggerSection) return;

  function updateVideoState() {
    // Position of the Projects section relative to viewport
    const rect = triggerSection.getBoundingClientRect();

    // When top of Projects crosses top of viewport
    const crossed = rect.top <= 0;

    video.classList.toggle("is-blurred", crossed);
  }

  // Run once + on scroll
  updateVideoState();
  window.addEventListener("scroll", updateVideoState, { passive: true });
})();
