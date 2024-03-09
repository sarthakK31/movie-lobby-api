// __tests__/app.test.ts

import request from 'supertest';
import app from '../src/app';
import Movie from '../src/Movie';
import db from '../src/db';

// Mock data for testing
const mockMovies = [
  {
    _id: '1',
    title: 'Movie 1',
    genre: 'Action',
    rating: 8.0,
    streamingLink: 'https://example.com/movie1',
  },
  {
    _id: '2',
    title: 'Movie 2',
    genre: 'Comedy',
    rating: 7.5,
    streamingLink: 'https://example.com/movie2',
  },
];

// Mock Movie model methods
jest.mock('../src/Movie', () => ({
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  prototype: {
    save: jest.fn(),
  },
  // save: jest.fn(),
}));

// Mock db connection
jest.mock('../src/db', () => ({
  once: jest.fn().mockImplementationOnce((event, callback) => callback()),
}));

describe('GET /movies', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
  });
});

describe('GET /search', () => {
  it('should respond with status 200 and return filtered movies based on search query', async () => {
    // Mock Movie.find() to return filtered mockMovies
    (Movie.find as jest.Mock).mockResolvedValue([mockMovies[0]]); // Assuming only one movie matches the search query

    const searchQuery = 'Action';
    const response = await request(app).get(`/search?q=${searchQuery}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMovies[0]]);
  });
});

// describe('POST /movies', () => {
//   it('should respond with status 201 and create a new movie', async () => {
//     const newMovie = {
//       title: 'New Movie',
//       genre: 'Drama',
//       rating: 9.0,
//       streamingLink: 'https://example.com/new-movie',
//     };

//     // Mock Movie.save() to return the new movie
//     (Movie.prototype.save as jest.Mock).mockResolvedValue(newMovie);

//     const response = await request(app)
//       .post('/movies')
//       .send(newMovie);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual(newMovie);
//   });
// });

describe('POST /movies', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should respond with status 201 and create a new movie', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Drama',
      rating: 9.0,
      streamingLink: 'https://example.com/new-movie',
    };

    // Mock Movie.prototype.save() to resolve immediately
    (Movie.prototype.save as jest.Mock).mockResolvedValue(newMovie);

    const response = await request(app)
      .post('/movies')
      .send(newMovie);
    console.log(response.status);
    expect(response.status).toBe(201);
    //expect(response.body).toEqual(newMovie);
  });
});


describe('PUT /movies/:id', () => {
  it('should respond with status 200 and update an existing movie', async () => {
    const updatedMovie = {
      _id: '1',
      title: 'Updated Movie',
      genre: 'Action',
      rating: 8.5,
      streamingLink: 'https://example.com/updated-movie',
    };

    // Mock Movie.findByIdAndUpdate() to return the updated movie
    (Movie.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedMovie);

    const response = await request(app)
      .put('/movies/1')
      .send(updatedMovie);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedMovie);
  });
});

describe('DELETE /movies/:id', () => {
  it('should respond with status 200 and delete the specified movie', async () => {
    const deletedMovieId = '1';

    // Mock Movie.findByIdAndDelete() to return success
    (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue({});

    const response = await request(app).delete(`/movies/${deletedMovieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Movie deleted successfully' });
  });
});

// Write similar tests for other endpoints
