const Usuario = require('../app/usuario.model');

//Criar novo usuario
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Usuario nao pode ser vazio"
        });
    }

    // Criar usuario
    const usuario = new Usuario({
        nome: req.body.nome || "Nenhum usuario", 
        email: req.body.email,
        cpf: req.body.cpf
    });

    // Salvar usuario na base de dados
    usuario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o usuario"
        });
    });
};

// Recuperar todos os usuarios do banco de dados
exports.findAll = (req, res) => {
    Usuario.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao listar usuarios"
        });
    });
};

// Pesquisar um usuario pelo Id
exports.findOne = (req, res) => {
    Usuario.findById(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });            
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "Ocorreu algum erro para o id " + req.params.usuarioId
        });
    });
};

// Atualizar usuario
exports.update = (req, res) => {
    // Validar Request
    if(!req.body) {
        return res.status(400).send({
            message: "Conteudo para usuario nao pode ser vazio"
        });
    }

    // Pesquisar e atualizar usuario com o corpo da request
    Usuario.findByIdAndUpdate(req.params.usuarioId, {
        nome: req.body.nome || "Nenhum nome de usuario", 
        email: req.body.email,
        cpf: req.body.price
    }, {new: true})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "Ocorreu algum erro na atualizacao para o id " + req.params.usuarioId
        });
    });
};

// Deletar um item para o id especifico da requisicao
exports.delete = (req, res) => {
    Usuario.findByIdAndRemove(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NaoEncontrado') {
            return res.status(404).send({
                message: "Usuario nao encontrado para o id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "Nao foi possivel deletar usuario para o id " + req.params.usuarioId
        });
    });
};