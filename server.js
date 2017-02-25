const express = require('express');
let app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const db = new sqlite3.Database('sentinel.db');
const morgan = require('morgan');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));
app.use(express.static(__dirname));

app.use(morgan('dev'));

const port = 1337;

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});

app.listen(port, () => {
	console.log('Listening on port: ' + port);
});
