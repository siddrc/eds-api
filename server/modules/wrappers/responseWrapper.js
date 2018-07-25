
class ResponseWrapper{
	static wrap(response){
		return {"error":null,"response":response} 
	}
}
module.exports = {ResponseWrapper:ResponseWrapper}