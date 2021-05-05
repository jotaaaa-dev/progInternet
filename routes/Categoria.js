//Rotas arquitetura REST

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Categoria = require('../model/Categoria')

/*
    * GET /categorias
    * Listar todas as categorias do BD
*/
router.get("/", async(req, res)=> {
    try{
        const categorias = await Categoria.find()
        res.json(categorias)
    } catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter as categorias, error: ${err.message}`}]
        })
    }
})
/***********************************
    * GET /categorias/:id
    * Listar as categorias do BD pelo id
**************************************/
router.get('/:id', async(req, res) => {
    try{
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    } catch(e){
        res.status(500).send({
            errors: [{
                message: `Não foi possível obter a categoria com o id ${req.params.id}`}]
        })
    }
})
/***********************************
    * DELETE /categorias/:id
    * Apaga a categoria do BD pelo id
**************************************/
router.delete('/:id', async(req, res)=> {
    await Categoria.findByIdAndRemove(req.params.id)
    .then(categoria => {
        res.send({message: `Categoria ${categoria.nome} removida com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{
                message: `Não foi possível apagar a categoria com o id ${req.params.id}`}]
        })
    })
})
/***********************************
    * POST /categorias
    * Inserir uma categoria no BD
**************************************/
const validaCategoria = [
    check('nome','Nome da categoria é obrigatório').not().isEmpty(),
    check('status','Informe um status válido para a categoria').isIn(['ativo','inativo'])
]

router.post('/', validaCategoria, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        let categoria = new Categoria(req.body)
        await categoria.save()
        res.send(categoria)
    }
    catch(err){
        return res.status(500).json({
        errors: [{
            message: `Erro ao salvar a categoria: ${err.message}`}]
        })
    }
})

/***********************************
    * PUT /categorias
    * Altera uma categoria no BD pelo ID
**************************************/
router.put('/', validaCategoria, async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Categoria.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true})
    .then(categoria => {
        res.send({message: `Categoria ${categoria.nome} alterada!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message: `Não foi possível alterar a categoria com o id ${req.body._id}`}]
        })
    })
})

module.exports = router