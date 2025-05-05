const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/horoscope', async (req, res) => {
  const { sign, day } = req.query;
  
  try {
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'API request failed' });
  }
});

// Gemini ile çeviri endpoint'i
app.post('/api/translate', async (req, res) => {
  const { text } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBzDlAWMY6JLDlP2ogln3qqaGZ0i7Ozq7w';
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Translate the following English text to Turkish. Provide only the Turkish translation, nothing else:

${text}`
          }]
        }]
      })
    });
    
    const data = await response.json();
    
    // Check for error in response
    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }
    
    // Extract translated text
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const translatedText = data.candidates[0].content.parts[0].text.trim();
      res.json({ translatedText });
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ 
      error: 'Translation failed', 
      details: error.message 
    });
  }
});

module.exports.handler = serverless(app);
