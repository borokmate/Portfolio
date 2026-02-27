// ELEMENTS
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const themeToggle = document.getElementById("themeToggle");

// OPEN MENU
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

// CLOSE MENU
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// CLOSE MENU WHEN CLICKING LINK
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// DARK / LIGHT TOGGLE
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// SCROLL REVEAL
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add("show");
    }
  });
});

// Trigger once on load in case cards are already visible
window.dispatchEvent(new Event("scroll"));

// CONTACT FORM
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  message.textContent = "";

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      message.textContent = "Message sent successfully! ✅";
      message.style.color = "#38bdf8";
      form.reset();
    } else {
      response.json().then(data => {
        message.textContent = data.error || "Oops! Something went wrong. ❌";
        message.style.color = "#ef4444";
      });
    }
  })
  .catch(() => {
    message.textContent = "Network error. Please try again. ❌";
    message.style.color = "#ef4444";
  })
  .finally(() => {
    submitBtn.textContent = "Send";
    submitBtn.disabled = false;
  });
});

// CAROUSEL
// FIX: removed the broken duplicate block that used getElementById("projectCarousel")
// (which doesn't exist) and called scrollBy — it was crashing before the real logic ran.
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function updateCarousel() {
  carouselItems.forEach((item, index) => {
    item.classList.remove("left", "right", "center", "hidden");
    if (index === currentIndex)         item.classList.add("center");
    else if (index === currentIndex - 1) item.classList.add("left");
    else if (index === currentIndex + 1) item.classList.add("right");
    else                                 item.classList.add("hidden");
  });
}

updateCarousel(); // initial render

document.getElementById("carouselLeft").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

document.getElementById("carouselRight").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

// MODAL
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalLink = document.getElementById("modalLink");

carouselItems.forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("center")) return; // only center card opens modal
    modalTitle.textContent = item.dataset.title;
    modalDescription.textContent = item.dataset.description;
    modalImage.src = item.querySelector("img").src;
    modalImage.alt = item.dataset.title;
    modalLink.href = item.dataset.link;
    modal.style.display = "flex";
  });
});

modalClose.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });