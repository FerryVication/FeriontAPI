feather.replace();

// Fetch user's IP
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('user-ip').textContent = data.ip;
  })
  .catch(() => {
    document.getElementById('user-ip').textContent = 'Unable to fetch IP';
  });

// Fetch battery status
navigator.getBattery().then(battery => {
  const batteryLevel = battery.level * 100;
  document.getElementById('battery-status').textContent = `${batteryLevel}%`;
});


// redirect github

function git() {
	window.location.href = 'https://github.com/FerryVication', '_blank';
}

// Redirect Instagram

function igeh() {
	window.location.href = 'https://www.instagram.com/ferdev.me?igsh=MXNrcTZvNzk4dXU4dA==', '_blank';
}

// Redirect Facebook

function efbe() {
	window.location.href = 'https://www.facebook.com/smart.danie.3', '_blank';
}

// Redirect Mail
function mail() {
	window.location.href = 'mailto:support@ferry.web.id';
}
