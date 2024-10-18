const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
   match_id: String,
   game: String,
   team_1: String,
   team_2: String,
   team_1_odds: Number,
   team_2_odds: Number,
   team_1_icon: String,
   team_2_icon: String,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
