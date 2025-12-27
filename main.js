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

/* HARD FIX FOR CLICK ISSUE */
setTimeout(() => {
  document.querySelectorAll("canvas").forEach(c => {
    c.style.pointerEvents = "none";
  });
}, 500);

// Fix offset for fixed navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    const yOffset = -70; // navbar height
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  });
});
