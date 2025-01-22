const os = require('os');

// Fungsi untuk mendapatkan informasi sistem
function getSystemInfo() {
  const platform = os.platform(); // Platform (e.g., 'linux', 'win32', 'darwin')

  // Periksa apakah os.cpus() mengembalikan data
  const cpuInfo = os.cpus();
  const cpu = cpuInfo.length > 0 ? cpuInfo[0].model : 'CPU information not available';

  const uptimeSeconds = os.uptime(); // Uptime dalam detik

  // Format uptime menjadi jam dan menit
  const uptimeHours = Math.floor(uptimeSeconds / 3600);
  const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
  const formattedUptime = `${uptimeHours} hours, ${uptimeMinutes} minutes`;

  return {
    platform,
    cpu,
    uptime: formattedUptime,
  };
}

// Cetak hasil fungsi
//console.log(getSystemInfo());
module.exports = { getSystemInfo };
