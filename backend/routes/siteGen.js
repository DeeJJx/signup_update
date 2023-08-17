const express = require('express');

const router = express.Router();

//controller functions
const { createNextApp } = require('../controllers/siteGenController');

//signup route
router.post('/next-gen', (req, res) => {
    const { appName } = req.body;
  
    if (!appName) {
      return res.status(400).json({ error: 'Please provide a name for your React app.' });
    }
  
    const result = createNextApp(appName);
    res.json(result);
  });

module.exports = router;