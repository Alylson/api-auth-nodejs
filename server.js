// get dependencies
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

require('./routes/usuario.routes')(app); 

// parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado ao banco de dados com sucesso");    
}).catch(err => {
    console.log('Nao foi possivel conectar ao banco de dados. Saindo agora...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Bem-vindo ao Register"});
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});