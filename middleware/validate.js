const db = require('../config/database');

const validateSites = (req, res, next) => {
    const siteName = req.query.sites;

    if (!siteName) {
        return res.status(400).json({
            success: false,
            author: 'Feri',
            status_code: 400,
            message: "Parameter 'sites' tidak ditemukan!"
        });
    }

    const query = 'SELECT * FROM tb_user WHERE site_name = ?';
    db.query(query, [siteName], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                author: 'Feri',
                status_code: 500,
                message: 'Error Sites Tidak di Temukan',
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                author: 'Feri',
                response: 404,
                message: `sites '${siteName}' tidak ditemukan.`,
                errors: null
            });
        }

        req.site = results[0];
        next();
    });
};

module.exports = validateSites;