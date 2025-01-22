const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Geo Proxy
async function fetchProxies() {
  try {
    const proxyPath = path.join(__dirname, '../data/proxy.txt');
    // Ganti dengan URL API yang sesuai
    const response = await axios.get('https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=lastChecked&sort_type=desc');
    const data = response.data;

    const proxies = data.data.map(item => `${item.ip}:${item.port}`).join('\n');

    // Simpan ke file proxy.txt
    fs.writeFileSync(proxyPath, proxies, 'utf8');
    //fs.writeFileSync('proxy.txt', proxies);

    console.log('Data berhasil disimpan di proxy.txt');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Fungsi untuk mengambil proxy dan menulis ke file
async function fetchAndWriteProxy() {
  try {
    const proxyPath = path.join(__dirname, '../data/proxy.txt');
    
    // Request ke API Proxy
    const reqProxy = await axios.get(
      'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=100000&country=sg&ssl=all&anonymity=all'
    );
    const data = reqProxy.data; // Data hasil request

    // Menulis data ke file
    fs.writeFileSync(proxyPath, data, 'utf8');
    console.log('Proxy berhasil diperbarui pada', new Date().toLocaleString());
  } catch (err) {
    console.error('Gagal memperbarui proxy:', err.message);
  }
}

// Menjadwalkan cron job untuk berjalan setiap 60 menit
function scheduleProxyUpdater() {
  cron.schedule('*/59 * * * *', () => {
    console.log('Menjalankan fetchAndWriteProxy...');
    fetchProxies();
  });
}

// Ekspor fungsi
module.exports = { scheduleProxyUpdater };
