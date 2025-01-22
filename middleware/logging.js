const express = require('express');
const fs = require('fs');
const path = require('path');

const log = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const responseTime = `${endTime - startTime}ms`;

        // Dapatkan IP address dari request
        const clientIp = req.ip || req.connection.remoteAddress;

        // Log sederhana dalam satu baris di console
        console.log(
            `Request ke ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Response Time: ${responseTime} | IP: ${clientIp}`
        );

        // Log ke file dalam format JSON
        const log = {
            method: req.method,
            ip: clientIp,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: responseTime,
            timestamp: new Date().toISOString(),
        };

        fs.appendFile(
            path.join(__dirname, '../logs', 'request.log'),
            JSON.stringify(log) + '\n',
            (err) => {
                if (err) console.error('Failed to write log:', err);
            }
        );
    });
    next();
};

module.exports = log;