// Instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// Roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

// Acesso ao mongodb
mongoose.connect("mongodb://127.0.0.1:27017/saudebem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
});

// Model Usuário
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// Configurando os roteamentos Cadastro Usuário
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });
});

// Model Produtoentrega
const ProdutoentregaSchema = new mongoose.Schema({
  id_produtoentrega: { type: Number, required: true },
  descricao: { type: String },
  laboratorio: { type: String },
  data_validade: { type: Date },
  quantidade_estoque: { type: Number },
});

const Produtoentrega = mongoose.model("Produtoentrega", ProdutoentregaSchema);

// Configurando os roteamentos Cadastro Produtoentrega
app.post("/cadastroprodutoentrega", async (req, res) => {
  const id_produtoentrega = req.body.id_produtoentrega;
  const descricao = req.body.descricao;
  const laboratorio = req.body.laboratorio;
  const data_validade = req.body.data_validade;
  const quantidade_estoque = req.body.quantidade_estoque;

  const produto = new Produto({
    id_produtoentrega: id_produtoentrega,
    descricao: descricao,
    laboratorio: laboratorio,
    data_validade: data_validade,
    quantidade_estoque: quantidade_estoque,
  });
});

// Rota Padrão
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Configurando a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
