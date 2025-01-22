const express = require('express');
const router = express.Router();
const {gempa, xnxxsearch, xnxxdownloader} = require('../lib/function');
const { verifyApiKey } = require('../middleware/validateApikey');
// Tools Gempa
router.get('/gempa', gempa);
// Tools XNXX SEARCH
router.get('/xnxxsearch', (req, res) => {
  const params = req.query.text;
  if (!params) {
    return res.status(400).json({
      success: false,
      status: 400,
      author: "Feri",
      message: "Masukkan Parameter Text!"
    });
  }
  xnxxsearch(req, res, params);
});

router.get('/api', verifyApiKey, (req, res) => {
  // Setelah verifikasi, kita bisa melanjutkan ke route handler
  res.status(200).json({ message: 'API Key valid, request diterima' });
});

module.exports = router;