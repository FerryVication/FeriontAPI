const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
//const rateLimit = require("express-rate-limit");
const path = require('path');
const countApi = require('./routes/count');
const { readLogs } = require('./lib/logUtils.js');
const { checkMaintenance } = require('./middleware/checkMaintenance');
const { scheduleProxyUpdater } = require('./config/scheduleProxy');
const { getSystemInfo } = require('./lib/os');
const downloader = require('./routes/downloader');
const games = require('./routes/games');
const brat = require('./routes/brat');
const blockedIP = require('./middleware/blockedIP');
const logging = require('./middleware/logging');
const remote = require('./lib/remote');
const openai = require('./routes/openai');
const tools = require('./routes/tools');
const remoteMainten = require('./routes/setMaintenance');
// Agar semua request masuk
app.use(cors());
// Folder nya bisa di akses
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// Trust Proxy Agar Request dari Client di catat IP nya
app.set('trust proxy', true);
// Limit Requests
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, 
//   max: 2000, 
//   message: 'Oopss too many requests'
// });
// app.use(limiter);
// Set view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Agar response json nya rapij boy
app.set('json spaces', 2);
// Untuk Me remote status maintenance
app.use('/remote', remoteMainten);
// Middleware maintenance
app.use(checkMaintenance);
// Logging
app.use(logging);
// Cek apakah IP Client terblokir atau tidak
app.use(blockedIP);
// Brat Brrt Brot
app.use('/brat', brat);
// Router  Games
app.use('/games', games);
// Gunakan rute users
app.use('/count', countApi);
// Router downloadee
app.use('/downloader', downloader);
// Router Block Unblock IP Client
app.use('/remote', remote);
// Router untuk Fitur Gemini AI
app.use('/ai', openai);
// Router untuk tools
app.use('/tools', tools);
// Route Untuk Root
app.get('/', async (req, res) => {
    try {
        const { totalRequests, todayRequests } = await readLogs();
        res.render('index', { totalRequests, todayRequests });
    } catch (error) {
        console.error('Error reading logs:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Router Untuk Dashboard
app.get('/dash', async (req, res) => {
    try {
        const { totalRequests, todayRequests } = await readLogs();
        const systemInfo = await getSystemInfo();

        // Kirim seluruh `systemInfo` ke template
        res.render('dash', {
            platform: systemInfo.platform, // Platform dikirim secara eksplisit
            cpu: systemInfo.cpu,
            uptime: systemInfo.uptime,
            todayRequests,
            totalRequests,
        });
    } catch (error) {
        console.error('Error reading systemInfo:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route untuk Dokumentasi
app.get('/docs', async (req, res) => {
    try {
        const { totalRequests, todayRequests } = await readLogs();
        res.render('docs', { totalRequests, todayRequests });
    } catch (error) {
        console.error('Error reading logs:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route untuk Streaming Pekob
app.get('/stream', async (req, res) => {
    try {
        const { totalRequests, todayRequests } = await readLogs();
        res.render('stream', { totalRequests, todayRequests });
    } catch (error) {
        console.error('Error reading logs:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Redirect 404 Not Found
app.use((req, res) => {
  res.status(404).render(path.join(__dirname, 'views', '404.ejs'));
});
//console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);
// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://api.febrita.biz.id:${PORT}`);
    //scheduleProxyUpdater();
});
