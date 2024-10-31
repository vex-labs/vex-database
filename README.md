# vex-database

This backend code connects to a MongoDB Atlas database using Node.js and Express. It provides RESTful API endpoints to manage teams and matches in a MongoDB collection, specifically designed for BetVex Esports betting application. The backend can add new teams and matches, fetch all teams, retrieve a single match by its unique identifier, and filter multiple matches by specific IDs.

\n\nThis API is accessible at [https://vexdb-production.up.railway.app/](https://vexdb-production.up.railway.app/)\n

### Table of Contents

- [Setup Instructions](#setup-instructions)
- [Dependencies](#dependencies)
- [Server Configuration](#server-configuration)
- [Schema Definitions](#schema-definitions)
- [Endpoints](#endpoints)
  - [Root Route](#root-route)
  - [Teams](#teams)
  - [Matches](#matches)

---

### Setup Instructions

1. **Install Dependencies:** Run `npm install` to install all required dependencies.
2. **Add MongoDB URI:** Replace `mongoURI` in the code with your MongoDB connection string.
3. **Run Server:** Start the server with `node <filename.js>`. The server will listen on port `3001`.

### Dependencies

The backend uses the following key dependencies:

- **Express**: Framework for creating a RESTful API.
- **Mongoose**: ODM library for MongoDB to define schemas and interact with MongoDB.
- **CORS**: Middleware to handle cross-origin requests, allowing access from the frontend.

### Server Configuration

The server is set up to allow JSON requests and configured to accept connections from `http://localhost:3000`.

### Schema Definitions

- **Team Schema**:

  - `team_name` (String): The name of the team.
  - `icon_url` (String): URL of the team's icon.

- **Match Schema**:
  - `match_id` (String): Unique identifier for each match.
  - `team_1_icon` (String): URL of the first team’s icon.
  - `team_2_icon` (String): URL of the second team’s icon.
  - `tournament_name` (String): Name of the tournament.
  - `tournament_icon` (String): URL of the tournament’s icon.
  - `match_time` (Number): UNIX timestamp indicating when the match starts.

### Endpoints

#### Root Route

- **GET /**:
  - Returns a "Hello, MongoDB!" message to confirm the server is running.

#### Teams

- **POST /teams**:

  - Adds a new team to the database.
  - **Request Body**: `{ "team_name": "Team Name", "icon_url": "URL to Icon" }`
  - **Response**: 201 Created, returns the created team object.
  - **Errors**: 400 Bad Request, if required fields are missing.

- **GET /teams**:
  - Retrieves all teams in the database.
  - **Response**: 200 OK, returns an array of team objects.
  - **Errors**: 500 Internal Server Error, if there's an issue retrieving data.

#### Matches

- **POST /matches**:

  - Adds a new match to the database.
  - **Request Body**: `{ "match_id": "UniqueID", "team_1_icon": "URL", "team_2_icon": "URL", "tournament_name": "Tournament Name", "tournament_icon": "URL", "match_time": 1685990400 }`
  - **Response**: 201 Created, returns the created match object.
  - **Errors**: 400 Bad Request, if required fields are missing.

- **GET /matches/:match_id**:

  - Retrieves a match by its `match_id`.
  - **Path Parameter**: `match_id` (String) – ID of the match to fetch.
  - **Response**: 200 OK, returns the match object.
  - **Errors**: 404 Not Found, if no match is found.

- **GET /matches**:
  - Retrieves matches based on specified `matchIDs` query parameters or all matches if no parameters are given.
  - **Query Parameter**: `matchIDs` (Comma-separated list of match IDs).
  - **Response**: 200 OK, returns an array of match objects.
  - **Errors**: 500 Internal Server Error, if there's an issue retrieving data.
