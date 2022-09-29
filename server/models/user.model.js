const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    startupName:{
        type:String, required:true
    },
    name:{
        type:String, required:true
    }, 
    phone:{
        type:Number, required:true
    }, 
    city:{
        type:String, required:true
    }, 
    email:{
        type:String, required:true, unique: true
    },  
    pass:{
        type:String, required:true
    }, 
    userType:{
        type:String, required:true
    },
    dateCreated: {
        type:String,
    }
})

const User = mongoose.model('USER', userSchema);

module.exports = User;