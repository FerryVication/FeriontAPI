const express = require('express');
const router = express.Router();
const db = require('../config/database');
const validateSites = require('../middleware/validate');

// Endpoint untuk membuat tb_user baru
router.get('/create', (req, res) => {
    const siteName = req.query.sites;

    if (!siteName) {
        return res.status(400).json({
            success: false,
            author: 'Feri',
            response: 400,
            message: "mohon isi value sites nya !",
        });
    }

    const checkQuery = 'SELECT * FROM tb_user WHERE site_name = ?';
    db.query(checkQuery, [siteName], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                author: 'Feri',
                response: 500,
                message: 'Internal Server Error'
            });
        }
	console.log(err);

        if (results.length > 0) {
            return res.status(409).json({
                success: false,
                author: 'Feri',
                status_code: 409,
                message: `Error Sites Sudah ada, Gunakan Sites Lain!`
            });
        }

        const insertQuery = 'INSERT INTO tb_user (site_name, hits) VALUES (?, 0)';
        db.query(insertQuery, [siteName], (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    author: 'Feri',
                    response: 500,
                    message: 'Internal Server Error'
                });
            }
		console.log(err);
            res.json({
                success: true,
                author: 'Feri',
                response: 200,
                data: {
                    site_name: siteName,
                    hit: 0,
                    created_at: new Date().toISOString()
                }
            });
        });
    });
});

// Endpoint untuk melihat data tb_user
router.get('/view', validateSites, (req, res) => {
    const siteData = req.site;
    res.json({
        success: true,
        author: 'Feri',
        status_code: 200,
        data: {
            site_name: siteData.site_name,
            hits: siteData.hits,
            created_at: siteData.created_at
        }
    });
});

// Endpoint untuk menambah hits tb_user
router.get('/hit', validateSites, (req, res) => {
    const siteData = req.site;

    const updateQuery = 'UPDATE tb_user SET hits = hits + 1 WHERE site_name = ?';
    db.query(updateQuery, [siteData.site_name], (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                author: 'Feri',
                status_code: 500,
                message: 'Internal Server Error'
            });
        }

        res.json({
            success: true,
            author: 'Feri',
            response: 200,
            message: `Berhasil Menambahkan hit`,
            data: {
                site_name: siteData.site_name,
                hit: siteData.hits + 1
            }
        });
    });
});

module.exports = router;
