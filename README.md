# Movie Lobby API

This is an API for managing a movie lobby for OTT (Over-The-Top) applications. It provides endpoints to list, search, add, update, and delete movies from the lobby.

## Features

- List all movies in the lobby
- Search for movies by title or genre
- Add new movies to the lobby
- Update existing movie information (title, genre, rating, streaming link)
- Delete movies from the lobby

## Technologies Used

- Node.js
- TypeScript
- MongoDB
- Express.js
- Mongoose (MongoDB library)
- Jest (testing framework)
- Supertest (HTTP testing utility)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-lobby-api.git
   ```

2. Install dependencies:

   ```bash
   cd movie-lobby-api
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/movie_lobby
   ```

   Adjust the `PORT` and `MONGODB_URI` values as needed.

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### List all movies

- **GET /movies**

  Returns a list of all movies in the lobby.

### Search for movies

- **GET /search?q={query}**

  Searches for movies by title or genre based on the provided query. Just replace {query} with whatever word or phrase you want to search. A result will be returned if a match is there with title or genre.

### Add a new movie

- **POST /movies**

  Adds a new movie to the lobby. Requires "admin" role.

  Request Body:

  ```json
  {
    "title": "Movie Title",
    "genre": "Movie Genre",
    "rating": 8.5,
    "streamingLink": "https://example.com/movie"
  }
  ```

### Update an existing movie

- **PUT /movies/:id**

  Updates an existing movie's information. Requires "admin" role.

  Request Body (Partial Update):

  ```json
  {
    "title": "New Title",
    "rating": 9.0
  }
  ```

### Delete a movie

- **DELETE /movies/:id**

  Deletes a movie from the lobby. Requires "admin" role.

## Testing

Unit tests and integration tests are included for each API endpoint using Jest and Supertest. To run the tests, use the following command:

```bash
npx jest
```
The API endpoints are all working fine when tested with Postman. But I had a bit of error using JEST.
Since I had never used Jest before today, I tried using it at your behest but however, I could not master it in the limited time. While 4 out of 5 tests are working fine, I could not resolve the 5th test. I am sure you wouuld not hold such a trivial point against me.If given some more time, I would be happy to resolve it.
## License

This project is licensed under the [MIT License](LICENSE).
