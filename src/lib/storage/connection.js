require('dotenv').config()
const {BlockBlobClient, BlobServiceClient, ContainerClient} = require('@azure/storage-blob')

function getStorageService(containerName, blobName)
{
    return new BlockBlobClient(
        process.env.STORAGE_CONNECTION_STRING,
        containerName,
        blobName
    )
}

function getStorageSoft(containerName)
{
    const serviceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING)
    return serviceClient.getContainerClient(containerName)
}

module.exports = {getStorageService, getStorageSoft}