module.exports = (app) => {
    const usuarios = require('../controllers/usuario.controller.js');

    // Rota para criar novo usuario
    app.post('/usuarios', usuarios.create);

    // Rota para listar todos usuarios
    app.get('/usuarios', usuarios.findAll);

    // Rota para recuperar usuario pelo id
    app.get('/usuarios/:usuarioId', usuarios.findOne);

    // Rota para atualizar usuario pelo id
    app.put('/usuarios/:usuarioId', usuarios.update);

    // Rota para deletar um usuario pelo id
    app.delete('/usuarios/:usuarioId', usuarios.delete);
}