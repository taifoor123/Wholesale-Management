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

var sql;

// DISPLAY EDIT FORM
router.get('/', (req, res, next) => {
    console.log(`Updating product ${req.query.id}`)
    console.log(req.query)
	conn.query("SELECT * FROM product WHERE product_id = ?", [req.query.id], (err, result) => {
		if (err) throw err
		console.log(result[0])
		res.render('product_buy', {title: `Product #${result[0].product_id}`, main: result[0]});
	})
});
// PERFORM UPDATE
router.post('/', (req, res, next) => {
    console.log("upubuhbohboyuhbyudating")
	console.log(req.body)
	var product = {
        product_id: req['body'].product_id,
        pname: req['body'].pname,
        buying_price: req['body'].buying_price,
		selling_price: req['body'].selling_price,
        quantity: req['body'].quantity,
        quantity_required: req['body'].quantity_required,
        category: req['body'].category
    }
    // var prods = {
    // pay_id: req['body'].product_id,
    // name: req['body'].pname,
    // quantity: req['body'].quantity_required
    // }
    var name = "'" + req['body'].pname + "'";
    var quantity1 = parseInt(req['body'].quantity_required);
    var amount= product.buying_price*quantity1;
	// var pay_id = parseInt(req['body'].product_id);
    
    
    console.log(name);
    // console.log(pay_id);
    console.log(quantity1)
  if (product.quantity<=20) { 
    // res.redirect('/product');
    res.redirect('/product?buy=false&prod=' + name);
        } else {

    // {
    //     res.redirect('/product?buy=true&prod=' + name);
    // }
    // sql = "INSERT INTO record (name,quantity) values (" + prods + ");";
    // conn.connect(function (err) {
	// 	if (err) throw err;
	// 	console.log("connected");


	// 	conn.query(sql, function (err, result) {
	// 		if (err) throw err;
	// 		console.log(2);
	// 		console.log("1 record inserted");
	// 		console.log(result);
	// 		// res.redirect('/product?add=true&prod=' + abc2);
	// 		//res.render('product', {title: 'Inventory', success: { add: true, prod : abc2}});
	// 	});
	// });
    console.log(req['body'].quantity-1)
    // conn.connect(function (err) {
	// 	if (err) throw err;
    // 	console.log("connected");
    conn.query('INSERT INTO Sale_Details SET ?', {Product_name: name ,Product_Id: product.product_id,Quantity:quantity1, Amount: amount}, function (error, results, fields) {
        // INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
	// conn.query(`INSERT INTO record (pay_id,name,quantity) VALUES${pay_id,name,quantity} `, (err, results) => {
    console.log('Inserted')
	conn.query(`UPDATE product SET quantity=${product.quantity-product.quantity_required} WHERE product_id = ${product.product_id}`, (err, results) => {
        // update product set quantity = quantity-1 where product_id =13;
	// conn.query(`UPDATE product SET ? WHERE product_id = ${product.product_id}`, product, (err, results) => {
        // update product set pname='Cock' where product_id='13';
        if (err) throw err        
		console.log('Update product', results[0])
		res.redirect('/product?buy=true&prod=' + name);
    })
})
    
}
})
// });


module.exports = router;
