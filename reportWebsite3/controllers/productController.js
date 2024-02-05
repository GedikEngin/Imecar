const { where } = require("sequelize");
const db = require(`../models`); // importing models file

// creating main model

const Product = db.products;
const Review = db.reviews;

// main work

// 1 create product

const addProduct = async (req, res) => {
	let info = {
		// getting data from body
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		published: req.body.published ? req.body.published : false,
	};
	// referring to table name and using sequelize functions to create table
	// creates product based on object info provided
	const product = await Product.create(info);
	res.status(200).send(product);
	console.log(product);
};

// 2 getting all products

const getAllProducts = async (req, res) => {
	let products = await Product.findAll({}); // gets all info using built in sequelize
	res.status(200).send(products);
	console.log(products);
};

// const getAllProducts = async (req, res) => {
// 	let products = await Product.findAll({
// 		// using attribute specifies what items to return
// 		attributes: [`title`, `price`],
// 	}); // gets all info using built in sequelize
// 	res.status(200).send(products);
// 	console.log(products);
// };

// 3 get single product

const getOneProduct = async (req, res) => {
	let id = req.params.id; // gets ids from url
	let product = await Product.findOne({ where: { id: id } }); // checks if ids match
	res.status(200).send(product);
};

// 4 update product

const updateProduct = async (req, res) => {
	let id = req.params.id; // uses id to update correct element
	const product = await Product.update(req.body, { where: { id: id } }); // updates where id = id
	res.status(200).send(product); // sends response 200 and product info
};

// 5 delete product by id

const deleteProduct = async (req, res) => {
	let id = req.params.id; // gets ids from url
	await Product.destroy({ where: { id: id } }); // deleting element specified
	res.status(200).send(`producted deleted`);
};

// 6 get published product
const getPublishedProduct = async (req, res) => {
	const products = await Product.findAll({ where: { published: true } }); // gets all products that have been published
	res.status(200).send(products);
};

module.exports = {
	addProduct,
	getAllProducts,
	getOneProduct,
	updateProduct,
	deleteProduct,
	getPublishedProduct,
};
