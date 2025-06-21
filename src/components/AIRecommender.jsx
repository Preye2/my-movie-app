// src/components/AIRecommender.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: #0077ff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Output = styled.pre`
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 1rem;
  white-space: pre-wrap;
  border-radius: 8px;
`;

const moods = ["Happy", "Sad", "Romantic", "Adventurous", "Bored", "Scared", "Inspired", "Angry"];

const AIRecommender = () => {
  const [form, setForm] = useState({
    mood: "",
    genre: "",
    language: "",
    decade: "",
    platform: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/api/gpt/recommend", {
        mood: form.mood,
        preferences: {
          genre: form.genre,
          language: form.language,
          decade: form.decade,
          platform: form.platform,
        },
      });

      setResult(res.data.recommendations);
    } catch (err) {
      setResult("⚠️ Error: Could not fetch recommendations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <h2>🎬 Get AI Movie Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <Select name="mood" onChange={handleChange} required>
          <option value="">Select Mood</option>
          {moods.map(m => <option key={m} value={m}>{m}</option>)}
        </Select>
        <Select name="genre" onChange={handleChange}>
          <option value="">Select Genre</option>
          <option>Action</option><option>Drama</option><option>Comedy</option>
        </Select>
        <Select name="language" onChange={handleChange}>
          <option value="">Select Language</option>
          <option>English</option><option>French</option><option>Hindi</option>
        </Select>
        <Select name="decade" onChange={handleChange}>
          <option value="">Select Decade</option>
          <option>1980s</option><option>1990s</option><option>2000s</option><option>2010s</option><option>2020s</option>
        </Select>
        <Select name="platform" onChange={handleChange}>
          <option value="">Select Platform</option>
          <option>Netflix</option><option>Amazon Prime</option><option>Disney+</option><option>HBO</option>
        </Select>
        <Button type="submit">{loading ? "Thinking..." : "Get Recommendations"}</Button>
      </form>
      {result && <Output>{result}</Output>}
    </FormWrapper>
  );
};

export default AIRecommender;
