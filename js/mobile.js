// --- Mobile Menu ---
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
  const isExpanded = navLinks.classList.contains("active");
  document
    .querySelector(".mobile-menu")
    .setAttribute("aria-expanded", isExpanded);
}
