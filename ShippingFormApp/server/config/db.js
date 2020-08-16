const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true); 
mongoose.connect('mongodb://localhost:27017/shipping-form-db',{
    useNewUrlParser:true}).then(function(){
    console.log('connected to db');
}).catch(function(err){
    console.log('error in connecting to db', err);
})
module.exports = {
    mongoose
}
