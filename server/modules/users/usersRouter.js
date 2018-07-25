const router = require("express").Router()
const {Users} = require("./users")
const {ResponseWrapper} = require("../wrappers/responseWrapper")
const {ErrorWrapper} = require("../wrappers/errorWrapper")
class UsersRouter {
	static getRoutesHandler(){
		router.post("/login",async (req,res)=>{
			try{
				const loginResult = await Users.login(req.body)
				res.status(200).send(ResponseWrapper.wrap(loginResult))
			}catch(e){
				console.log(`[ERROR][${__filename}][getRoutesHandler]:${e}`)
				res.status(500).send(ErrorWrapper.wrap(e))
			}
		})
		return router
	}
}
module.exports = {UsersRouter:UsersRouter}