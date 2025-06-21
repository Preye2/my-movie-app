// backend/controllers/favoriteController.js
import Favorite from '../models/Favorite.js';

// ✅ Add a movie to favorites
export const addFavorite = async (req, res) => {
  try {
    console.log("🛠️ addFavorite called");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { movieId, title, poster_path, release_date } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({ message: "movieId and title are required" });
    }

    const movieIdStr = movieId.toString(); // ✅ ensure it's a string

    const existing = await Favorite.findOne({ userId, movieId: movieIdStr });
    if (existing) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    const favorite = new Favorite({
      userId,
      movieId: movieIdStr,
      movieTitle: title,
      poster_path,
      release_date,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error("❌ Add favorite error:", error);
    res.status(500).json({ message: "Failed to add favorite", error: error.message });
  }
};

// ✅ Remove a movie from favorites
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId.toString(); // ✅ ensure it's a string

    const deleted = await Favorite.findOneAndDelete({ userId, movieId });
    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Favorite removed" });
  } catch (error) {
    console.error("❌ Remove favorite error:", error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

// ✅ Get all favorites for a user
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    console.error("❌ Get favorites error:", error);
    res.status(500).json({ message: "Failed to get favorites" });
  }
};
