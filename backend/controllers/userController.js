const mainUser = require('../model/mainUser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'});
}

const loginUser = async(req, res) => {
    const {email, password, _id} = req.body;

    try {
        const user = await mainUser.login(email, password)

        //create token
        const token = createToken(user._id);

        res.status(200).json({email, token, id: user._id});
    }    catch(error) {
        res.status(400).json({error: error.message});
    }
}

//signup user
const signupUser = async (req, res) => {

    const {email, password, name, addressOne, addressTwo, telephone, facebook, twitter, instagram} = req.body;
    try {
        const user = await mainUser.signup(email, password, name, addressOne, addressTwo, telephone, facebook, twitter, instagram);

        //create a token
        const token = createToken(user._id);
        res.status(200).json({email, token, id: user._id})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//get user 
const getUser = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"});
    }

    const user = await mainUser.findById(id);

    if(!user){
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json({
        user: user.email,
        name: user.name,
        addressOne: user.addressOne,
        addressTwo: user.addressTwo,
        telephone: user.telephone,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        siteType: user.siteType
    });
}

//update user
const updateUser = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"});
    }

    const user = await mainUser.findOneAndUpdate({_id: id}, {...req.body}, {new: true});

    if(!user){
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json({
        email: user.email,
        name: user.name,
        addressOne: user.addressOne,
        addressTwo: user.addressTwo,
        telephone: user.telephone,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        siteType: user.siteType
    });
}


module.exports = {
    loginUser,
    signupUser,
    getUser,
    updateUser
}
