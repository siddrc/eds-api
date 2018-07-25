const {Database} = require("../database/database")
class Members {
    static async getStudents() {
        try {
            return await new MembersImpl().getStudents()
        } catch (e) {
            throw e
        }
    }
    static async getStudentsDetails(){
        try {
            return await new MembersImpl().getStudentsDetails()
        } catch (e) {
            throw e
        }
    }
    static async getStudentsTests(){
        try {
            return await new MembersImpl().getStudentsTests()
        } catch (e) {
            throw e
        }
    }
}
class MembersImpl {
    constructor() {
        const database = new Database()
        this.getStudents = async function() {
            try {
            	const criteria = {}
            	const projection = {"_id":0,"name":1}
            	const readParams = {
            		collectionName:"students",
            		criteria: criteria,
            		projection:projection
            	}
                const students =  await database.read(readParams)
                return students
            } catch (e) {
                throw e
            }
        }
        this.getStudentsDetails = async function() {
            try {
                const criteria = {}
                const projection = {"_id":0,"name":1,"birthday":1,"height":1}
                const readParams = {
                    collectionName:"students",
                    criteria: criteria,
                    projection:projection
                }
                const students =  await database.read(readParams)
                return students
            } catch (e) {
                throw e
            }
        }
        this.getStudentsTests = async function() {
            try {
                const criteria = {}
                const projection = {"_id":0,"name":1,"testsTaken":1}
                const readParams = {
                    collectionName:"students",
                    criteria: criteria,
                    projection:projection
                }
                const students =  await database.read(readParams)
                return students
            } catch (e) {
                throw e
            }
        }
    }
}
module.exports = {Members:Members}