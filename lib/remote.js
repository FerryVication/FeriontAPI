const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Perbarui Proxy Melalui Parameter
router.get('/proxy', async (req, res) => {
  try {
    const proxyPath = path.join(__dirname, '../data/proxy.txt');
    const reqProxy = await axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=100000&country=sg&ssl=all&anonymity=all');
    data = await reqProxy.data;
    fs.writeFileSync(proxyPath, data, 'utf8');
    return res.status(200).json({
      response: 200,
      author: "Feri",
      message: data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      response: 400,
      author: "Feri",
      message: "Error coy"
    });
  }
});
// Block IP
router.get('/block', (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({
            response: 400,
            author: "Feri",
            message: "Masukkan Parameter IP!"
        });
    }

    try {
        const blockedIPsPath = path.join(__dirname, '../data/blockedIPs.json');

        if (!fs.existsSync(blockedIPsPath)) {
            fs.writeFileSync(blockedIPsPath, JSON.stringify([]));
        }

        const blockedIPs = JSON.parse(fs.readFileSync(blockedIPsPath, 'utf-8'));

        if (blockedIPs.includes(ip)) {
            return res.status(200).json({
                response: 200,
                author: "Feri",
                message: `IP ${ip} sudah diblokir.`,
            });
        }

        blockedIPs.push(ip);
        fs.writeFileSync(blockedIPsPath, JSON.stringify(blockedIPs, null, 2));

        res.status(200).json({
            response: 200,
            author: "Feri",
            message: `IP ${ip} berhasil diblokir.`,
        });
    } catch (error) {
        console.error("Error blocking IP:", error);
        res.status(500).json({
            response: 500,
            author: "Feri",
            message: "Terjadi kesalahan pada server.",
        });
    }
});

// Unblock IP
router.get('/unblock', (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({
            response: 400,
            author: "Feri",
            message: "Masukkan Parameter IP!"
        });
    }

    try {
        const blockedIPsPath = path.join(__dirname, '../data/blockedIPs.json');

        if (!fs.existsSync(blockedIPsPath)) {
            return res.status(404).json({
                response: 404,
                author: "Feri",
                message: "File daftar IP blokir tidak ditemukan.",
            });
        }

        const blockedIPs = JSON.parse(fs.readFileSync(blockedIPsPath, 'utf-8'));

        if (!blockedIPs.includes(ip)) {
            return res.status(404).json({
                response: 404,
                author: "Feri",
                message: `IP ${ip} tidak ditemukan dalam daftar blokir.`,
            });
        }

        // Hapus IP dari daftar
        const updatedIPs = blockedIPs.filter(blockedIP => blockedIP !== ip);
        fs.writeFileSync(blockedIPsPath, JSON.stringify(updatedIPs, null, 2));

        res.status(200).json({
            response: 200,
            author: "Feri",
            message: `IP ${ip} berhasil dihapus dari daftar blokir.`,
        });
    } catch (error) {
        console.error("Error unblocking IP:", error);
        res.status(500).json({
            response: 500,
            author: "Feri",
            message: "Terjadi kesalahan pada server.",
        });
    }
});

module.exports = router;