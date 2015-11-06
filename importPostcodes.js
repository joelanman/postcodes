// node samples/sample.js
var csv = require('csv'),
	fs = require('fs'),
	models = require('./models/models'),
	mongoose = models.mongoose,
	Postcode = models.Postcode;


var getPostcodes = function(){

	csv()
	.from.stream(fs.createReadStream(__dirname + '/resources/postcodes.csv'))
	.on('record',function(data, index){

		if (index === 0)
			return; //ignore labels

		var postcode = data[0],
			geo = [data[1], data[2]];
		
		console.log(postcode);

		var postcodeObj = new Postcode({'postcode':postcode, 'geo' : geo});
/*
		postcodeObj.save(function(err, result){
			if (err){
				console.log('ERROR: ' + err);
			}
		});
*/
	})
	.on('end',function(count){
		console.log('Number of lines: '+count);
		console.log('all done');
		setTimeout(function(){
			console.log('closing connection');
			mongoose.connection.close();
		},5000);
	})
	.on('error',function(error){
		console.log(error.message);
	});
		
}

getPostcodes();