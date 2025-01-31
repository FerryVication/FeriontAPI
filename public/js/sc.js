//const { readLogs } = require('./lib/logUtils.js');
const elmnt = document.querySelector('p[tdyReq]');
let todayReq = elmnt ? parseInt(elmnt.getAttribute('tdyReq'), 10) : null;  // Mengonversi menjadi angka


function dash() {
  window.location.href = '/dash';
}

function docs() {
  window.location.href = '/docs';
}

function onScrollRevealParagraph() {
  const paragraphs = document.querySelectorAll('.container-fitur .card-container-fitur p');
 
  paragraphs.forEach(paragraph => {
    const rect = paragraph.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
      paragraph.classList.add('visible');
      paragraph.classList.remove('hidden');
    } else {
      paragraph.classList.add('hidden');
      paragraph.classList.remove('visible');
    }
  });
}

function onScrollRevealHeading() {
  const headings = document.querySelectorAll('.container-fitur .card-container-fitur .judul');
  
  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect();
    const windowHeight1 = window.innerHeight;
    
    if (rect.top <= windowHeight1 * 0.8 && rect.bottom >= 0) {
      heading.classList.add('visible');
      heading.classList.remove('hidden');
    } else {
      heading.classList.add('hidden');
      heading.classList.remove('visible');
    }
  });
}

function onScrollRevealI() {
  const elements = document.querySelectorAll('.container-fitur .card-container-fitur .icon');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
      element.classList.add('visible');
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
      element.classList.remove('visible');
    }
  });
}

// Menambahkan event listener untuk scroll
window.addEventListener('scroll', onScrollRevealParagraph);
window.addEventListener('scroll', onScrollRevealHeading);
window.addEventListener('scroll', onScrollRevealI);

// Panggil fungsi onScrollReveal saat pertama kali memuat halaman
window.addEventListener('load', onScrollRevealParagraph);
window.addEventListener('load', onScrollRevealHeading);
window.addEventListener('load', onScrollRevealI);
// Fungsi untuk mengecek apakah elemen terlihat di viewport
// Fungsi untuk mengecek apakah elemen terlihat di viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Menangani scroll untuk menambahkan/menghapus class 'visible'
function handleScroll() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    if (isInViewport(card)) {
      if (!card.classList.contains('visible')) {
        card.classList.add('visible');
      }
    } else {
      if (card.classList.contains('visible')) {
        card.classList.remove('visible');
      }
    }
  });
}

// Menambahkan event listener untuk scroll
window.addEventListener('scroll', handleScroll);

// Trigger fungsi saat pertama kali halaman dimuat
handleScroll();
// Today req
///const { totalRequests, todayRequests } = readLogs();
let upto2 = 0;
let target2 = todayReq;
let intervalId = setInterval(() => updated2("todayReq", target2), 3);

function updated2(idnya2, target2) {
  let countElement = document.getElementById(idnya2);
  countElement.innerHTML = ++upto2;
  if (upto2 === target2) {
    clearInterval(intervalId);
  }
}

feather.replace();
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const cards = document.querySelectorAll(".card");
hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      sidebar.classList.toggle("active");
});
