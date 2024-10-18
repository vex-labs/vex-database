const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
   team_name: String,
   icon_url: String,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
