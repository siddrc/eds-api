const { Database } = require("../database/database")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
class Users {
    static async login(loginParams) {
        try {
            const user = await new UsersImpl().authenticate(loginParams)
            let token = {}
            if (user.authentic)
                token = jwt.sign({ id: user.account._id }, process.env.JWT_API_KEY, {
                    expiresIn: 1800
                })
            else
                token = null
            return { isUserAuthentic: user.authentic, token: token }
        } catch (e) {
            throw e
        }
    }
}
class UsersImpl {
    constructor() {
        const database = new Database()
        this.authenticate = async function(loginParams) {
            try {
                let passwordIsValid = false
                const criteria = {
                    "userName": loginParams.userName
                }
                const projection = { "password": 1, "_id": 1 }
                const readParams = {
                    collectionName: "users",
                    criteria: criteria,
                    projection: projection
                }
                const account = await database.readOne(readParams)
                if (account && account.password && loginParams.password)
                    return {
                        "authentic": bcrypt.compareSync(loginParams.password, account.password),
                        "account": account
                    }
                else
                    return { "authentic": false, "account": null }
            } catch (e) {
                throw e
            }
        }
    }

}
module.exports = { Users: Users }