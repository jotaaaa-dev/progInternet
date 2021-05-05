const mongoose = require('mongoose')

//Criando o schema de Categoria
const CategoriaSchema = mongoose.Schema({
    nome: {type: String},
    status: {type: String, enum:['ativo','inativo']},
    foto: {
        originalName: {type: String},
        path: {type: String},
        size: {type: Number},
        mimetype: {type: String}
    }
},{timestamps: true})

module.exports = mongoose.model('categoria', CategoriaSchema)