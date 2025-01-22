// const db = require('../config/database'
let Gempa = require('zeev-gempa');
let xnxx = require('xnxx-scraper');
let axios = require('axios');
let fs = require('fs');
const path = require('path');
const proxyList = path.join(__dirname, '../data/proxy.txt');
// xnxx downloader with proxy
async function xnxxProxy(req, res, link) {
  try {
    // Baca daftar proxy dari file proxy.txt
    const proxies = fs.readFileSync(proxyList, 'utf8')
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
// Xnxx Downloader
async function xnxxsearch(req, res, params) {
  try {
    if (!params) {
      return res.status(400).json({
        success: false,
        status: 400,
        author: "Feri",
        message: "Parameter query harus disertakan!"
      });
    }
    const response = await axios.get(`http://server.ferdev.my.id:6789/xnxx/search?query=${params}`);
    const data = await response.data;
    //console.log(data);
    return res.status(200).json({
        message: data
      });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      author: "Feri",
      message: "Internal Server Error!",
    });
  }
}
// Xnxx down
async function xnxxdownloader(req, res, params) {
  try {
    if (!params) {
      return res.status(400).json({
        success: false,
        status: 400,
        author: "Feri",
        message: "Parameter link harus disertakan!"
      });
    }
    const response = await axios.get(`http://server.ferdev.my.id:6789/xnxx/down/v2?link=${params}`);
    const data = await response.data;
    return res.status(200).json({
        success: true,
        status: 200,
        author: "Feri",
        message: data
      });
  } catch (error) {
    console.log('Error:', error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      author: "Feri",
      message: "Internal Server Error!",
    });
  }
}

async function gempa(req, res) {
  try {
    const result = await Gempa.gempa();
    const { title, waktu, lintang, bujur, magnitudo, kedalaman, wilayah, map } = result;
    const parse = { title, waktu, lintang, bujur, magnitudo, kedalaman, wilayah, map };

    return res.status(200).json({
      success: true,
      status: 200,
      author: "Feri",
      data: parse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      author: "Feri",
      message: "Internal Server Error!",
    });
  }
}

module.exports = { gempa, xnxxsearch, xnxxdownloader, xnxxProxy };


// Gempa
// async function validateApiKey(apikey, res) {
//     if (!apikey) {
//         // Jika apikey tidak ada di parameter request
//         return res.status(400).json({
//             success: false,
//             status: 400,
//             author: 'Feri',
//             message: 'Masukkan Parameter apikey!',
//         });
//     }
// 
//     try {
//         // Mengecek apakah apikey ada di database
//         const [rows] = await db.execute('SELECT * FROM tb_apikey WHERE apikey = ?', [apikey]);
//         
//         if (rows.length === 0) {
//             // Jika tidak ada data apikey
//             return res.status(401).json({
//                 success: false,
//                 status: 401,
//                 author: 'Feri',
//                 message: 'Invalid Apikey!',
//             });
//         }
// 
//         const apiKeyData = rows[0];
// 
//         // Mengecek apakah limit apikey sudah habis
//         if (apiKeyData.limit <= 0) {
//             return res.status(403).json({
//                 success: false,
//                 status: 403,
//                 author: 'Feri',
//                 message: 'Limit Apikey Telah Mencapai Batas!',
//             });
//         }
// 
//         // Jika apikey valid dan limit masih ada
//         return true;
// 
//     } catch (error) {
//         // Jika ada kesalahan pada proses pengecekan database
//         console.error('Error validating API key:', error);
//         return res.status(500).json({
//             success: false,
//             status: 500,
//             author: 'Feri',
//             message: 'Internal server error',
//         });
//     }
// }
// 
// module.exports = { validateApiKey };
