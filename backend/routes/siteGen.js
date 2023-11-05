const express = require('express');

const router = express.Router();

//controller functions
const { createNextApp } = require('../controllers/siteGenController');

//signup route
router.post('/next-gen', (req, res) => {
    const { appName, uniqueId } = req.body;
  
    if (!appName || !uniqueId) {
      return res.status(400).json({ error: 'Please provide a name for your Next app.' });
    }
  
    const result = createNextApp(appName, uniqueId);
    res.json(result);
  });

module.exports = router;