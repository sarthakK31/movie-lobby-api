import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Movie, { IMovie } from './Movie';
import db from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// List all movies
app.get('/movies', async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      res.status(500).json({ message: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// Search for a movie by title or genre
app.get('/search', async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const movies = await Movie.find({
      $or: [{ title: { $regex: q, $options: 'i' } }, { genre: { $regex: q, $options: 'i' } }],
    });
    res.json(movies);
  } catch (err) {
    if (err instanceof Error) {

      res.status(500).json({ message: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// Add a new movie
app.post('/movies', async (req: Request, res: Response) => {
  const movie: IMovie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    if (err instanceof Error) {

      res.status(400).json({ message: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// Update a movie
app.put('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// Delete a movie
app.delete('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // For testing purposes
