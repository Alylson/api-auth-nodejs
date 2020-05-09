const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    cpf: {
        type: Number,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);