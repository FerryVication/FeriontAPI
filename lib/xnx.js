const fs = require('fs');
const axios = require('axios');
const xnxx = require('xnxx-scraper');

async function runWithProxies(link) {
  try {
    // Baca daftar proxy dari file proxy.txt
    const proxies = fs.readFileSync('proxy.txt', 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line); // Hapus baris kosong

    // Validasi apakah proxy tersedia
    if (proxies.length === 0) {
      throw new Error('Daftar proxy kosong!');
    }

    for (let proxyString of proxies) {
      const [host, port] = proxyString.split(':');
      console.log(`Trying proxy: ${host}:${port}`);

      try {
        // Konfigurasi Axios dengan proxy
        const axiosInstance = axios.create({
          proxy: {
            host,
            port: parseInt(port, 10),
          },
        });

        // Gunakan proxy untuk permintaan ke xnxx-scraper
        const response = await xnxx.info(link, {
          httpAgent: axiosInstance.defaults.proxy,
        });

        console.log('Success:', response);
        return; // Berhenti jika berhasil
      } catch (error) {
        console.error(`Proxy failed: ${host}:${port}`, error.message);
      }
    }

    console.error('Semua proxy gagal digunakan.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runWithProxies('https://www.xnxx.com/video-vucad8a/big_ass_little_chubby_black_squirt_first_time_on_dildo');
