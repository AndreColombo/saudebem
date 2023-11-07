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
  serverSelectionTimeoutMS: 10000,
});

// Model Usuário
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// Rota de Cadastro de Usuário
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  // testando se todos os campos foram preenchidos
  if (email == null || senha == null) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  // teste mais importante da AC
  const emailExiste = await Usuario.findOne({ email: email });

  if (emailExiste) {
    return res.status(400).json({ error: "O email cadastrado já existe" });
  }

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({
      error: null,
      msg: "Cadastro de usuário realizado com sucesso",
      usuarioId: newUsuario._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Model Produtoentrega
const ProdutoentregaSchema = new mongoose.Schema({
  idprodutoentrega: { type: Number, required: true },
  descricao: { type: String },
  laboratorio: { type: String },
  datavalidade: { type: Date },
  quantidadeestoque: { type: Number },
});

const Produtoentrega = mongoose.model("Produtoentrega", ProdutoentregaSchema);

// Rota de Cadastro de Produtoentrega
app.post("/cadastroprodutoentrega", async (req, res) => {
  const idprodutoentrega = req.body.idprodutoentrega;
  const descricao = req.body.descricao;
  const laboratorio = req.body.laboratorio;
  const datavalidade = req.body.datavalidade;
  const quantidadeestoque = req.body.quantidadeestoque;

  // testando se todos os campos foram preenchidos
  if (
    idprodutoentrega == null ||
    descricao == null ||
    laboratorio == null ||
    datavalidade == null ||
    quantidadeestoque == null
  ) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  if (quantidadeestoque > 11) {
    return res
      .status(400)
      .json({ error: "Limite de estoque superado, impossível cadastrar" });
  } else if (quantidadeestoque <= 0) {
    return res
      .status(400)
      .json({ error: "Digite um valor positivo menor ou igual a 11" });
  }

  // teste mais importante da AC
  const idExiste = await Produtoentrega.findOne({
    idprodutoentrega: idprodutoentrega,
  });

  if (idExiste) {
    return res.status(400).json({ error: "O id cadastrado já existe" });
  }

  const produto = new Produtoentrega({
    idprodutoentrega: idprodutoentrega,
    descricao: descricao,
    laboratorio: laboratorio,
    datavalidade: datavalidade,
    quantidadeestoque: quantidadeestoque,
  });

  try {
    const newProduto = await produto.save();
    res.json({
      error: null,
      msg: "Cadastro de produto entregue realizado com sucesso",
      produtoId: newProduto._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota Padrão
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Configurando a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
