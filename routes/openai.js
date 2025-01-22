const express = require('express');
const router = express.Router();
const gemini = require('btch-gemini');

router.get('/gemini', async (req, res) => {
  const text = req.query.text;
  if (!text) {
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Masukkan Parameter Text!"
    });
  }

  try {
    const data = await gemini.gemini_chat(text);
    // Kirim response
    res.json({
      response: 200,
      success: true,
      author: "Feri",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      response: 500,
      author: "Feri",
      message: "Internal Server Error!"
    });
  }
});

module.exports = router;