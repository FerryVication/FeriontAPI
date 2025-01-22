const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Family100
router.get('/family100', (req, res) => {
  const filePath = path.join(__dirname, '../games/family100.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Tebakaku
router.get('/siapakahaku', (req, res) => {
  const filePath = path.join(__dirname, '../games/siapakahaku.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Caklontong
router.get('/caklontong', (req, res) => {
  const filePath = path.join(__dirname, '../games/caklontong.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Tebak Gambar
router.get('/tebakgambar', (req, res) => {
  const filePath = path.join(__dirname, '../games/tebakgambar.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Asah  Otak
router.get('/asahotak', (req, res) => {
  const filePath = path.join(__dirname, '../games/asahotak.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Tebak Bendera
router.get('/tebakbendera', (req, res) => {
  const filePath = path.join(__dirname, '../games/tebakbendera2.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

// Susun Kata
router.get('/susunkata', (req, res) => {
  const filePath = path.join(__dirname, '../games/susunkata.json');
  fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
      return res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Internal Server Error"
      });
    }
    try {
      const data = JSON.parse(rawData);
      res.json( data );
    } catch (parseError) {
      res.status(500).json({
        response: 500,
        author: "Feri",
        message: "Invalid JSON format"
      });
    }
  });
});

module.exports = router;