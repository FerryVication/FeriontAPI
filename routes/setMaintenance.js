const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Endpoint untuk mengatur status maintenance
router.post('/set-maintenance', async (req, res) => {
    const { status } = req.body;

    // Validasi input
    if (typeof status !== 'boolean') {
        return res.status(400).json({
            success: false,
            status: 400,
            author: 'Feri',
            message: 'Status harus berupa boolean (true/false).',
        });
    }

    // Path file status
    const statusFilePath = path.join(__dirname, '../data/maintenance.status');

    try {
        // Update file maintenance.status
        await fs.promises.writeFile(statusFilePath, `maintenance = ${status}`);

        return res.status(200).json({
            success: true,
            status: 200,
            author: 'Feri',
            message: `Maintenance status berhasil diatur ke ${status}.`,
        });
    } catch (error) {
        console.error('Error writing maintenance status:', error);
        return res.status(500).json({
            success: false,
            status: 500,
            author: 'Feri',
            message: 'Gagal mengupdate status maintenance.',
        });
    }
});

module.exports = router;