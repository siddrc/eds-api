const mongoClient = require("mongodb").MongoClient;
const dbProperties = require("./dbProperties.json")
class Database {
    constructor() {
        async function getConnection() {
            try {
                const connection = await mongoClient.connect(dbProperties.dbUrl,{ useNewUrlParser: true });
                return connection;
            } catch (error) {
                throw error
            }
        }
        this.create = async function(createParams) {
            try {
                const connection = await getConnection();
                const rowsAffected = await createHandler(connection, createParams);
                return rowsAffected;
            } catch (error) {
                throw error;
            }

        }
        this.read = async function(readParams) {
            try {
                const connection = await getConnection();
                const documents = await readHandler(connection, readParams);
                return documents;
            } catch (error) {
                throw error;
            }
        }
        this.readOne = async function(readOneParams) {
            try {
                const connection = await getConnection();
                const doc = await readOneHandler(connection, readOneParams);
                return doc;
            } catch (error) {
                throw error;
            }
        }
        this.update = async function(updateParams) {
            try {
                const connection = await getConnection();
                const rowsAffected = await updateHandler(connection, updateParams);
                return rowsAffected;
            } catch (error) {
                throw error;
            }
        }
        this.delete = async function(deleteParams) {
            try {
                const connection = await getConnection();
                const rowsAffected = await deleteHandler(connection, deleteParams);
                return rowsAffected;
            } catch (error) {
                throw error;
            }
        }
        this.count = async function(countParams){
            try {
                const connection = await getConnection();
                const countFromDatabase = await countHandler(connection, countParams);
                return countFromDatabase;
            } catch (error) {
                throw error;
            }
        }
        async function createHandler(connection, createParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(createParams.collectionName);
                const rowsAffected = await collection.insert(createParams.payload);
                connection.close();
                return rowsAffected;
            } catch (error) {
                throw error
            }

        }
        async function readHandler(connection, readParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(readParams.collectionName);
                const documents = await collection.find(readParams.criteria).project(readParams.projection).toArray();
                connection.close();
                return documents;
            } catch (error) {
                throw error
            }

        }
        async function readOneHandler(connection, readOneParams){
             try {
                const db = connection.db(dbProperties.databaseName)
                const collection = db.collection(readOneParams.collectionName)
                const doc = await collection.findOne(readOneParams.criteria,readOneParams.projection)
                connection.close()
                return doc
            } catch (error) {
                throw error
            }
        }
        async function updateHandler(connection, updateParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(updateParams.collectionName);
                const rowsAffected = await collection.updateOne(updateParams.criteria, updateParams.dataToBeUpdated);
                connection.close();
                return rowsAffected;
            } catch (error) {
                throw error
            }
        }
        async function deleteHandler(connection, deleteParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(deleteParams.collectionName);
                const rowsAffected = await collection.deleteOne(deleteParams.criteria);
                connection.close();
                return rowsAffected;
            } catch (error) {
                throw error
            }
        }
        async function countHandler(connection, countParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(countParams.collectionName);
                const countFromDatabase = await collection.countDocuments(countParams.criteria);
                connection.close();
                return countFromDatabase;
            } catch (error) {
                throw error
            }
        }
        
    }
}
module.exports = {Database:Database};