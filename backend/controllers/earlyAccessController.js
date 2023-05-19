const earlyAccessUser = require('../model/earlyAccess');

const signupEarlyAccessUser = async (req, res) => {

    const {email} = req.body;
    try {
        const user = await earlyAccessUser.signup(email);

        //create a token
        res.status(200).json({email})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signupEarlyAccessUser
}