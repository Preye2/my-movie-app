// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import gptRoutes from './routes/gptRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import tmdbRoutes from './routes/tmdbRoutes.js';
import connectDB from './config/db.js';


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/tmdb', tmdbRoutes);
app.use('/api/gpt', gptRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/api/auth/login', (req, res, next) => {
  console.log('⚠️ Reached raw POST /api/auth/login route');
  next(); // pass control to actual controller
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
