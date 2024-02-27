const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const mainUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    addressOne: {
        type: String,
        required: false
    },
    addressTwo: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    siteType: {
        type: String,
        required: false
    },
    subscriptionId: {
        type: String,
        required: false
    }
    //if adding postcode here - must add in userController
})

//static signup method
mainUserSchema.statics.signup = async function(email, password, name, addressOne, addressTwo, telephone, facebook, twitter, instagram) {

    //validation
    if(!email || !password){
        throw Error('Email and password must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough - requires at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const mainUser = await this.create({email, password: hash, name, addressOne, addressTwo, telephone, facebook, twitter, instagram});

    return mainUser;
}

// static login method
mainUserSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const mainUser = await this.findOne({ email });

    if(!mainUser){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, mainUser.password);

    if(!match){
        throw Error('Incorrect password')
    }

    return mainUser
}

module.exports = mongoose.model('mainUser', mainUserSchema);