const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "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"; // এখানে আপনার OpenAI API Key বসান

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error connecting to OpenAI API");
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
