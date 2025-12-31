/* ================= NAVBAR TOGGLE ================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  
  nav.classList.toggle("active");
  
  // Prevent body scrolling when mobile menu is open
  if (nav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "initial";
  }
}

/* ================= SMOOTH SCROLL & AUTO-CLOSE ================= */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // ONLY smooth scroll if it's an internal anchor link
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const yOffset = -70; 
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      
      // Always close the menu after clicking an internal link
      const nav = document.getElementById("navLinks");
      nav.classList.remove("active");
      document.body.style.overflow = "initial";
    }
    // External links (FAQ, PDF) will open naturally
  });
});

/* ================= GALLERY FILTER ================= */
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.querySelector('.gallery-grid'); // Target the grid
  const message = document.getElementById('toppersMessage');

  // 1. Update active button UI
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${category}'`)) {
      btn.classList.add('active');
    }
  });

  // 2. Clear previous state
  // We want to reset everything before applying the new filter
  message.style.display = 'none';
  grid.style.display = 'grid';

  // 3. Toppers Logic
  if (category === 'toppers') {
    grid.style.display = 'none';    // Hide the grid entirely
    message.style.display = 'block'; // Show the message
    return; // Exit the function early
  }

  // 4. Regular Image Filtering (for All, Pre, During, Post)
  let count = 0;
  items.forEach(item => {
    // Hide initially for animation
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';

    let shouldShow = false;
    if (category === 'all') {
      // In 'all' mode, we show the first 8 items marked with class 'all'
      if (item.classList.contains('all') && count < 8) {
        shouldShow = true;
        count++;
      }
    } else if (item.classList.contains(category)) {
      shouldShow = true;
    }

    // Toggle display immediately so they take up space
    item.style.display = shouldShow ? 'grid' : 'none';

    // Apply fade-in animation if it should be seen
    if (shouldShow) {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 50);
    }
  });
}
window.addEventListener('DOMContentLoaded', () => {
  filterGallery('all');
});

/* ================= LIGHTBOX ================= */
function openLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  Object.assign(lightbox.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: '9999'
  });

  const img = document.createElement('img');
  img.src = src;
  Object.assign(img.style, {
    maxWidth: '90%', maxHeight: '90%', boxShadow: '0 0 20px rgba(255,255,255,0.5)', borderRadius: '8px'
  });

  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
  lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
}

/* ================= VANTA BACKGROUND ================= */
// Use window load to ensure Three.js is ready
window.addEventListener('load', () => {
   VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x00bfff,
  backgroundColor: 0x0a192f,
  /* --- ADJUST THESE TO REDUCE NODE SIZE --- */
  points: 12.00,       // Reduce this number for fewer/smaller looking clusters
  maxDistance: 15.00,  // Reduce this to make the connecting lines shorter/tighter
  spacing: 18.00       // Increase this to spread them out, making nodes appear smaller
})
});