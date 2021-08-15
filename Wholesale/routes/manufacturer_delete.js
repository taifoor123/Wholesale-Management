var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//const conn = require('../data/conn.js');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wholesale'
});

var prods;
var sql;
router.post('/', (req, res, next) => {
	console.log(`WARNING!!! Deleting product #${req.body.id}`)
	conn.query("DELETE FROM manufacturer WHERE manu_id = ?", req.body.id, (err, results) => {
		if (err) throw err;
		res.redirect('/manufacturer')
	})
});
module.exports = router;