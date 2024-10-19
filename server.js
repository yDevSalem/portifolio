const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const User = require('./data/User')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(session({
  secret: 'scrt',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, {})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('Erro de conexão:', err))

app.post('/api/usuarios', async (req, res) => {
  const {
    primeiroNome,
    sobrenome,
    email,
    senha,
    cpf,
    cidade,
    estado,
    telefone,
    dataNascimento,
    bairro,
    cep,
    rua,
    numeroCasa,
  } = req.body

  const camposObrigatorios = [
    'primeiroNome',
    'sobrenome',
    'email',
    'senha',
    'cpf',
    'cidade',
    'estado',
    'telefone',
    'dataNascimento',
    'bairro',
    'cep',
    'rua',
    'numeroCasa'
  ]

  const erros = camposObrigatorios.filter(campo => !req.body[campo])

  if (erros.length > 0) {
    return res.status(400).json({
      message: 'Campos obrigatórios faltando.',
      camposFaltando: erros
    })
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = new User({
      primeiroNome,
      sobrenome,
      email,
      senha: senhaHash,
      cpf,
      cidade,
      estado,
      telefone,
      dataNascimento,
      bairro,
      cep,
      rua,
      numeroCasa,
    })
    await novoUsuario.save()
    res.json({ message: 'Usuário cadastrado com sucesso!' })
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message })
  }
})
//login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body 

  try {
    const usuario = await User.findOne({ email }) 
    if (!usuario) {
      return res.status(401).json({ sucess: false, message: 'Usuário não encontrado' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha) 
    if (!senhaValida) {
      return res.status(401).json({ sucess: false, message: 'Senha inválida' })
    }

    res.status(200).json({ success: true, message: 'Login bem-sucedido!' })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ success: false, message: 'Erro interno no servidor' })
  }
})

//logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout.')
    }
    res.send('Logout bem-sucedido!')
  })
})

app.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Inicie uma sessão agora ou cadastre-se!')
  }
  try {
    const user = await User.findById(req.session.userId)
    if (!user) {
      return res.status(404).send('Usuário não encontrado')
    }
    res.send(`Seja bem-vindo(a) ao seu perfil! Seu ID é ${req.session.userId}`)
  } finally {}
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}. Acesse http://localhost:${port}`)
})
