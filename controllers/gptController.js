import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1', // 👈 Required
});

export const recommendMovies = async (req, res) => {
  try {
    const { mood, preferences } = req.body;

    const prompt = `
      Recommend 5 movies for someone in a ${mood} mood.
      Preferences:
      - Genre: ${preferences.genre}
      - Language: ${preferences.language}
      - Decade: ${preferences.decade}
      - Platform: ${preferences.platform}
      Reply with just the movie titles and 1-sentence reasons.
    `;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // or "openai/gpt-3.5-turbo", etc.
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0]?.message?.content;
    res.status(200).json({ recommendations: reply });
  } catch (err) {
    console.error("❌ OpenRouter API error:", err);
    res.status(500).json({ error: "AI recommendation failed." });
  }
};
