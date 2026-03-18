let userController = require('../controllers/users')
let jwt = require('jsonwebtoken')
let { publicKey } = require('./constant')
module.exports = {
    CheckLogin: async function (req, res, next) {
        try {
            if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
                res.status(401).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            let token = req.headers.authorization.split(" ")[1];
            let result = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
            let user = await userController.GetAnUserById(result.id);
            if (!user) {
                res.status(401).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            req.user = user;
            next()
        } catch (error) {
            res.status(401).send({
                message: "ban chua dang nhap"
            })
        }

    }
}