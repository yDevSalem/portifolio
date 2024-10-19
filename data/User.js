const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    primeiroNome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cpf: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    numeroCasa: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);
module.exports = User;
