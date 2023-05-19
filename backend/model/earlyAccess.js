const mongoose = require('mongoose');
const validator = require('validator');


const Schema = mongoose.Schema;

const earlyAccessUser = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
    //if adding postcode here - must add in userController
})

//static signup method
earlyAccessUser.statics.signup = async function(email) {

    //validation
    if(!email){
        throw Error('Email must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email is already in use');
    }

    const mainUser = await this.create({email});

    return mainUser;
}

module.exports = mongoose.model('earlyAccessUser', earlyAccessUser);