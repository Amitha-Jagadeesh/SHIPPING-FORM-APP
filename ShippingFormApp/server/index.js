"use strict"; 
const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;
const {mongoose} = require('./config/db'); //database is connected with the server
const {shippingFormController} = require('./app/controller/shippingController')


mongoose.set('useFindAndModify', false); //not to get warning while updating or deleting the data.

app.use(express.json());
app.use(cors()) //  middleware that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin

app.get('/shipping',function(req,res){
    
});


app.use('/shippingForm',shippingFormController);


app.listen(port,function(){
    console.log('listening to port',port)
});