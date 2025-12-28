/* ================= NAVBAR TOGGLE ================= */

/*
This function is called when the hamburger icon is clicked.
It toggles the 'active' class on the nav menu.
On mobile:
- without 'active' → menu hidden
- with 'active' → menu visible
*/
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}


/* ================= VANTA BACKGROUND ================= */

/*
Initializes the VANTA.NET animated background
attached to the element with id="vanta-bg"
*/
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00bfff,
  backgroundColor: 0x0a192f
});


/* ================= HARD FIX FOR CLICK ISSUE ================= */

/*
VANTA creates a canvas that can block clicks.
This forces all canvas elements to ignore pointer events.
*/
setTimeout(() => {
  document.querySelectorAll("canvas").forEach(c => {
    c.style.pointerEvents = "none";
  });
}, 500);


/* ================= SMOOTH SCROLL WITH NAVBAR OFFSET ================= */

/*
Fixes scroll offset caused by fixed navbar.
When a nav link is clicked:
- prevent default jump
- scroll smoothly with -70px offset
*/
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    const yOffset = -70; // navbar height
    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    // Auto-close mobile menu after click
    document.querySelector(".nav-links").classList.remove("active");
  });
});
