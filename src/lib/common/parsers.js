/**
 * 
 * @param {FormData} form 
 * @param {String[]} fields 
 */
function loadFormForFields(
    form, fields
)
{
    let out = {}

    for(let field of fields)
        out[field] = form.get(field)

    return out

}

/**
 * 
 * @param {FormData} data 
 */
function parseFormToItemEnrty(data)
{
    const fields = [
        'titulo', 'conteudo', 'tags', 'tipo'
    ];

    return loadFormForFields(data, fields)

}

module.exports = {parseFormToItemEnrty}