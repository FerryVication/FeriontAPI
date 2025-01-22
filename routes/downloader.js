const express = require('express');
const { ttdl, igdl, fbdown, twitter, youtube }= require('nothing-dls');
const router = express.Router();
const { xnxxProxy, xnxxdownloader } = require('../lib/function');

// Tools XNXX DOWNLOADER
router.get('/xnxx', (req, res) => {
  const link = req.query.link;
  if (!link) {
    return res.status(400).json({
      success: false,
      status: 400,
      author: "Feri",
      message: "Masukkan Parameter Link!"
    });
  }
  xnxxdownloader(req, res, params);
//   xnxxProxy(req, res, link);
});
// downloader tiktok
router.get('/tiktok', (req, res) => {
  const url = req.query.url;
  // jika parameter kosong
  if (!url ) {
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Masukkan Parameter URL!"
    });
  }
  
  ( async () => {
    try {
      const data = await ttdl(url);
      // Kirim response
      await res.json({
        response: 200,
        success: true,
        author: "Feri",
        data: data
      });
    } catch (err) {
      res.status(400).json({
        response: 400,
        author: "Feri",
        message: "Error Konten Tidak di Temukan!"
      });
    }
    })();
});

// downloader instagram
router.get('/instagram', (req, res) => {
  const url = req.query.url;
  // jika parameter kosong
  if (!url ) {
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Masukkan Parameter URL!"
    });
  }
    ( async () => {
    try {
      const data = await igdl(url);
      // Kirim response
      await res.json({
        response: 200,
        success: true,
        author: "Feri",
        data: data
      });
    } catch (err) {
      res.status(400).json({
        response: 400,
        author: "Feri",
        message: "Error Konten Tidak di Temukan!"
      });
    }
    })();
});

// downloader twitter
router.get('/twitter', (req, res) => {
  const url = req.query.url;
  // jika parameter kosong
  if (!url ) {
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Masukkan Parameter URL!"
    });
  }
    ( async () => {
    try {
      const data = await twitter(url);
      // Kirim response
      await res.json({
        response: 200,
        success: true,
        author: "Feri",
        data: data
      });
    } catch (err) {
      res.status(400).json({
        response: 400,
        author: "Feri",
        message: "Error Konten Tidak di Temukan!"
      });
    }
    })();
});

// downloader poop dan dood
router.get('/poop', (req, res) => {
  const url = req.query.url;

  // Jika parameter URL kosong
  if (!url) {
    return res.status(400).json({
      response: 400,
      author: 'Feri',
      message: 'Masukkan Parameter URL!',
    });
  }

  // Memanggil API eksternal langsung di dalam route handler
  (async () => {
    try {
      const response = await fetch('https://poopdl-api.dapuntaratya.com/generate_file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      });
      // Data Murni
      const dataMurni = await response.json();
      const { domain, id } = dataMurni.file[0];
      // Next Generate Link download
      const response2 = await fetch('https://poopdl-api.dapuntaratya.com/generate_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          domain: domain,
          id: id
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response2.json();
      // Kirim response jika sukses
      return res.json({
        response: 200,
        success: true,
        author: 'Feri',
        data: data,
      });
    } catch (err) {
      // Menangani error jika API gagal
      return res.status(400).json({
        response: 400,
        author: 'Feri',
        message: 'Error: Konten Tidak Ditemukan!',
      });
    }
  })();
});
// downloader Youtuhe
router.get('/youtube', (req, res) => {
  const url = req.query.url;
  // jika parameter kosong
  if (!url ) {
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Masukkan Parameter URL!"
    });
  }
    ( async () => {
    try {
      const data = await youtube(url);
      // Kirim response
      await res.json({
        response: 200,
        success: true,
        author: "Feri",
        data: data
      });
    } catch (err) {
      res.status(400).json({
        response: 400,
        author: "Feri",
        message: "Error Konten Tidak di Temukan!"
      });
    }
    })();
});

module.exports = router;
