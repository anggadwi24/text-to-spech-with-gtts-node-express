const gtts = require('gtts');
const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);


const convertTextToSpeech = async (req, res) => {
  const {
    text,
    lang
  } = req.body;

  if (!text) {
    return res.status(400).json({
      error: 'Text is required'
    });
  }

  // Inisialisasi gtts
  const speech = new gtts(text, lang || 'en');
  // Nama file audio
  const fileName = `speech_${Date.now()}.mp3`;
  // Path file audio
  const audioFolder = `audio`;
  // Path lengkap file audio
  const filePath = path.join(__dirname, '..', audioFolder, fileName);


  try {
    // Pastikan folder audio ada
    await mkdirAsync(path.join(__dirname, '..', audioFolder), {
      recursive: true
    });

    // Mengubah speech.save menjadi Promise-based
    await new Promise((resolve, reject) => {
      speech.save(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Asumsikan server Anda berjalan di http://localhost:3000
    const baseUrl = 'http://localhost:3000';
    const audioUrl = `${baseUrl}/${audioFolder}/${fileName}`;

    res.status(200).json({
      message: 'Audio file created successfully',
      audioUrl: audioUrl
    });

  } catch (error) {
    
    res.status(500).json({
      error: 'Failed to convert text to speech'
    });
  }
};

module.exports = {
  convertTextToSpeech,
};