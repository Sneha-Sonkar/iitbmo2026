/* ================= NAVBAR TOGGLE ================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
  
  // Logic to prevent scrolling when menu is open
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

    // Only prevent default if it's an internal anchor
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const yOffset = -70; 
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        // Close menu and restore scroll
        document.getElementById("navLinks").classList.remove("active");
        document.body.style.overflow = "initial";
      }
    }
  });
});

// gallery secn starts
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-btn');

  // Update active button state
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${category}'`)) {
      btn.classList.add('active');
    }
  });

  let count = 0;

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      let shouldShow = false;

      if (category === 'all') {
        if (item.classList.contains('all') && count < 8) {
          shouldShow = true;
          count++;
        }
      } else if (item.classList.contains(category)) {
        shouldShow = true;
      }

      item.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      }
    }, 100);
  });
}

// ✅ Ensure "All" is applied on page load
window.addEventListener('DOMContentLoaded', () => {
  filterGallery('all');
});

function openLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.position = 'fixed';
  lightbox.style.top = '0';
  lightbox.style.left = '0';
  lightbox.style.width = '100vw';
  lightbox.style.height = '100vh';
  lightbox.style.background = 'rgba(0,0,0,0.8)';
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.style.zIndex = '9999';

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
  img.style.borderRadius = '8px';

  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', () => {
    document.body.removeChild(lightbox);
  });
}
// gallery section ends 

/* ================= VANTA BACKGROUND ================= */
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