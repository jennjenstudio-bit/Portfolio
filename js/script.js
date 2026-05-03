const sidebarSlot = document.getElementById("sidebar-slot");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");
const footerSlot = document.getElementById("footer-slot");

// Load sidebar
async function loadSidebar() {
  if (!sidebarSlot) return;
  const res = await fetch("component/sidebar.html");
  sidebarSlot.innerHTML = await res.text();
}

// Load footer
async function loadFooter() {
  if (!footerSlot) return;
  const res = await fetch("component/footer.html");
  footerSlot.innerHTML = await res.text();
}

// Close sidebar
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("open");
  overlay?.classList.remove("show");
}

// Open sidebar
menuBtn?.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.add("open");
  overlay?.classList.add("show");
});

// Click overlay to close
overlay?.addEventListener("click", closeSidebar);

// Load components
loadFooter();
loadSidebar().then(() => {
  const currentPage = document.body.dataset.page;

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      (currentPage === "about" && href === "index.html") ||
      (currentPage === "portfolio" && href === "portfolio.html") ||
      (currentPage === "video" && href === "video.html")
    ) {
      link.classList.add("active");
    }

    link.addEventListener("click", closeSidebar);
  });
});