const express = require('express') //Carrega o express
      require('dotenv').config() //Carrega as variáveis de ambiente
const InicializaMongoServer = require('./config/Db')
//Rotas do nosso projeto backend
const rotasCategoria = require('./routes/Categoria')

// Inicializando o serivdor MongoDb
InicializaMongoServer()

const app = express()
app.disable('x-powered-by') //Remove o Powered-By Express
//Porta padrão do servidor web
const PORT = process.env.PORT

app.use(express.json()) //Iremos fazer o parse do JSON 

app.get('/', (req, res)=> {
    res.json({mensagem: 'API 100% funcional! 😈', versão: '1.0.0!'})
})
// Rotas ligadas ao MongoDb
app.use('/categorias', rotasCategoria)

//Rota para tratar erros 404
app.use(function(req, res) {
    res.status(404.).json({mensagem: `A rota ${req.originalUrl} informada não existe`})
})

app.listen(PORT, (req, res)=> {
    console.log(`💻 Servidor Web rodando na porta ${PORT}`)
})