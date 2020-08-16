const express = require('express')
var { check, validationResult } = require('express-validator')
const router = express.Router()
const { ShippingForm } = require('../model/shippingForm');
const fieldEmptyError = 'This field is required';
const fieldMinLengthError = 'This field must have atleast 3 char';

//validation check prior save
router.post('/',
    check('firstname')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 3 }).withMessage(`${fieldMinLengthError}`).bail(),

    check('lastname')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 3 }).withMessage(`${fieldMinLengthError}`).bail(),

    check('email')
        .not().isEmpty().withMessage('Email field is required').bail()
        .isLength({ min: 3 }).withMessage('Email field must have atleast 3 char').bail()
        .isEmail().normalizeEmail().withMessage('Invalid Email Format').bail(),

    check('mobile')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 10, max: 10 }).withMessage('Phone number length must be 10 char').bail()
        .isMobilePhone().withMessage('Invalid phone number format').bail(),

    check('addressLine1')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 3 }).withMessage(`${fieldMinLengthError}`).bail(),

    check('postcode')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 3 }).withMessage(`${fieldMinLengthError}`).bail(),

    check('city')
        .not().isEmpty().withMessage(`${fieldEmptyError}`).bail()
        .isLength({ min: 3 }).withMessage(`${fieldMinLengthError}`).bail(),

    function (req, res) {
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array()); //validation errors sent to client 
        } else {
            const user = new ShippingForm(req.body)
            user.save().then(user => {
                res.send({ sucess: "success", user });
            }).catch(err => {
                return res.status(404).send(err) 
            })
        }
    });

module.exports = {
    shippingFormController: router
}
