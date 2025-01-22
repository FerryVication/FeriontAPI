const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca log dan menghitung request
const readLogs = async () => {
    const logFilePath = path.join(__dirname, '../logs/request.log');
    const reportFilePath = path.join(__dirname, '../data/report/request.log');

    try {
        // Baca file log
        const data = await fs.promises.readFile(logFilePath, 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== ''); // Filter baris kosong

        // Filter hanya log dengan status 200
        const successLogs = lines.filter(line => {
            try {
                const log = JSON.parse(line);
                return log.status === 200; // Hanya log dengan status 200
            } catch (error) {
                return false; // Abaikan jika parsing gagal
            }
        });

        const totalRequests = successLogs.length; // Hitung total request berhasil

        // Hitung request hari ini
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const todayRequests = successLogs.filter(line => {
            try {
                const log = JSON.parse(line);
                return log.timestamp.startsWith(today); // Cocokkan dengan tanggal hari ini
            } catch (error) {
                return false; // Abaikan jika parsing gagal
            }
        }).length;

        // Simpan hasil ke file report
        const report = {
            date: new Date().toISOString(),
            todayRequests,
            totalRequests,
        };

        await fs.promises.mkdir(path.dirname(reportFilePath), { recursive: true }); // Pastikan direktori ada
        await fs.promises.writeFile(reportFilePath, JSON.stringify(report, null, 2), 'utf8');

        return {
            totalRequests,
            todayRequests,
        };
    } catch (error) {
        console.error('Error reading logs:', error);
        return {
            totalRequests: 0,
            todayRequests: 0,
        };
    }
};

module.exports = { readLogs };