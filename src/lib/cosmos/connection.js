require('dotenv').config()
const {CosmosClient, Database} = require('@azure/cosmos')


/**
 * 
 * @returns {Database}
 */
async function getDatabseConnection(){

    const key = process.env.COSMOS_KEY;
    const endpoint = process.env.COSMOS_ENDPOINT;
    const dbName = process.env.DB_NAME;

    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists( { id:dbName } )
    return database
}

async function getContainerConnection(containerId){

    const databse = await getDatabseConnection()
    const { container } = await databse.containers.createIfNotExists( {id:containerId} )
    return container
}

module.exports = {
    getContainerConnection
}