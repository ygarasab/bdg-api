const { getStorageService, getStorageSoft} = require("./connection");
const { Readable } = require('stream')

/**
 * 
 * @param {String} itemId 
 * @param {File} file 
 */
async function uploadItemFile(
    itemId,
    file,
    newName = false
)
{

    let filename = file.name
    if(newName){
        filename = newName + '.' + file.name.split('.').pop()
    }

    const bufferArray = await file.arrayBuffer()
    const buff = Buffer.from(bufferArray)
    const stream = Readable.from(buff)

    const service = getStorageService(
        'acervo',
        [itemId, filename].join('/')
    )

    const response = await service.uploadStream(
        stream, file.size
    )
}

async function listFilesForItem(
   itemId
)
{
    const prefix = itemId + '/'
    const client = getStorageSoft('acervo')
    const blobs = []

    for await (const blob of client.listBlobsFlat({ prefix })) {
        blobs.push(blob.name);
    }

    return blobs

}

module.exports = {uploadItemFile, listFilesForItem}