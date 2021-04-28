const express = require('express') //Carrega o express
      require('dotenv').config() //Carrega as variáveis de ambiente

const app = express()
app.disable('x-powered-by') //Remove o Powered-By Express
//Porta padrão do servidor web
const PORT = process.env.PORT

app.use(express.json()) //Iremos fazer o parse do JSON 

app.get('/', (req, res)=> {
    res.json({mensagem: 'API 100% funcional! 😈', versão: '1.0.0!'})
})
//Rota para tratar erros 404
app.use(function(req, res) {
    res.status(404.).json({mensagem: `A rota ${req.originalUrl} informada não existe`})
})

app.listen(PORT, (req, res)=> {
    console.log(`Servidor Web rodando na porta ${PORT}`)
})