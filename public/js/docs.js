feather.replace();

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('user-ip').textContent = data.ip;
  })
  .catch(() => {
    document.getElementById('user-ip').textContent = 'Unable to fetch IP';
  });

navigator.getBattery().then(battery => {
  const batteryLevel = battery.level * 100; // Mengubah level (0.0 - 1.0) menjadi persentase
  document.getElementById('battery-status').textContent = `${batteryLevel}%`;
});

function toggleDropdown(id) {
  const content = document.getElementById(`dropdown-content-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);
  const isVisible = content.style.display === "block";
  content.style.display = isVisible ? "none" : "block";
  arrow.classList.toggle("open", !isVisible);
}

function dash() {
  window.location.href = '/dash';
}

function docs() {
  window.location.href = '/docs';
}

async function tryIt(endpointBase, inputId, responseId) {
  const inputValue = document.getElementById(inputId).value;
  const endpoint = `${endpointBase}${encodeURIComponent(inputValue)}`;
  const responseContainer = document.getElementById(responseId);
  const imageContainer = document.getElementById(`image-response-${inputId.split('-')[1]}`);
  const imageElement = document.getElementById(`response-image-${inputId.split('-')[1]}`);
  responseContainer.textContent = "Loading...";

  const url = `https://api.febrita.biz.id${endpoint}`;
  console.log(`Fetching URL: ${url}`);

  try {
    const response = await fetch(url);

    // Jika respons berupa gambar (Content-Type image)
    if (response.ok && response.headers.get('Content-Type').startsWith('image')) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      imageElement.src = imageUrl;

      // Tampilkan gambar
      if (imageContainer) {
        imageContainer.style.display = "block";
      }
      responseContainer.textContent = ""; // Kosongkan teks respons
    } else {
      // Anggap respons berupa JSON
      const data = await response.json();
      responseContainer.textContent = JSON.stringify(data, null, 4);

      // Sembunyikan gambar jika respons bukan gambar
      if (imageContainer) {
        imageContainer.style.display = "none";
      }
    }
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    responseContainer.textContent = `Error: ${error.message}`;

    // Sembunyikan gambar jika terjadi error
    if (imageContainer) {
      imageContainer.style.display = "none";
    }
  }
}

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const cards = document.querySelectorAll(".card");
hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      sidebar.classList.toggle("active");
});
