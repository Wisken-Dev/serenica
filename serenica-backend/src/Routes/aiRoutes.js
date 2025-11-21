// src/Routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /api/ai/analyze
router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    // Send text to OpenAI
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a compassionate mental health assistant that analyzes emotional tone from text.",
          },
          {
            role: "user",
            content: `Analyze this journal entry for signs of anxiety, depression, stress, or positivity. Respond briefly with the user's emotional state and one supportive suggestion:\n\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ analysis: aiResponse });
  } catch (error) {
    console.error("AI Analysis Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI analysis failed" });
  }
});

module.exports = router;
