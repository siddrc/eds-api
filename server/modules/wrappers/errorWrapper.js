class ErrorWrapper{
	static wrap(error){
		return {"error":error,"result":null}
	}
}
module.exports = {ErrorWrapper:ErrorWrapper}