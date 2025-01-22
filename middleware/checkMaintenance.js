const fs = require('fs');
const path = require('path');

// Middleware untuk memeriksa status maintenance
const checkMaintenance = async (req, res, next) => {
    const maintenanceFile = path.join(__dirname, '../data/maintenance.status');

    try {
        // Baca file maintenance.status
        const data = await fs.promises.readFile(maintenanceFile, 'utf8');
        const maintenanceStatus = data.trim().toLowerCase().includes('maintenance = true');

        if (maintenanceStatus) {
            // Jika maintenance = true, render halaman maintenance.ejs
            return res.render('maintenance', {
                title: 'Maintenance Mode',
                message: 'Website is currently under maintenance. Please check back later!',
            });
        }

        // Jika tidak dalam mode maintenance, lanjutkan
        next();
    } catch (error) {
        console.error('Error reading maintenance file:', error.message);

        // Jika terjadi kesalahan, anggap tidak dalam mode maintenance
        next();
    }
};

module.exports = { checkMaintenance };