const fs = require('fs');
const path = require('path');

const blockIP = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;

    // Baca daftar IP dari file JSON
    const blockedIPsPath = path.join(__dirname, '../data/blockedIPs.json');
    const blockedIPs = JSON.parse(fs.readFileSync(blockedIPsPath, 'utf-8'));

    // Periksa apakah IP ada di dalam daftar blacklist
    if (blockedIPs.includes(clientIp)) {
        console.log(`IP ${clientIp} diblokir dari mengakses API`);
        return res.status(403).render(path.join(__dirname, '../views', '403block.ejs'));
        // return res.status(403).json({
//             success: false,
//             status: 403,
//             author: 'Feri',
//             message: 'Your IP is blocked',
//         });
    }

    next(); // Lanjutkan jika IP tidak diblokir
};

module.exports = blockIP;