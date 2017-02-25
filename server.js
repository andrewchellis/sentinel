const express = require('express');
let app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const db = new sqlite3.Database('sentinel.db');
const morgan = require('morgan');
const request = require('request');
const helpers = require('./helpers.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(express.static(__dirname));

const quandl = "https://www.quandl.com/api/v3/datasets/WIKI/";

app.use(morgan('dev'));

const port = 1337;

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});

app.post('/api/graphCalc', (req,res) => {
	let resp = {}, date;

	req.body.tickers.foreach((ticker) => {
		request.get(quandl+ticker+".json?column_index=4&start_date="+req.body.start+"&end_date="+req.body.end+"&collapse=daily&api_key="+helpers.api_key,
			function(err,response,body){
				if(error){
					console.log(error);
				}
				else{
					console.log(response);
					console.log(body);
				}
			}
		});
	});


	res.json(resp);
});

app.listen(port, () => {
	console.log('Listening on port: ' + port);
});
