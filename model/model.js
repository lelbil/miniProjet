var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jeu');

var Schema = mongoose.Schema;

var verbSchema = new Schema({
	verb: String,
	difficulty: Number
})

var Verb = mongoose.model('Verb', verbSchema);

module.exports = Verb;