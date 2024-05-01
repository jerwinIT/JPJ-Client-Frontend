const express = require('express');
const router = express.Router();


//LOGIN SYSTEM
const { getCred, register, login, protected, logout, changePassword, deleteAccount } = require('../controllers/authen');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidation, loginValidation, changePasswordValidation, deleteAccountValidation } = require('../validators/authen');
const { userAuth } = require('../middlewares/auth-middleware');

//Route to get cred
router.get('/get-cred', getCred);

//Protected route
router.get('/protected', userAuth, protected);

//Route to registration
router.post('/register', registerValidation, validationMiddleware, register);

//Route to login
router.post('/login', loginValidation, validationMiddleware, login);

//Route to logout
router.post('/logout', logout);

//route to change password
router.post('/change-password', changePasswordValidation, changePassword);

//route to delete account
router.delete('/delete-account', deleteAccountValidation, deleteAccount)



//INVENTORY MANAGEMENT SYSTEM
const { getProduct, addProduct, removeProduct, searchProduct, sellProduct, updateProductQuantity, updateProductPrice, InventorySalesRecord, DailySalesRecord, MonthlySalesRecord } = require('../controllers/invms');
const { addProductValidator, removeProductValidator, searchProductValidator, sellProductValidator, updateProductStockLevelValidator, updateProductPriceValidator, targetDateValidator, startDateValidator, endDateValidator } = require('../validators/inventoryChecker');

//Route to display product informations
router.get('/get-product', getProduct)

//Route to display inventory sales record
router.get('/sales-record', InventorySalesRecord)

//Route to search specific product
router.post('/search-product', searchProductValidator, validationMiddleware, searchProduct)

//Route to add product
router.post('/add-product', addProductValidator, validationMiddleware, addProduct)
 
//Route to removing product
router.delete('/remove-product', removeProductValidator,  removeProduct)

//Route to sell product
router.post('/sell-product', sellProductValidator, sellProduct);

//Route to update product stock level
router.put('/update-stock', updateProductStockLevelValidator, updateProductQuantity)

//Route to update product price
router.put('/update-price', updateProductPriceValidator, updateProductPrice)

// Route to generate daily sales record
router.post('/daily-record', targetDateValidator, DailySalesRecord);

// Route to generate daily sales record
router.post('/monthly-record', startDateValidator, endDateValidator, MonthlySalesRecord);







module.exports = router;