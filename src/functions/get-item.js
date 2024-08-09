const { app } = require('@azure/functions');
const cosmos = require("../lib/cosmos")
const {listFilesForItem} = require("../lib/storage/methods");

app.http('buscaItem', {
    route: 'items/{id}',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const id = request.params.id;
        const entryContainer = await cosmos.connection.getContainerConnection('itens');
        const entry = await entryContainer.item(id, 'balaso').read()

        entry.resource.files = await listFilesForItem(id)

        return context.res = {
            body: JSON.stringify(entry.resource),
            headers: { "Content-Type": "application/json" }
        };

    }
});
