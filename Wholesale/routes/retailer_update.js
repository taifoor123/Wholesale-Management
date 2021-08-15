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
// DISPLAY EDIT FORM
router.get('/', (req, res, next) => {
	console.log(`Updating retailer ${req.query.id}`)
	conn.query("SELECT * FROM retailer WHERE retailer_id = ?", [req.query.id], (err, result) => {
		if (err) throw err;
		console.log(result[0]);
		res.render('retailer_update', {title: `Update Retailer #${result[0].retailer_id}`, main: result[0]});
	})
});

// PERFORM UPDATE
router.post('/', (req, res, next) => {
	console.log(req.body);
	//console.log(`Recieved for updating ${req.body}`)
	var retailer = {
        retailer_id: req['body'].retailer_id,
        rname: req['body'].rname,
        balance: req['body'].balance,
		phone_no: req['body'].phone_no,
        category: req['body'].category
    };

	conn.query(`UPDATE retailer SET ? WHERE retailer_id = ${retailer.retailer_id}`, retailer, (err, results) => {
		if (err) throw err;
		console.log('Update retailer', results[0]);
		res.redirect('/retailer');
	});
});
module.exports = router;