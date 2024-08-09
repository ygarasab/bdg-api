const { app } = require('@azure/functions');
const cosmos = require("../lib/cosmos")
const fs = require('fs');
const { methods } = require('../lib/storage');
const { parsers } = require('../lib/common');

app.http('criaItem', {
    route: 'items',
    methods: ['POST'],
    authLevel: 'admin',
    dataType: 'binary',
    handler: async (request, context) => 
    {

        const formData = await request.formData()
        const entryData = parsers.parseFormToItemEnrty(formData)

        const thumbnail = formData.get('thumbnail')
        const images = formData.getAll('images[]')


        entryData.created_at = new Date().toISOString();

        const entryContainer = await cosmos.connection.getContainerConnection('itens');
        const createdResource = await cosmos.requests.createDocument(entryContainer, entryData)
        
        const resource = createdResource.info

        methods.uploadItemFile(resource.id, thumbnail, 'thumbnail')


        let i = 1;
        for(let image of images)
        {
            methods.uploadItemFile(resource.id, image, 'image_'+i)
            i++
        }

        return context.res = {
            body: JSON.stringify(createdResource.info),
            headers: { "Content-Type": "application/json" }
        };

    }
});
