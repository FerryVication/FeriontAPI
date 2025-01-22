const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/make', async (req, res) => {
    const query = req.query.q || 'VerBotX'; // Ambil query parameter atau gunakan default
    const imageUrl = `https://tiodevhost.eu.org/?q=${encodeURIComponent(query)}`;

    try {
        // Request gambar dari URL eksternal
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Kirim gambar ke klien dengan MIME type yang sesuai
        res.set('Content-Type', 'image/jpeg'); // Sesuaikan MIME type jika diperlukan
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).json({
            success: false,
            author: 'Feri',
            message: 'Gagal mendapatkan gambar dari URL eksternal.',
        });
    }
});

module.exports = router;