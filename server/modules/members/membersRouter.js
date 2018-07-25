const router = require("express").Router()
const {Members} = require("./members")
const {ResponseWrapper} = require("../wrappers/responseWrapper")
const {ErrorWrapper} = require("../wrappers/errorWrapper")
class MembersRouter {
	static getRoutesHandler(){
		router.get("/students",async (req,res)=>{
			try{
				const students = await Members.getStudents()
				res.status(200).send(ResponseWrapper.wrap(students))
			}catch(e){
				console.log(`[ERROR][${__filename}][getRoutesHandler]:${e}`)
				res.status(500).send(ErrorWrapper.wrap(e))
			}
		})
		router.get("/students/details",async (req,res)=>{
			try{
				const studentsDetails = await Members.getStudentsDetails()
				res.status(200).send(ResponseWrapper.wrap(studentsDetails))
			}catch(e){
				console.log(`[ERROR][${__filename}][getRoutesHandler]:${e}`)
				res.status(500).send(ErrorWrapper.wrap(e))
			}
		})
		router.get("/students/tests",async (req,res)=>{
			try{
				const studentsDetails = await Members.getStudentsTests()
				res.status(200).send(ResponseWrapper.wrap(studentsDetails))
			}catch(e){
				console.log(`[ERROR][${__filename}][getRoutesHandler]:${e}`)
				res.status(500).send(ErrorWrapper.wrap(e))
			}
		})
		return router
	}
}
module.exports = {MembersRouter:MembersRouter}