const db = require('../config/database');

async function verifyApiKey(req, res, next) {
  const apiKey = req.query.apikey;
  if (!apiKey) {
     return res.status(400).json({
       success: false,
       status: 400,
       author: "Feri",
       message: "Apikey Not Found, Please Register Firts!"
     });
   }
  // Ambil API key dari header Authorization
  //const apiKey = 'apikey';//req.headers['authorization']; // Bisa juga req.header('Authorization') tergantung implementasi
  try {
    // Query untuk mencari API key di tabel apikey
    const [results] = await db.promise().query('SELECT username, `limit` FROM apikey WHERE apikey = ?', [apiKey]);

    if (results.length === 0) {
      return res.status(403).json({ message: 'API Key tidak valid' });
    }

    const user = results[0]; // Ambil data pengguna dari hasil query

    // Cek apakah limit sudah habis
    if (parseInt(user.limit) <= 0) {
      return res.status(429).json({ message: 'Limit API Key telah habis' });
    }

    // Kurangi limit pengguna sebanyak 1
    await db.promise().query('UPDATE apikey SET `limit` = `limit` - 1 WHERE apikey = ?', [apiKey]);

    req.user = user; // Menyimpan data pengguna di request
     // Lanjutkan ke route handler
     //return res.status(200).json({ message: 'API Key valid' });
     next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

module.exports = { verifyApiKey };