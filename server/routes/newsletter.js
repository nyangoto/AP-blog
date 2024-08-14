const express = require('express');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error subscribing to newsletter' });
  }
});

module.exports = router;
