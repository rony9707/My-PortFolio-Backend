const { Router } = require('express');
const router = Router();
const songSchema = require('../models/songs');

router.get('/getSongs', async (req, res) => {
  try {
    // Fetch all data from the songSchema, including only songName and songLink fields
    const songs = await songSchema.find({}, { _id: 0, songName: 1, songLink: 1 });
    
    // Send the retrieved data as the response
    res.status(200).json(songs);
  } catch (err) {
    // Handle any errors that occur during the query
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
