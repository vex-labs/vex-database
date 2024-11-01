const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",  
    methods: "GET,POST",  
    credentials: true  
  }));
  

// MongoDB Atlas URI
const mongoURI = "";

// Connect to MongoDB Atlas
mongoose
   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to MongoDB Atlas");
      app.listen(3001, () => {
         console.log("Server running on port 3001");
      });
   })
   .catch((err) => console.log(err));

// MongoDB Models (schema definitions)
const Team = mongoose.model(
   "Team",
   new mongoose.Schema({
      team_name: String,
      icon_url: String,
   })
);

const Match = mongoose.model(
    "Match",
    new mongoose.Schema({
       match_id: { type: String, required: true },
       team_1_icon: { type: String, required: true }, 
       team_2_icon: { type: String, required: true }, 
       tournament_name: { type: String, required: true }, 
       tournament_icon: { type: String, required: true }, 
       match_time: { type: Number, required: true }, 
    })
 );
 

// Example root route to test the server
app.get("/", (req, res) => {
   res.send("Hello, MongoDB!");
});

// Add a new team (POST /teams)
app.post("/teams", async (req, res) => {
   try {
      const team = new Team(req.body);
      await team.save();
      res.status(201).send(team); // 201: Created
   } catch (error) {
      res.status(400).send(error); // 400: Bad Request
   }
});

// Add a new match (POST /matches)
app.post("/matches", async (req, res) => {
   try {
      const match = new Match(req.body);
      await match.save();
      res.status(201).send(match);
   } catch (error) {
      res.status(400).send(error);
   }
});

// Get all teams (GET /teams)
app.get("/teams", async (req, res) => {
   try {
      const teams = await Team.find();
      res.status(200).send(teams); // 200: OK
   } catch (error) {
      res.status(500).send(error); // 500: Internal Server Error
   }
});


// Get match by match_id (GET /matches/:match_id)
app.get("/matches/:match_id", async (req, res) => {
   const { match_id } = req.params;  // Extract match_id from the URL parameter
 
   try {
     const match = await Match.findOne({ match_id });  // Query for a single match with the given match_id
     if (!match) {
       return res.status(404).send({ message: "Match not found" });  // 404: Not Found if match doesn't exist
     }
     res.status(200).send(match);  // 200: OK, return the match data
   } catch (error) {
     res.status(500).send({ message: "Error fetching match", error });  // 500: Internal Server Error
   }
 });
 
 // Get matches by match_ids (GET /matches)
 app.get("/matches", async (req, res) => {
   const { matchIDs } = req.query;  // Read matchIDs from query parameters
 
   let matches;
   if (matchIDs) {
     const matchIDArray = matchIDs.split(",");  // Convert comma-separated string to an array
     matches = await Match.find({ match_id: { $in: matchIDArray } });  // Changed from matchID to match_id
   } else {
     matches = await Match.find();  // Fetch all matches if no matchIDs are provided
   }
 
   res.send(matches);
 });
