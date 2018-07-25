const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.listen(8081)

if(!process.env.JWT_API_KEY)
	console.log(`Please set JWT_API_KEY in environment`)

console.log(`Server started...`)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const {UsersRouter} = require("./server/modules/users/usersRouter")
const {MembersRouter} = require("./server/modules/members/membersRouter")
const VerifyToken = require("./server/modules/auth/verifytoken")
app.use("/api/auth/user",UsersRouter.getRoutesHandler())
app.use("/api/app/members",MembersRouter.getRoutesHandler())

app.all("/api/app/*", VerifyToken.verifyToken, function(req, res, next) {
    next();
});
