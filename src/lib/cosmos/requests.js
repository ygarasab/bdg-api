const {Container, Item} = require("@azure/cosmos")

/**
 * 
 * @param {Container} container 
 * @param {String} username 
 */
async function getUserDataForUserName(container, username)
{
    const query = {
        query: "select * from users u where u.username=@username",
        parameters: [
            {
                name: "@username",
                value: username
            }
        ]
    }
    const {resources} = await container.items.query(query).fetchAll();
    return resources
}

/**
 * 
 * @param {Item} item 
 * @param {String} field 
 * @param {String} value 
 */
async function patchField(item, path, value)
{
    return await item.patch(
        {
            operations: [
                {
                    op: 'replace',
                    path, value
                }
            ]
        }
    )

}

/**
 * 
 * @param {Container} container 
 * @param {Object} data 
 * @returns {{ok: Boolean, info: import("@azure/cosmos").Resource | String}}
 */
async function createDocument(container, data)
{
    try{
        const {resource} = await container.items.create(data)
        return { ok: true, info: resource }
    }
    catch(e)
    {
        let info
        if(e.code == 409)
            info = { creation: "O documento informado já existe" }
        else
            info = { creation: "Erro na criação de documento: " + e.body.message }

        return { ok: false, info }
    }
}

/**
 * 
 * @param {Container} container 
 * @param {String} username 
 */
async function checkin(container, id)
{
    const item = container.item(id, id)
    await patchField(item, "/lastRequest", new Date().toISOString())
}

module.exports = {
    getUserDataForUserName,
    checkin,
    createDocument
}