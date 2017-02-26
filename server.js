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

app.get('/resources/:file',(req,res)=>{
	res.sendFile(req.params.file);
});

app.post('/api/graphCalc', (req,res) => {
	let resp = {}, date;
	req.body.companies.forEach((ticker) => {
		request.get(quandl+ticker+".json?start_date="+req.body.start+"&end_date="+req.body.end+"&collapse=daily&order=asc&api_key="+helpers.api_key,
			function(err,response,body){
				if(err){
					console.log(err);
				}
				else{
					let currTick = {};
					body = JSON.parse(body);
					currTick.quantity = Math.floor(parseInt(req.body.amount,10)/body.dataset.data[0][4]);
					currTick.leftover = parseInt(req.body.amount,10)%body.dataset.data[0][4];


					/**
						this.quantity = Math.floor(amount/data.data[0][4]);
						this.leftover = amount%data.data[0][4];


					*/
					currTick.data = [];
					body.dataset.data.forEach((element)=> {
						if(element[6]!=0){
							currTick.leftover += (currTick.quantity*element[6]);
							currTick.quantity += Math.floor(currTick.leftover/element[4]);
							currTick.leftover = (currTick.leftover%element[4]);
							let ins = [element[0],element[4]];
							currTick.data.push(ins);
						}
					});
					currTick.start = body.dataset.data[0][0];
					currTick.end = body.dataset.data[body.dataset.data.length-1][0];
					currTick.stock = currTick.quantity*body.dataset.data[body.dataset.data.length-1][4];
					currTick.total = currTick.stock + currTick.leftover;
					currTick.percent = currTick.total/req.body.amount;
					resp[ticker] = currTick;
					if(Object.keys(resp).length===req.body.companies.length){
						res.json(resp);
					}
				}
			}
		);
	});
});

app.use((req,res)=> {
	res.redirect('/');
});

app.listen(port, () => {
	console.log('Listening on port: ' + port);
});
