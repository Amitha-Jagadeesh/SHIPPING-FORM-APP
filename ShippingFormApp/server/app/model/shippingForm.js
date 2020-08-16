const mongoose = require('mongoose');
const validator = require('validator'); // for custom validation


const Schema = mongoose.Schema;

const shippingFormSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true, // check for duplicacy
        trim:true,
        //validate the format of email - custom validation
        validate:{
            validator:function(value){
                return validator.isEmail(value);
            },
            message:function(){
                return 'Invalid Email format';
            }
        }
    },
    shippingCountry:{
        type:String,
        required:true,
        countries:['United Kingdom','India','USA']
    },
    mobile:{
        type:String, 
        required:true,
        unique:true,
        minlength:10,
        maxlength:10,
        trim:true,
        validate:{
            validator:function(value){
                return validator.isNumeric(value,{no_symbols:true});
            },
            message:function(){
                return 'Invalid Mobile Number Format';
            }
        },
        countryCodes:['+44','+91','+1']
    },
    addressLine1:{
        type:String,
        minlength:3,
        required:true
    },
    addressLine2:{
        type:String
    },
    postcode:{
        type:String,
        minlength:3,
        required:true
    },
    city:{
        type:String,
        minlength:3,
        required:true
    }
})


// To send custom error message when there is duplicate email or mobile number 
shippingFormSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000 && error.keyPattern.email === 1) {
      next(ErrorMsg={
                field:'email',
                error:'Email id already exists'
        });
    } else if (error.name === 'MongoError' && error.code === 11000 && error.keyPattern.mobile === 1){
        next(ErrorMsg={
                field:'mobile',
                error:'mobile number already exists'
        });
    } else{
        next();
    }
  });

const ShippingForm = mongoose.model('ShippingForm',shippingFormSchema)

module.exports = {
    ShippingForm
}