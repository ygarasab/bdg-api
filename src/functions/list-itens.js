const { app } = require('@azure/functions');
const cosmos = require("../lib/cosmos")

app.http('listaItens', {
    route: 'items',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const entryContainer = await cosmos.connection.getContainerConnection('itens');
        const entries = await entryContainer.items.readAll().fetchAll()

        return context.res = {
            body: JSON.stringify(entries.resources),
            headers: { "Content-Type": "application/json" }
        };

    }
});
