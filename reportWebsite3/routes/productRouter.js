const productController = require(`../controllers/productController.js`);

const router = require(`express`).Router();

// use green str in postman for the url i.e.:
// http://localhost:8080/api/products/allProducts
// this access the getAllProducts method

router.post(`/addProduct`, productController.addProduct);

router.get(`/allProducts`, productController.getAllProducts);

router.get(`/published`, productController.getPublishedProduct);

// keep dynamic and static addresses separate

router.get(`/:id`, productController.getOneProduct); // dynamic for element hence :id

router.put(`/:id`, productController.updateProduct); // put for updates

router.delete(`/:id`, productController.deleteProduct);

module.exports = router; // allows it to be used by others
