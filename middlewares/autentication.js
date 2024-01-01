const { verifyAccessToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
    try {
        let token = req.headers.access_token
        // console.log('==========ini dari token');
        if(!token){
            throw {name: "Not Login"}
        }
        let payload = verifyAccessToken(token)
        let data = await User.findByPk(payload.id)
        // console.log(payload, '================ini dairi data');
        if(!data){
            throw {name: "Not Login"}
        }
        req.User = {
            id: data.id,
            email: data.email
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = authentication
