
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var mongoURL = process.env.MONGOHQ_URL || 'mongodb://localhost/postcodes';

console.log('mongoURL: ' + mongoURL);

mongoose.connect(mongoURL);

var PostcodeSchema = new Schema({
	postcode: {type: String, index: true},
	geo: {type: [Number], index: '2d'}
});

var Postcode = mongoose.model('Postcode', PostcodeSchema);

module.exports.Postcode = Postcode;
module.exports.mongoose = mongoose;